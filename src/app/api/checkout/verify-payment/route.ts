import { NextRequest, NextResponse } from "next/server";
import { getOrder, saveOrder } from "@/lib/orders-store";
import { getPaymentAdapter } from "@/lib/payment";
import { sendOrderConfirmationEmail } from "@/lib/email/mailer";
import { PaymentProvider } from "@/types/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderNumber,
      paymentId,
      provider = "stripe",
      signature,
      rawPayload,
    }: {
      orderNumber: string;
      paymentId: string;
      provider?: PaymentProvider;
      signature?: string;
      rawPayload?: Record<string, unknown>;
    } = body;

    if (!orderNumber || !paymentId) {
      return NextResponse.json(
        { error: "Order reference and transaction ID are required." },
        { status: 400 }
      );
    }

    const order = getOrder(orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: `Order "${orderNumber}" could not be located in our atelier ledger.` },
        { status: 404 }
      );
    }

    // Cryptographic verification via provider adapter
    const adapter = getPaymentAdapter(provider);
    const verification = await adapter.verifyPayment({
      orderNumber,
      paymentId,
      signature,
      rawPayload,
    });

    if (!verification.success) {
      // Mark as failed or pending
      order.paymentStatus = "failed";
      saveOrder(order);
      return NextResponse.json(
        {
          success: false,
          error: verification.message || "Payment authentication failed with provider.",
        },
        { status: 402 }
      );
    }

    // Success: Update Order to Paid
    order.paymentStatus = "paid";
    order.paymentReference = verification.transactionId;
    order.status = "confirmed";

    const now = new Date();
    order.statusHistory?.push({
      status: "confirmed",
      note: `Payment verified & captured via ${provider.toUpperCase()} (${verification.transactionId}).`,
      timestamp: `${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} GMT`,
      location: "Paris Financial Settlement Desk",
    });

    saveOrder(order);

    // Dispatch transactional confirmation email
    await sendOrderConfirmationEmail(order).catch((err) => {
      console.error("[Email Notification Failed]:", err);
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      transactionId: verification.transactionId,
      message: "Commission payment verified and authenticated.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment verification exception";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
