import { CartItem } from "./cart";
import { CustomerAddress } from "./customer";
import { PaymentProvider, PaymentStatus } from "./payment";

export type { PaymentProvider, PaymentStatus };

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantSize: "30ml" | "50ml" | "100ml";
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  note: string;
  timestamp: string;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider: PaymentProvider;
  paymentReference?: string;
  
  currency: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  
  couponCode?: string | null;
  shippingAddress: CustomerAddress;
  billingAddress?: CustomerAddress;
  
  items: CartItem[];
  
  shippingCarrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  specialInstructions?: string;
  
  createdAt: string;
  updatedAt?: string;
  statusHistory?: OrderStatusHistoryItem[];
}
