import { PaymentProvider, PaymentStatus } from "@/types/payment";
import { Order } from "@/types/order";

export interface CreatePaymentIntentParams {
  order: Order;
  returnUrl?: string;
}

export interface PaymentIntentResult {
  provider: PaymentProvider;
  success: boolean;
  orderNumber: string;
  clientSecret?: string;
  gatewayOrderId?: string;
  amount: number;
  currency: string;
  redirectUrl?: string;
  error?: string;
}

export interface VerifyPaymentParams {
  orderNumber: string;
  paymentId: string;
  signature?: string;
  rawPayload?: Record<string, unknown>;
}

export interface VerifyPaymentResult {
  success: boolean;
  orderNumber: string;
  paymentStatus: PaymentStatus;
  transactionId: string;
  message: string;
}

export interface PaymentGatewayAdapter {
  provider: PaymentProvider;
  isConfigured(): boolean;
  createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult>;
  verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult>;
}
