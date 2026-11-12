import { OrderStatus, PaymentStatus } from "@/types/order";

export type AdminRole =
  | "super_admin"
  | "product_manager"
  | "inventory_manager"
  | "order_manager"
  | "customer_support"
  | "marketing_manager"
  | "content_manager";

export type AdminModule =
  | "dashboard"
  | "products"
  | "categories"
  | "collections"
  | "inventory"
  | "orders"
  | "customers"
  | "coupons"
  | "reviews"
  | "content"
  | "marketing"
  | "settings";

export type PermissionAction = "view" | "create" | "edit" | "delete" | "approve" | "export" | "manage";

export interface AdminMember {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  status: "active" | "suspended";
  avatarUrl?: string;
  phone?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export interface StaffLoginRecord {
  id: string;
  adminId: string;
  email: string;
  fullName: string;
  role: AdminRole;
  roleLabel: string;
  timestamp: string;
  ipAddress: string;
  device?: string;
  status: "active" | "signed_out";
}

export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminEmail: string;
  adminRole: AdminRole;
  action: string;
  module: AdminModule;
  recordReference: string;
  changeSummary: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  variantSize: "30ml" | "50ml" | "100ml";
  sku: string;
  previousQuantity: number;
  changeAmount: number;
  newQuantity: number;
  reason:
    | "restock"
    | "order_fulfillment"
    | "order_cancellation"
    | "damaged"
    | "returned"
    | "manual_audit"
    | "promotional_allocation";
  adminId?: string;
  adminEmail?: string;
  notes?: string;
  createdAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  productCount?: number;
  updatedAt: string;
}

export interface ProductCollectionAdmin {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  productIds: string[];
  productCount: number;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  updatedAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: "pending" | "approved" | "rejected" | "flagged";
  moderatedBy?: string;
  moderatedAt?: string;
  moderationNote?: string;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  tier: "patron" | "vip" | "connoisseur" | "maison_circle";
  totalSpent: number;
  ordersCount: number;
  status: "active" | "suspended";
  notes?: string[];
  lastOrderDate?: string;
  shippingAddressSummary?: string;
  createdAt: string;
}

export interface MarketingSubscriber {
  id: string;
  email: string;
  source: string;
  consentStatus: "subscribed" | "unsubscribed";
  subscribedAt: string;
  unsubscribedAt?: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  subject: string;
  previewText?: string;
  contentBody: string;
  targetAudience: "all_subscribers" | "vip_patrons" | "inactive_clients";
  status: "draft" | "scheduled" | "sending" | "sent" | "cancelled";
  scheduledFor?: string;
  sentAt?: string;
  recipientCount: number;
  openCount?: number;
  clickCount?: number;
  createdBy: string;
  createdAt: string;
}

export interface CmsHomepageData {
  announcementText: string;
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroCtaText: string;
  heroCtaUrl: string;
  brandStoryHeading: string;
  brandStoryText: string;
  featuredProductIds: string[];
  featuredCollectionIds: string[];
}

export interface CmsBanner {
  id: string;
  title: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  desktopImageUrl?: string;
  placement: "hero" | "announcement_bar" | "collection_header";
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export type AdminNotificationType =
  | "new_order"
  | "payment_alert"
  | "low_stock"
  | "out_of_stock"
  | "refund_request"
  | "new_review"
  | "contact_enquiry";

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  title: string;
  message: string;
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface StoreGeneralSettings {
  brandName: string;
  brandTagline: string;
  storeEmail: string;
  conciergePhone: string;
  primaryCurrency: string;
  timezone: string;
  locale: string;
}

export interface StorePaymentSettings {
  provider: "stripe" | "razorpay" | "both";
  stripeLiveMode: boolean;
  razorpayLiveMode: boolean;
  allowConciergeWire: boolean;
  wireMinimumAmount: number;
}

export interface StoreShippingSettings {
  complimentaryThreshold: number;
  standardInsuredRate: number;
  defaultCarrier: string;
  originHub: string;
  supportedCountries: string[];
}

export interface StoreTaxSettings {
  defaultExciseRate: number; // e.g. 8%
  taxIncludedInPricing: boolean;
  requireTaxReceipts: boolean;
}

export interface DashboardAnalytics {
  totalRevenue: number;
  revenueChangePct: number;
  totalOrders: number;
  ordersChangePct: number;
  averageOrderValue: number;
  totalCustomers: number;
  pendingOrdersCount: number;
  lowStockCount: number;
  revenueTrend: Array<{ date: string; revenue: number; orders: number }>;
  orderStatusDistribution: Record<OrderStatus, number>;
  topSellingProducts: Array<{ id: string; name: string; volumeSold: number; revenue: number }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
  }>;
}
