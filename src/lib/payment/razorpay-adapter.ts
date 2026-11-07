import crypto from "crypto";
import { PaymentGatewayAdapter, CreatePaymentIntentParams, PaymentIntentResult, VerifyPaymentParams, VerifyPaymentResult } from "./types";

export class RazorpayAdapter implements PaymentGatewayAdapter {
  provider = "razorpay" as const;

  isConfigured(): boolean {
    const key = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    return !!key && !!secret && !key.includes("...");
  }

  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult> {
    const { order } = params;
    const amountInSubunits = Math.round(order.totalAmount * 100);

    if (!this.isConfigured()) {
      return {
        provider: "razorpay",
        success: true,
        orderNumber: order.orderNumber,
        gatewayOrderId: `order_mock_${order.orderNumber.replace(/[^a-zA-Z0-9]/g, "")}`,
        amount: order.totalAmount,
        currency: order.currency || "USD",
      };
    }

    try {
      const auth = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInSubunits,
          currency: order.currency || "USD",
          receipt: order.orderNumber,
          notes: {
            order_number: order.orderNumber,
            customer_email: order.customerEmail,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.description || "Razorpay order creation failed");
      }

      return {
        provider: "razorpay",
        success: true,
        orderNumber: order.orderNumber,
        gatewayOrderId: data.id,
        amount: order.totalAmount,
        currency: order.currency,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Razorpay error";
      return {
        provider: "razorpay",
        success: false,
        orderNumber: order.orderNumber,
        amount: order.totalAmount,
        currency: order.currency,
        error: msg,
      };
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    const { orderNumber, paymentId, signature, rawPayload } = params;

    if (!this.isConfigured()) {
      const isTestValid = paymentId.startsWith("pay_") || paymentId.startsWith("mock_");
      return {
        success: isTestValid,
        orderNumber,
        paymentStatus: isTestValid ? "paid" : "failed",
        transactionId: paymentId,
        message: isTestValid
          ? "Razorpay sandbox test authorization confirmed."
          : "Invalid Razorpay payment reference in sandbox.",
      };
    }

    const razorpayOrderId = (rawPayload?.razorpay_order_id as string) || "";
    const secret = process.env.RAZORPAY_KEY_SECRET || "";

    if (!razorpayOrderId || !signature || !secret) {
      return {
        success: false,
        orderNumber,
        paymentStatus: "failed",
        transactionId: paymentId,
        message: "Missing Razorpay order ID or cryptographic signature.",
      };
    }

    try {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpayOrderId}|${paymentId}`)
        .digest("hex");

      const isValid = expectedSignature === signature;

      return {
        success: isValid,
        orderNumber,
        paymentStatus: isValid ? "paid" : "failed",
        transactionId: paymentId,
        message: isValid
          ? "Razorpay HMAC-SHA256 signature verified successfully."
          : "Razorpay cryptographic signature mismatch.",
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signature verification error";
      return {
        success: false,
        orderNumber,
        paymentStatus: "failed",
        transactionId: paymentId,
        message: msg,
      };
    }
  }
}
