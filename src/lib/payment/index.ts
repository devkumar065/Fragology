import { PaymentProvider } from "@/types/payment";
import { PaymentGatewayAdapter } from "./types";
import { StripeAdapter } from "./stripe-adapter";
import { RazorpayAdapter } from "./razorpay-adapter";

export * from "./types";
export * from "./stripe-adapter";
export * from "./razorpay-adapter";

const stripeAdapter = new StripeAdapter();
const razorpayAdapter = new RazorpayAdapter();

export function getPaymentAdapter(provider: PaymentProvider = "stripe"): PaymentGatewayAdapter {
  switch (provider) {
    case "razorpay":
      return razorpayAdapter;
    case "stripe":
    default:
      return stripeAdapter;
  }
}
