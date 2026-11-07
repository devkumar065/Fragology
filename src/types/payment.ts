export type PaymentProvider = "stripe" | "razorpay" | "concierge_transfer";

export type PaymentStatus = "pending" | "processing" | "paid" | "failed" | "refunded";

export interface PaymentIntentInit {
  provider: PaymentProvider;
  orderNumber: string;
  amount: number;
  currency: string;
  customerEmail: string;
  clientSecret?: string;
  razorpayOrderId?: string;
  notes?: Record<string, string>;
}

export interface PaymentVerificationRequest {
  provider: PaymentProvider;
  orderNumber: string;
  paymentId: string;
  signature?: string; // Razorpay signature or Stripe event id
  rawPayload?: Record<string, unknown>;
}

export interface PaymentVerificationResponse {
  success: boolean;
  orderNumber: string;
  paymentStatus: PaymentStatus;
  transactionId: string;
  message: string;
  verifiedAt: string;
}
