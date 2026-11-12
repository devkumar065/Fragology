import { PaymentGatewayAdapter, CreatePaymentIntentParams, PaymentIntentResult, VerifyPaymentParams, VerifyPaymentResult } from "./types";

export class StripeAdapter implements PaymentGatewayAdapter {
  provider = "stripe" as const;

  isConfigured(): boolean {
    const key = process.env.STRIPE_SECRET_KEY;
    return !!key && key.startsWith("sk_") && !key.includes("...");
  }

  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult> {
    const { order } = params;
    const amountInCents = Math.round(order.totalAmount * 100);

    if (!this.isConfigured()) {
      return {
        provider: "stripe",
        success: true,
        orderNumber: order.orderNumber,
        clientSecret: `mock_pi_${order.orderNumber}_secret_test`,
        amount: order.totalAmount,
        currency: order.currency || "INR",
        error: undefined,
      };
    }

    try {
      // Use standard fetch to Stripe API to avoid extra heavy dependencies
      const body = new URLSearchParams({
        amount: amountInCents.toString(),
        currency: (order.currency || "inr").toLowerCase(),
        "metadata[order_number]": order.orderNumber,
        "metadata[customer_email]": order.customerEmail,
        description: `Fragology Haute Parfumerie Order ${order.orderNumber}`,
      });

      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Stripe PaymentIntent creation failed");
      }

      return {
        provider: "stripe",
        success: true,
        orderNumber: order.orderNumber,
        clientSecret: data.client_secret,
        gatewayOrderId: data.id,
        amount: order.totalAmount,
        currency: order.currency,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Stripe gateway error";
      return {
        provider: "stripe",
        success: false,
        orderNumber: order.orderNumber,
        amount: order.totalAmount,
        currency: order.currency,
        error: msg,
      };
    }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    const { orderNumber, paymentId } = params;

    if (!this.isConfigured()) {
      // Test sandbox verification mode
      const isTestValid = paymentId.startsWith("pi_") || paymentId.startsWith("mock_");
      return {
        success: isTestValid,
        orderNumber,
        paymentStatus: isTestValid ? "paid" : "failed",
        transactionId: paymentId,
        message: isTestValid
          ? "Stripe sandbox test authorization confirmed."
          : "Invalid Stripe transaction reference in sandbox.",
      };
    }

    try {
      const response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      });

      const pi = await response.json();

      if (!response.ok) {
        return {
          success: false,
          orderNumber,
          paymentStatus: "failed",
          transactionId: paymentId,
          message: pi.error?.message || "Stripe transaction not found",
        };
      }

      const isSucceeded = pi.status === "succeeded";
      return {
        success: isSucceeded,
        orderNumber,
        paymentStatus: isSucceeded ? "paid" : "processing",
        transactionId: pi.id,
        message: isSucceeded
          ? "Stripe payment authenticated and funds captured."
          : `Stripe payment status is currently "${pi.status}".`,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification exception";
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
