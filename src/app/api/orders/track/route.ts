import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders-store";

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, email } = await req.json();

    if (!orderNumber || !email) {
      return NextResponse.json(
        { error: "Both Order Reference (FRG-...) and Billing Email are required." },
        { status: 400 }
      );
    }

    const order = getOrder(orderNumber);

    if (!order) {
      return NextResponse.json(
        { error: `No active consignment found matching reference "${orderNumber}".` },
        { status: 404 }
      );
    }

    // Security check: email must match the order's billing/customer email
    if (order.customerEmail.toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json(
        { error: "The billing email provided does not match the consignment record for this order reference." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Order tracking error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
