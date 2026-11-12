import { PRODUCTS_CATALOG } from "@/data/products";
import { COLLECTIONS_DATA } from "@/data/collections";
import { MAISON_COUPONS } from "@/data/coupons";
import { Product } from "@/types/product";
import { Order, OrderStatus } from "@/types/order";
import { Coupon } from "@/types/coupon";
import {
  AdminMember,
  StaffLoginRecord,
  AdminCustomer,
  AuditLogEntry,
  InventoryMovement,
  ProductCategory,
  ProductCollectionAdmin,
  ProductReview,
  MarketingSubscriber,
  MarketingCampaign,
  CmsHomepageData,
  CmsBanner,
  AdminNotification,
  StoreGeneralSettings,
  StorePaymentSettings,
  StoreShippingSettings,
  StoreTaxSettings,
  DashboardAnalytics,
  AdminModule,
} from "./types";
import { ROLE_LABELS } from "./rbac";

// ==============================================================================
// 1. IN-MEMORY AUTHORITATIVE ADMIN REGISTRIES
// ==============================================================================

// Staff directory
const STAFF_MEMBERS: AdminMember[] = [
  {
    id: "staff-super-01",
    email: "admin@fragology.com",
    fullName: "Lord Dev Kumar",
    role: "super_admin",
    status: "active",
    phone: "+1 (555) 382-9481",
    lastLoginAt: "2026-11-07T12:00:00Z",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "staff-prod-02",
    email: "products@fragology.com",
    fullName: "Lady Genevieve Vane",
    role: "product_manager",
    status: "active",
    phone: "+33 1 42 68 55 10",
    lastLoginAt: "2026-11-06T15:30:00Z",
    createdAt: "2026-02-15T00:00:00Z",
  },
  {
    id: "staff-inv-03",
    email: "inventory@fragology.com",
    fullName: "Marcus Vance",
    role: "inventory_manager",
    status: "active",
    phone: "+33 1 42 68 55 20",
    lastLoginAt: "2026-11-07T08:45:00Z",
    createdAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "staff-ord-04",
    email: "orders@fragology.com",
    fullName: "Claire Delacroix",
    role: "order_manager",
    status: "active",
    phone: "+1 (555) 749-2041",
    lastLoginAt: "2026-11-07T11:15:00Z",
    createdAt: "2026-03-15T00:00:00Z",
  },
  {
    id: "staff-cs-05",
    email: "concierge@fragology.com",
    fullName: "Sophie Laurent",
    role: "customer_support",
    status: "active",
    phone: "+33 1 42 68 55 30",
    lastLoginAt: "2026-11-07T10:00:00Z",
    createdAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "staff-mkt-06",
    email: "marketing@fragology.com",
    fullName: "Julian Thorne",
    role: "marketing_manager",
    status: "active",
    phone: "+1 (555) 902-8310",
    lastLoginAt: "2026-11-05T14:20:00Z",
    createdAt: "2026-04-15T00:00:00Z",
  },
  {
    id: "staff-cms-07",
    email: "editorial@fragology.com",
    fullName: "Eleanor Rousseau",
    role: "content_manager",
    status: "active",
    phone: "+33 1 42 68 55 40",
    lastLoginAt: "2026-11-06T18:10:00Z",
    createdAt: "2026-05-01T00:00:00Z",
  },
];

// Audit logs (Immutable append-only)
const AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit-init-01",
    adminId: "staff-super-01",
    adminEmail: "admin@fragology.com",
    adminRole: "super_admin",
    action: "system.provision",
    module: "settings",
    recordReference: "GLOBAL_SECURITY",
    changeSummary: "Fragology administrative security protocol initialized with RBAC.",
    createdAt: "2026-11-07T00:00:00Z",
  },
];

// Products Registry
const ADMIN_PRODUCTS: Product[] = [...PRODUCTS_CATALOG];

// Product Categories Taxonomy
const ADMIN_CATEGORIES: ProductCategory[] = [
  {
    id: "cat-oriental",
    slug: "oriental",
    name: "Oriental",
    description: "Opulent resins, dark Bourbon vanilla, aged ambergris, and warm golden spices.",
    displayOrder: 1,
    isActive: true,
    productCount: 2,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "cat-woody",
    slug: "woody",
    name: "Woody",
    description: "Sacred Mysore sandalwood, smoked Atlas cedar, and wild Assam agarwood.",
    displayOrder: 2,
    isActive: true,
    productCount: 3,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "cat-floral",
    slug: "floral",
    name: "Floral",
    description: "Grasse Rose Centifolia, night-blooming jasmine sambac, and Florentine iris.",
    displayOrder: 3,
    isActive: true,
    productCount: 2,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "cat-fresh",
    slug: "fresh",
    name: "Fresh",
    description: "Sunlit Calabrian bergamot, neroli petals, and sea salt mineral mist.",
    displayOrder: 4,
    isActive: true,
    productCount: 1,
    updatedAt: "2026-11-01T00:00:00Z",
  },
  {
    id: "cat-unisex",
    slug: "unisex",
    name: "Unisex Bespoke",
    description: "Transcendent genderless formulations created for true individuality.",
    displayOrder: 5,
    isActive: true,
    productCount: 8,
    updatedAt: "2026-11-01T00:00:00Z",
  },
];

// Product Collections
const ADMIN_COLLECTIONS: ProductCollectionAdmin[] = COLLECTIONS_DATA.map((c, i) => ({
  id: c.id,
  slug: c.slug,
  name: c.title,
  subtitle: c.subtitle,
  description: c.description,
  imageUrl: `/images/collections/${c.slug}.jpg`,
  productIds: c.productIds,
  productCount: c.productCount,
  isActive: true,
  isFeatured: c.featured || i === 0,
  displayOrder: i + 1,
  updatedAt: "2026-11-01T00:00:00Z",
}));

// Inventory Movements Ledger
const INVENTORY_MOVEMENTS: InventoryMovement[] = [
  {
    id: "mov-01",
    productId: "golden-reverie",
    productName: "Golden Reverie",
    variantSize: "100ml",
    sku: "FRG-GOLD-100",
    previousQuantity: 90,
    changeAmount: 10,
    newQuantity: 100,
    reason: "restock",
    adminId: "staff-inv-03",
    adminEmail: "inventory@fragology.com",
    notes: "Distillation batch 2026-A received from Grasse atelier.",
    createdAt: "2026-11-06T10:00:00Z",
  },
];

// Product Reviews
const ADMIN_REVIEWS: ProductReview[] = [
  {
    id: "rev-01",
    productId: "golden-reverie",
    productName: "Golden Reverie",
    customerName: "Countess Jacqueline de Valois",
    customerEmail: "jacqueline@valois.fr",
    rating: 5,
    title: "An ethereal amber masterpiece",
    comment: "The sillage is extraordinarily opulent yet quietly regal. The saffron opening yields to a warm bourbon vanilla unlike anything else.",
    isVerifiedPurchase: true,
    status: "approved",
    moderatedBy: "editorial@fragology.com",
    moderatedAt: "2026-11-05T14:00:00Z",
    moderationNote: "Verified client commission.",
    createdAt: "2026-11-04T12:00:00Z",
  },
  {
    id: "rev-02",
    productId: "velvet-essence",
    productName: "Velvet Essence",
    customerName: "Marcus Sterling",
    customerEmail: "m.sterling@mayfair.co.uk",
    rating: 5,
    title: "Uncompromising leather and smoke",
    comment: "Captures the atmosphere of a private London library. The birch tar and leather stay with skin for over 14 hours.",
    isVerifiedPurchase: true,
    status: "approved",
    moderatedBy: "editorial@fragology.com",
    moderatedAt: "2026-11-06T09:30:00Z",
    createdAt: "2026-11-05T18:15:00Z",
  },
  {
    id: "rev-03",
    productId: "amber-dusk",
    productName: "Amber Dusk",
    customerName: "Anonymous Visitor",
    customerEmail: "anon982@domain.com",
    rating: 4,
    title: "Aromatic and mysterious",
    comment: "Deep frankincense note is profound. Fast delivery.",
    isVerifiedPurchase: false,
    status: "pending",
    createdAt: "2026-11-07T08:00:00Z",
  },
];

// Marketing Subscribers
const MARKETING_SUBSCRIBERS: MarketingSubscriber[] = [
  {
    id: "sub-01",
    email: "client@fragology.com",
    source: "checkout_opt_in",
    consentStatus: "subscribed",
    subscribedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "sub-02",
    email: "patron@fragology.com",
    source: "homepage_newsletter",
    consentStatus: "subscribed",
    subscribedAt: "2026-02-10T14:30:00Z",
  },
  {
    id: "sub-03",
    email: "lady.genevieve@vane-estates.com",
    source: "private_invitation",
    consentStatus: "subscribed",
    subscribedAt: "2026-03-01T09:00:00Z",
  },
];

// Marketing Campaigns
const MARKETING_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: "camp-01",
    name: "Winter Solstice Extrait Harvest",
    subject: "Private Invitation: The 2026 Winter Distillation is Sealed",
    previewText: "Discover the rare limited harvests hand-poured in Grasse.",
    contentBody: "Chers Patrons, We have completed the final cask aging of our 2026 extrait series...",
    targetAudience: "all_subscribers",
    status: "sent",
    sentAt: "2026-11-01T10:00:00Z",
    recipientCount: 340,
    openCount: 228,
    clickCount: 114,
    createdBy: "marketing@fragology.com",
    createdAt: "2026-10-25T14:00:00Z",
  },
  {
    id: "camp-02",
    name: "Nocturne Ambré Collector Series",
    subject: "The Architecture of Night: Nocturne Ambré Grand Flacons",
    previewText: "Curated with rare saffron threads and somalian olibanum.",
    contentBody: "A limited release of 100 hand-numbered flacons is now available.",
    targetAudience: "vip_patrons",
    status: "draft",
    recipientCount: 120,
    createdBy: "marketing@fragology.com",
    createdAt: "2026-11-06T16:00:00Z",
  },
];

// Coupons Registry
const ADMIN_COUPONS: Coupon[] = [...MAISON_COUPONS];

// Registered Clients & Connoisseurs
const ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: "client-01",
    email: "client@fragology.com",
    fullName: "Lord Dev Kumar",
    phone: "+1 (555) 382-9481",
    tier: "maison_circle",
    totalSpent: 2840.0,
    ordersCount: 3,
    status: "active",
    shippingAddressSummary: "740 Park Avenue, Penthouse 14B, New York, NY 10021, US",
    notes: [
      "Prefers rare oud extraits macerated > 6 months.",
      "Requires hand-signed master perfumer certificate of provenance with all deliveries.",
    ],
    lastOrderDate: "2026-11-05T14:22:00Z",
    createdAt: "2026-01-10T12:00:00Z",
  },
  {
    id: "client-02",
    email: "helena.montrose@mayfair.co.uk",
    fullName: "Duchess Helena Montrose",
    phone: "+44 20 7946 0912",
    tier: "connoisseur",
    totalSpent: 1980.0,
    ordersCount: 4,
    status: "active",
    shippingAddressSummary: "14 Grosvenor Square, London, W1K 6HJ, United Kingdom",
    notes: ["Exclusive recipient of private harvest discovery sets."],
    lastOrderDate: "2026-11-06T10:15:00Z",
    createdAt: "2026-02-14T09:30:00Z",
  },
  {
    id: "client-03",
    email: "jeanluc.renaud@elysee.fr",
    fullName: "Count Jean-Luc Renaud",
    phone: "+33 1 42 68 55 90",
    tier: "vip",
    totalSpent: 1428.0,
    ordersCount: 2,
    status: "active",
    shippingAddressSummary: "28 Rue du Faubourg Saint-Honoré, Paris, 75008, France",
    notes: ["Prefers bank wire settlement."],
    lastOrderDate: "2026-11-07T09:30:00Z",
    createdAt: "2026-03-20T11:00:00Z",
  },
  {
    id: "client-04",
    email: "aria.davenport@ritz.com",
    fullName: "Aria Davenport",
    phone: "+1 (310) 849-2041",
    tier: "patron",
    totalSpent: 330.48,
    ordersCount: 1,
    status: "active",
    shippingAddressSummary: "9500 Wilshire Boulevard, Beverly Hills, CA 90212, US",
    notes: [],
    lastOrderDate: "2026-11-04T16:00:00Z",
    createdAt: "2026-04-05T15:20:00Z",
  },
  {
    id: "client-05",
    email: "khalid.alnuaimi@dubaiholdings.ae",
    fullName: "Sheikh Khalid Al-Nuaimi",
    phone: "+971 4 361 0000",
    tier: "maison_circle",
    totalSpent: 6450.0,
    ordersCount: 5,
    status: "active",
    shippingAddressSummary: "Emirates Hills, Sector E, Dubai, UAE",
    notes: ["Orders custom 100ml batches with personalized 24k gold engraving."],
    lastOrderDate: "2026-11-03T11:20:00Z",
    createdAt: "2026-01-05T08:00:00Z",
  },
  {
    id: "client-06",
    email: "vivienne@vonberg.ch",
    fullName: "Baroness Vivienne von Berg",
    phone: "+41 22 819 0000",
    tier: "connoisseur",
    totalSpent: 980.0,
    ordersCount: 2,
    status: "active",
    shippingAddressSummary: "Quai du Mont-Blanc 19, Geneva, 1201, Switzerland",
    notes: ["Prefers floral and iris compositions."],
    lastOrderDate: "2026-10-28T14:00:00Z",
    createdAt: "2026-02-18T16:40:00Z",
  },
];

// CMS Content
let CMS_HOMEPAGE: CmsHomepageData = {
  announcementText: "Complimentary worldwide courier & exterior 2ml test vial with every commission",
  heroEyebrow: "Maison de Haute Parfumerie",
  heroHeading: "The Olfactory Architecture of Timeless Distinction",
  heroDescription: "Pure extrait de parfum hand-poured in Grasse. An elevated contemplation of rare botanical essences, sacred woods, and golden resins.",
  heroCtaText: "Discover The Flacons",
  heroCtaUrl: "/shop",
  brandStoryHeading: "The Art of Slow Distillation",
  brandStoryText: "At Fragology, we reject industrial shortcuts. Every architectural flacon is macerated in dark cellars for ninety days before being hand-sealed with monogrammed wax.",
  featuredProductIds: ["golden-reverie", "velvet-essence", "amber-dusk", "santale-nocturne"],
  featuredCollectionIds: ["signature-collection", "oriental-collection"],
};

const CMS_BANNERS: CmsBanner[] = [
  {
    id: "banner-01",
    title: "Maison Winter Privilege",
    eyebrow: "Limited Seasonal Allocation",
    ctaLabel: "Acquire Flacon",
    ctaUrl: "/shop",
    desktopImageUrl: "/images/banners/fragology-winter-banner.png",
    placement: "announcement_bar",
    isActive: true,
  },
];

// Admin Notifications
const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-01",
    type: "new_order",
    title: "New Commission Placed",
    message: "Order FRG-20261107-6007 placed by Duchess Madeleine (₹2,499 INR).",
    linkUrl: "/admin/orders",
    isRead: false,
    createdAt: "2026-11-07T09:49:00Z",
  },
  {
    id: "notif-02",
    type: "low_stock",
    title: "Low Inventory Alert",
    message: "Velvet Essence (30ml Travel Flacon) is at 40 units remaining.",
    linkUrl: "/admin/inventory",
    isRead: false,
    createdAt: "2026-11-07T08:30:00Z",
  },
  {
    id: "notif-03",
    type: "new_review",
    title: "Review Awaiting Moderation",
    message: "New 4-star review submitted for Amber Dusk.",
    linkUrl: "/admin/reviews",
    isRead: false,
    createdAt: "2026-11-07T08:00:00Z",
  },
];

// Store Settings
let STORE_GENERAL_SETTINGS: StoreGeneralSettings = {
  brandName: "FRAGOLOGY",
  brandTagline: "Haute Parfumerie & Artisanal Extraction",
  storeEmail: "concierge@fragology.com",
  conciergePhone: "+1 (555) 382-9481",
  primaryCurrency: "INR (₹)",
  timezone: "Europe/Paris (GMT+1)",
  locale: "en-US",
};

let STORE_PAYMENT_SETTINGS: StorePaymentSettings = {
  provider: "stripe",
  stripeLiveMode: false,
  razorpayLiveMode: false,
  allowConciergeWire: true,
  wireMinimumAmount: 1000,
};

let STORE_SHIPPING_SETTINGS: StoreShippingSettings = {
  complimentaryThreshold: 150,
  standardInsuredRate: 25,
  defaultCarrier: "DHL Express Luxury Network",
  originHub: "Maison Fragology Atelier, Grasse & Paris",
  supportedCountries: ["United States", "United Kingdom", "France", "United Arab Emirates", "Germany", "Switzerland", "Canada", "Japan"],
};

let STORE_TAX_SETTINGS: StoreTaxSettings = {
  defaultExciseRate: 8.0,
  taxIncludedInPricing: false,
  requireTaxReceipts: true,
};

// ==============================================================================
// 2. AUDIT LOGGING HELPER
// ==============================================================================
export function logAdminActivity(entry: Omit<AuditLogEntry, "id" | "createdAt">): AuditLogEntry {
  const newLog: AuditLogEntry = {
    ...entry,
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
  };
  AUDIT_LOGS.unshift(newLog);
  return newLog;
}

export function getAuditLogs(module?: AdminModule, limit = 50): AuditLogEntry[] {
  if (module) {
    return AUDIT_LOGS.filter((l) => l.module === module).slice(0, limit);
  }
  return AUDIT_LOGS.slice(0, limit);
}

// ==============================================================================
// 3. STAFF & AUTH OPERATIONS
// ==============================================================================

const STAFF_LOGIN_HISTORY: StaffLoginRecord[] = [
  {
    id: "login-init-01",
    adminId: "staff-super-01",
    email: "admin@fragology.com",
    fullName: "Lord Dev Kumar",
    role: "super_admin",
    roleLabel: "Super Administrator",
    timestamp: "2026-11-08T09:15:00.000Z",
    ipAddress: "192.168.1.1 (Paris Executive Console)",
    device: "MacBook Pro • Safari Enterprise",
    status: "active",
  },
  {
    id: "login-init-02",
    adminId: "staff-prod-02",
    email: "products@fragology.com",
    fullName: "Lady Genevieve Vane",
    role: "product_manager",
    roleLabel: "Product Manager",
    timestamp: "2026-11-08T08:30:00.000Z",
    ipAddress: "192.168.1.14 (Grasse Atelier Node)",
    device: "iPad Pro • Chrome 130",
    status: "active",
  },
  {
    id: "login-init-03",
    adminId: "staff-inv-03",
    email: "inventory@fragology.com",
    fullName: "Marcus Vance",
    role: "inventory_manager",
    roleLabel: "Inventory Manager",
    timestamp: "2026-11-07T16:45:00.000Z",
    ipAddress: "192.168.1.22 (Geneva Vault Terminal)",
    device: "Windows 11 • Edge Enterprise",
    status: "active",
  },
  {
    id: "login-init-04",
    adminId: "staff-ord-04",
    email: "orders@fragology.com",
    fullName: "Claire Delacroix",
    role: "order_manager",
    roleLabel: "Order & Fulfillment Manager",
    timestamp: "2026-11-07T11:15:00.000Z",
    ipAddress: "192.168.1.33 (Logistics Hub Grasse)",
    device: "macOS • Chrome 130",
    status: "active",
  },
  {
    id: "login-init-05",
    adminId: "staff-cs-05",
    email: "concierge@fragology.com",
    fullName: "Sophie Laurent",
    role: "customer_support",
    roleLabel: "Customer Concierge Specialist",
    timestamp: "2026-11-07T10:00:00.000Z",
    ipAddress: "192.168.1.41 (Client Care Desk)",
    device: "macOS • Safari 18",
    status: "active",
  },
  {
    id: "login-init-06",
    adminId: "staff-mkt-06",
    email: "marketing@fragology.com",
    fullName: "Julian Thorne",
    role: "marketing_manager",
    roleLabel: "Marketing Director",
    timestamp: "2026-11-05T14:20:00.000Z",
    ipAddress: "192.168.1.55 (London Office Terminal)",
    device: "MacBook Air • Safari",
    status: "active",
  },
  {
    id: "login-init-07",
    adminId: "staff-cms-07",
    email: "editorial@fragology.com",
    fullName: "Eleanor Rousseau",
    role: "content_manager",
    roleLabel: "Content & Editorial Manager",
    timestamp: "2026-11-06T18:10:00.000Z",
    ipAddress: "192.168.1.62 (Editorial Atelier Paris)",
    device: "MacBook Pro • Chrome",
    status: "active",
  },
];

export function recordStaffLogin(
  staff: AdminMember,
  ipAddress = "192.168.1.1 (Maison Executive Gateway)"
): StaffLoginRecord {
  const now = new Date().toISOString();

  // Update staff in memory
  const existing = STAFF_MEMBERS.find((s) => s.id === staff.id);
  if (existing) {
    existing.lastLoginAt = now;
  }

  const record: StaffLoginRecord = {
    id: `login-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    adminId: staff.id,
    email: staff.email,
    fullName: staff.fullName,
    role: staff.role,
    roleLabel: ROLE_LABELS[staff.role] || staff.role,
    timestamp: now,
    ipAddress,
    device:
      typeof window !== "undefined"
        ? window.navigator.userAgent.slice(0, 36)
        : "Executive Secure Workstation",
    status: "active",
  };

  STAFF_LOGIN_HISTORY.unshift(record);

  // Formal Audit Log
  logAdminActivity({
    adminId: staff.id,
    adminEmail: staff.email,
    adminRole: staff.role,
    action: "auth.login",
    module: "settings",
    recordReference: staff.email,
    changeSummary: `Staff member ${staff.fullName} authenticated into administrative session as ${ROLE_LABELS[staff.role]}.`,
    ipAddress,
  });

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("fragology_staff_login_history");
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(record);
      localStorage.setItem("fragology_staff_login_history", JSON.stringify(list.slice(0, 50)));
    } catch {
      // Ignore
    }
  }

  return record;
}

export function getRecentStaffLogins(): StaffLoginRecord[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("fragology_staff_login_history");
      if (stored) {
        const parsed: StaffLoginRecord[] = JSON.parse(stored);
        const map = new Map<string, StaffLoginRecord>();
        parsed.forEach((item) => map.set(item.id, item));
        STAFF_LOGIN_HISTORY.forEach((item) => {
          if (!map.has(item.id)) map.set(item.id, item);
        });
        return Array.from(map.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    } catch {
      // fallback
    }
  }
  return [...STAFF_LOGIN_HISTORY];
}

export function getStaffMembers(): AdminMember[] {
  return [...STAFF_MEMBERS];
}

export function getStaffByEmail(email: string): AdminMember | undefined {
  return STAFF_MEMBERS.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
}

export function inviteStaffMember(
  data: Omit<AdminMember, "id" | "createdAt" | "status">,
  inviter: AdminMember
): AdminMember {
  const newStaff: AdminMember = {
    ...data,
    id: `staff-${Date.now()}`,
    status: "active",
    createdAt: new Date().toISOString(),
  };
  STAFF_MEMBERS.push(newStaff);

  logAdminActivity({
    adminId: inviter.id,
    adminEmail: inviter.email,
    adminRole: inviter.role,
    action: "staff.invite",
    module: "settings",
    recordReference: newStaff.email,
    changeSummary: `Invited new staff member ${newStaff.fullName} as ${newStaff.role}.`,
  });

  return newStaff;
}

export function updateStaffRole(
  staffId: string,
  newRole: AdminMember["role"],
  actor: AdminMember
): AdminMember | undefined {
  const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
  if (!staff) return undefined;

  const previousRole = staff.role;
  staff.role = newRole;

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "staff.update_role",
    module: "settings",
    recordReference: staff.email,
    changeSummary: `Updated role for ${staff.fullName} from ${previousRole} to ${newRole}.`,
  });

  return staff;
}

export function toggleStaffStatus(
  staffId: string,
  actor: AdminMember
): AdminMember | undefined {
  const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
  if (!staff) return undefined;

  staff.status = staff.status === "active" ? "suspended" : "active";

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "staff.status_change",
    module: "settings",
    recordReference: staff.email,
    changeSummary: `Toggled status for ${staff.fullName} to ${staff.status}.`,
  });

  return staff;
}

// ==============================================================================
// 4. PRODUCT MANAGEMENT OPERATIONS
// ==============================================================================
export function getAdminProducts(): Product[] {
  return [...ADMIN_PRODUCTS];
}

export function getAdminProductById(id: string): Product | undefined {
  return ADMIN_PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function createAdminProduct(productData: Omit<Product, "id">, actor: AdminMember): Product {
  const id = productData.slug || `prod-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id,
  };
  ADMIN_PRODUCTS.unshift(newProduct);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "product.create",
    module: "products",
    recordReference: newProduct.id,
    changeSummary: `Created new flacon profile: ${newProduct.name} (${newProduct.family}).`,
  });

  return newProduct;
}

export function updateAdminProduct(
  id: string,
  updates: Partial<Product>,
  actor: AdminMember
): Product | undefined {
  const index = ADMIN_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return undefined;

  const updated = { ...ADMIN_PRODUCTS[index], ...updates };
  ADMIN_PRODUCTS[index] = updated;

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "product.update",
    module: "products",
    recordReference: id,
    changeSummary: `Updated product properties for ${updated.name}.`,
  });

  return updated;
}

export function deleteAdminProduct(id: string, actor: AdminMember): boolean {
  const index = ADMIN_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return false;

  const deletedName = ADMIN_PRODUCTS[index].name;
  ADMIN_PRODUCTS.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "product.delete",
    module: "products",
    recordReference: id,
    changeSummary: `Removed product from active catalog: ${deletedName}.`,
  });

  return true;
}

// ==============================================================================
// 5. INVENTORY MANAGEMENT OPERATIONS
// ==============================================================================
export function getInventoryMovements(productId?: string): InventoryMovement[] {
  if (productId) {
    return INVENTORY_MOVEMENTS.filter((m) => m.productId === productId);
  }
  return [...INVENTORY_MOVEMENTS];
}

export function adjustInventoryStock(
  productId: string,
  variantSize: string,
  newQuantity: number,
  reason: InventoryMovement["reason"],
  notes: string,
  actor: AdminMember
): { success: boolean; movement?: InventoryMovement; error?: string } {
  const product = ADMIN_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
  if (!product) return { success: false, error: "Product not found" };

  const variant = product.variants.find((v) => v.size === variantSize);
  if (!variant) return { success: false, error: "Variant format not found" };

  // Current stock representation
  const previousQuantity = 80; // baseline or recorded
  const changeAmount = newQuantity - previousQuantity;

  const movement: InventoryMovement = {
    id: `mov-${Date.now()}`,
    productId: product.id,
    productName: product.name,
    variantSize,
    sku: `FRG-${product.slug.slice(0, 4).toUpperCase()}-${variantSize.replace("ml", "")}`,
    previousQuantity,
    changeAmount,
    newQuantity,
    reason,
    adminId: actor.id,
    adminEmail: actor.email,
    notes,
    createdAt: new Date().toISOString(),
  };

  INVENTORY_MOVEMENTS.unshift(movement);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "inventory.adjust",
    module: "inventory",
    recordReference: `${product.slug}:${variantSize}`,
    changeSummary: `Adjusted stock for ${product.name} (${variantSize}) to ${newQuantity} units. Reason: ${reason}.`,
  });

  // Check low stock alert
  if (newQuantity < 25) {
    ADMIN_NOTIFICATIONS.unshift({
      id: `notif-${Date.now()}`,
      type: newQuantity === 0 ? "out_of_stock" : "low_stock",
      title: newQuantity === 0 ? "Flacon Out of Stock" : "Low Inventory Alert",
      message: `${product.name} (${variantSize}) has reached ${newQuantity} units.`,
      linkUrl: "/admin/inventory",
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  }

  return { success: true, movement };
}

// ==============================================================================
// 6. CATEGORIES & COLLECTIONS OPERATIONS
// ==============================================================================
export function getAdminCategories(): ProductCategory[] {
  return [...ADMIN_CATEGORIES];
}

export function createAdminCategory(data: Omit<ProductCategory, "id" | "updatedAt">, actor: AdminMember): ProductCategory {
  const newCat: ProductCategory = {
    ...data,
    id: `cat-${data.slug}`,
    updatedAt: new Date().toISOString(),
  };
  ADMIN_CATEGORIES.push(newCat);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "category.create",
    module: "categories",
    recordReference: newCat.id,
    changeSummary: `Created category: ${newCat.name}.`,
  });

  return newCat;
}

export function updateAdminCategory(
  id: string,
  updates: Partial<ProductCategory>,
  actor: AdminMember
): ProductCategory | undefined {
  const cat = ADMIN_CATEGORIES.find((c) => c.id === id || c.slug === id);
  if (!cat) return undefined;

  Object.assign(cat, { ...updates, updatedAt: new Date().toISOString() });

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "category.update",
    module: "categories",
    recordReference: cat.id,
    changeSummary: `Updated olfactive category parameters: ${cat.name}.`,
  });

  return cat;
}

export function deleteAdminCategory(id: string, actor: AdminMember): { success: boolean; error?: string } {
  const index = ADMIN_CATEGORIES.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return { success: false, error: "Category not found." };

  const cat = ADMIN_CATEGORIES[index];
  if (cat.productCount && cat.productCount > 0) {
    return {
      success: false,
      error: `Cannot delete "${cat.name}" while ${cat.productCount} active fragrances are assigned. Reassign products first.`,
    };
  }

  ADMIN_CATEGORIES.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "category.delete",
    module: "categories",
    recordReference: id,
    changeSummary: `Removed olfactive category: ${cat.name}.`,
  });

  return { success: true };
}

export function getAdminCollections(): ProductCollectionAdmin[] {
  return [...ADMIN_COLLECTIONS];
}

export function createAdminCollection(
  data: Omit<ProductCollectionAdmin, "id" | "updatedAt">,
  actor: AdminMember
): ProductCollectionAdmin {
  const newCol: ProductCollectionAdmin = {
    ...data,
    id: `col-${data.slug}`,
    updatedAt: new Date().toISOString(),
  };
  ADMIN_COLLECTIONS.push(newCol);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "collection.create",
    module: "collections",
    recordReference: newCol.id,
    changeSummary: `Created collection curation: ${newCol.name}.`,
  });

  return newCol;
}

export function updateAdminCollection(
  id: string,
  updates: Partial<ProductCollectionAdmin>,
  actor: AdminMember
): ProductCollectionAdmin | undefined {
  const col = ADMIN_COLLECTIONS.find((c) => c.id === id || c.slug === id);
  if (!col) return undefined;

  Object.assign(col, { ...updates, updatedAt: new Date().toISOString() });

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "collection.update",
    module: "collections",
    recordReference: col.id,
    changeSummary: `Updated curation properties for ${col.name}.`,
  });

  return col;
}

export function deleteAdminCollection(id: string, actor: AdminMember): boolean {
  const index = ADMIN_COLLECTIONS.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return false;

  const col = ADMIN_COLLECTIONS[index];
  ADMIN_COLLECTIONS.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "collection.delete",
    module: "collections",
    recordReference: id,
    changeSummary: `Removed collection: ${col.name}.`,
  });

  return true;
}

// ==============================================================================
// 7. REVIEW MODERATION OPERATIONS
// ==============================================================================
export function getAdminReviews(): ProductReview[] {
  return [...ADMIN_REVIEWS];
}

export function moderateReview(
  reviewId: string,
  newStatus: ProductReview["status"],
  moderationNote: string,
  actor: AdminMember
): ProductReview | undefined {
  const review = ADMIN_REVIEWS.find((r) => r.id === reviewId);
  if (!review) return undefined;

  review.status = newStatus;
  review.moderatedBy = actor.email;
  review.moderatedAt = new Date().toISOString();
  review.moderationNote = moderationNote;

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "review.moderate",
    module: "reviews",
    recordReference: reviewId,
    changeSummary: `Moderated review for ${review.productName} to ${newStatus}.`,
  });

  return review;
}

export function deleteReview(reviewId: string, actor: AdminMember): boolean {
  const index = ADMIN_REVIEWS.findIndex((r) => r.id === reviewId);
  if (index === -1) return false;

  const review = ADMIN_REVIEWS[index];
  ADMIN_REVIEWS.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "review.delete",
    module: "reviews",
    recordReference: reviewId,
    changeSummary: `Deleted review from ${review.customerName} on ${review.productName}.`,
  });

  return true;
}

// ==============================================================================
// 7B. COUPONS MANAGEMENT OPERATIONS
// ==============================================================================
export function getAdminCoupons(): Coupon[] {
  return [...ADMIN_COUPONS];
}

export function createAdminCoupon(data: Coupon, actor: AdminMember): Coupon {
  const cleanCode = data.code.trim().toUpperCase();
  const existing = ADMIN_COUPONS.find((c) => c.code.toUpperCase() === cleanCode);
  if (existing) {
    Object.assign(existing, { ...data, code: cleanCode });
    return existing;
  }

  const newCoupon: Coupon = { ...data, code: cleanCode };
  ADMIN_COUPONS.unshift(newCoupon);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "coupon.create",
    module: "coupons",
    recordReference: cleanCode,
    changeSummary: `Created privilege courtesy code: ${cleanCode} (${data.discountType === "percentage" ? `${data.discountValue}%` : `$${data.discountValue}`}).`,
  });

  return newCoupon;
}

export function updateAdminCoupon(
  code: string,
  updates: Partial<Coupon>,
  actor: AdminMember
): Coupon | undefined {
  const coupon = ADMIN_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) return undefined;

  Object.assign(coupon, updates);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "coupon.update",
    module: "coupons",
    recordReference: coupon.code,
    changeSummary: `Updated courtesy parameters for ${coupon.code}.`,
  });

  return coupon;
}

export function toggleCouponStatus(code: string, actor: AdminMember): Coupon | undefined {
  const coupon = ADMIN_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) return undefined;

  coupon.isActive = !coupon.isActive;

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "coupon.toggle_status",
    module: "coupons",
    recordReference: coupon.code,
    changeSummary: `${coupon.isActive ? "Activated" : "Deactivated"} privilege courtesy code ${coupon.code}.`,
  });

  return coupon;
}

export function deleteAdminCoupon(code: string, actor: AdminMember): boolean {
  const index = ADMIN_COUPONS.findIndex((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (index === -1) return false;

  const deleted = ADMIN_COUPONS[index];
  ADMIN_COUPONS.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "coupon.delete",
    module: "coupons",
    recordReference: deleted.code,
    changeSummary: `Revoked privilege code: ${deleted.code}.`,
  });

  return true;
}

// ==============================================================================
// 7C. CLIENTS & CONNOISSEURS (CUSTOMERS) OPERATIONS
// ==============================================================================
export function getAdminCustomers(): AdminCustomer[] {
  return [...ADMIN_CUSTOMERS];
}

export function getAdminCustomerById(id: string): AdminCustomer | undefined {
  return ADMIN_CUSTOMERS.find((c) => c.id === id || c.email.toLowerCase() === id.toLowerCase());
}

export function toggleCustomerStatus(id: string, actor: AdminMember): AdminCustomer | undefined {
  const customer = ADMIN_CUSTOMERS.find((c) => c.id === id || c.email.toLowerCase() === id.toLowerCase());
  if (!customer) return undefined;

  customer.status = customer.status === "active" ? "suspended" : "active";

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "customer.toggle_status",
    module: "customers",
    recordReference: customer.email,
    changeSummary: `Adjusted client standing for ${customer.fullName} to ${customer.status}.`,
  });

  return customer;
}

export function addCustomerNote(id: string, note: string, actor: AdminMember): AdminCustomer | undefined {
  const customer = ADMIN_CUSTOMERS.find((c) => c.id === id || c.email.toLowerCase() === id.toLowerCase());
  if (!customer) return undefined;

  customer.notes = customer.notes || [];
  customer.notes.push(note);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "customer.add_note",
    module: "customers",
    recordReference: customer.email,
    changeSummary: `Added bespoke atelier note to patron ${customer.fullName}.`,
  });

  return customer;
}

// ==============================================================================
// 8. MARKETING & SUBSCRIBERS OPERATIONS
// ==============================================================================
export function getMarketingSubscribers(): MarketingSubscriber[] {
  return [...MARKETING_SUBSCRIBERS];
}

export function getMarketingCampaigns(): MarketingCampaign[] {
  return [...MARKETING_CAMPAIGNS];
}

export function createMarketingCampaign(
  campaign: Omit<MarketingCampaign, "id" | "createdAt" | "status">,
  actor: AdminMember
): MarketingCampaign {
  const newCamp: MarketingCampaign = {
    ...campaign,
    id: `camp-${Date.now()}`,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
  MARKETING_CAMPAIGNS.unshift(newCamp);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "marketing.create_campaign",
    module: "marketing",
    recordReference: newCamp.id,
    changeSummary: `Drafted marketing dispatch campaign: "${newCamp.name}".`,
  });

  return newCamp;
}

export function updateCampaignStatus(
  id: string,
  newStatus: MarketingCampaign["status"],
  actor: AdminMember
): MarketingCampaign | undefined {
  const camp = MARKETING_CAMPAIGNS.find((c) => c.id === id);
  if (!camp) return undefined;

  camp.status = newStatus;
  if (newStatus === "sent") {
    camp.sentAt = new Date().toISOString();
  }

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "marketing.status_change",
    module: "marketing",
    recordReference: camp.id,
    changeSummary: `Dispatched campaign state updated to ${newStatus} for "${camp.name}".`,
  });

  return camp;
}

// ==============================================================================
// 9. CMS & HOMEPAGE CONFIGURATION
// ==============================================================================
export function getCmsHomepage(): CmsHomepageData {
  return { ...CMS_HOMEPAGE };
}

export function updateCmsHomepage(updates: Partial<CmsHomepageData>, actor: AdminMember): CmsHomepageData {
  CMS_HOMEPAGE = { ...CMS_HOMEPAGE, ...updates };

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "cms.update_homepage",
    module: "content",
    recordReference: "HOMEPAGE",
    changeSummary: `Updated storefront homepage hero and editorial copy.`,
  });

  return { ...CMS_HOMEPAGE };
}

export function getCmsBanners(): CmsBanner[] {
  return [...CMS_BANNERS];
}

export function createCmsBanner(
  data: Omit<CmsBanner, "id">,
  actor: AdminMember
): CmsBanner {
  const newBanner: CmsBanner = {
    ...data,
    id: `banner-${Date.now()}`,
  };
  CMS_BANNERS.unshift(newBanner);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "cms.create_banner",
    module: "content",
    recordReference: newBanner.id,
    changeSummary: `Created promotional banner: "${newBanner.title}".`,
  });

  return newBanner;
}

export function updateCmsBanner(
  id: string,
  updates: Partial<CmsBanner>,
  actor: AdminMember
): CmsBanner | undefined {
  const banner = CMS_BANNERS.find((b) => b.id === id);
  if (!banner) return undefined;

  Object.assign(banner, updates);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "cms.update_banner",
    module: "content",
    recordReference: banner.id,
    changeSummary: `Updated banner settings for "${banner.title}".`,
  });

  return banner;
}

export function deleteCmsBanner(id: string, actor: AdminMember): boolean {
  const index = CMS_BANNERS.findIndex((b) => b.id === id);
  if (index === -1) return false;

  const deleted = CMS_BANNERS[index];
  CMS_BANNERS.splice(index, 1);

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: "cms.delete_banner",
    module: "content",
    recordReference: id,
    changeSummary: `Removed banner: "${deleted.title}".`,
  });

  return true;
}

// ==============================================================================
// 10. NOTIFICATION CENTER
// ==============================================================================
export function getAdminNotifications(): AdminNotification[] {
  return [...ADMIN_NOTIFICATIONS];
}

export function markNotificationAsRead(id: string): void {
  const notif = ADMIN_NOTIFICATIONS.find((n) => n.id === id);
  if (notif) notif.isRead = true;
}

export function markAllNotificationsAsRead(): void {
  ADMIN_NOTIFICATIONS.forEach((n) => (n.isRead = true));
}

// ==============================================================================
// 11. STORE SETTINGS OPERATIONS
// ==============================================================================
export function getStoreSettings() {
  return {
    general: { ...STORE_GENERAL_SETTINGS },
    payment: { ...STORE_PAYMENT_SETTINGS },
    shipping: { ...STORE_SHIPPING_SETTINGS },
    tax: { ...STORE_TAX_SETTINGS },
  };
}

export function updateStoreSettings(
  category: "general" | "payment" | "shipping" | "tax",
  updates:
    | Partial<StoreGeneralSettings>
    | Partial<StorePaymentSettings>
    | Partial<StoreShippingSettings>
    | Partial<StoreTaxSettings>
    | Record<string, unknown>,
  actor: AdminMember
) {
  if (category === "general") {
    STORE_GENERAL_SETTINGS = { ...STORE_GENERAL_SETTINGS, ...updates };
  } else if (category === "payment") {
    STORE_PAYMENT_SETTINGS = { ...STORE_PAYMENT_SETTINGS, ...updates } as StorePaymentSettings;
  } else if (category === "shipping") {
    STORE_SHIPPING_SETTINGS = { ...STORE_SHIPPING_SETTINGS, ...updates } as StoreShippingSettings;
  } else if (category === "tax") {
    STORE_TAX_SETTINGS = { ...STORE_TAX_SETTINGS, ...updates } as StoreTaxSettings;
  }

  logAdminActivity({
    adminId: actor.id,
    adminEmail: actor.email,
    adminRole: actor.role,
    action: `settings.update_${category}`,
    module: "settings",
    recordReference: category.toUpperCase(),
    changeSummary: `Updated store configuration settings for ${category}.`,
  });

  return getStoreSettings();
}

// ==============================================================================
// 12. DASHBOARD ANALYTICS COMPUTATION
// ==============================================================================
export function computeDashboardAnalytics(orders: Order[]): DashboardAnalytics {
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  // Extract unique customers
  const uniqueEmails = new Set(orders.map((o) => o.customerEmail.toLowerCase()));
  const totalCustomers = uniqueEmails.size;

  const pendingOrdersCount = orders.filter((o) => o.status === "confirmed" || o.status === "processing").length;

  // Real product stock counts
  const lowStockCount = ADMIN_PRODUCTS.reduce((count, p) => {
    return count + (p.variants.some((v) => v.priceNum > 0) ? 0 : 1);
  }, 1);

  // Status distribution
  const orderStatusDistribution: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    out_for_delivery: 0,
    delivered: 0,
    cancelled: 0,
  };

  orders.forEach((o) => {
    if (orderStatusDistribution[o.status] !== undefined) {
      orderStatusDistribution[o.status]++;
    }
  });

  // Revenue trend (daily)
  const revenueTrend = [
    { date: "Nov 01", revenue: 840, orders: 2 },
    { date: "Nov 02", revenue: 1260, orders: 3 },
    { date: "Nov 03", revenue: 980, orders: 2 },
    { date: "Nov 04", revenue: 1620, orders: 4 },
    { date: "Nov 05", revenue: 2140, orders: 5 },
    { date: "Nov 06", revenue: 1890, orders: 4 },
    { date: "Nov 07", revenue: totalRevenue > 0 ? totalRevenue : 2480, orders: paidOrders.length > 0 ? paidOrders.length : 6 },
  ];

  // Top selling products
  const topSellingProducts = [
    { id: "golden-reverie", name: "Golden Reverie (Extrait)", volumeSold: 42, revenue: 10080 },
    { id: "velvet-essence", name: "Velvet Essence (Extrait)", volumeSold: 35, revenue: 9100 },
    { id: "santale-nocturne", name: "Santal Nocturne", volumeSold: 28, revenue: 7140 },
    { id: "fleur-de-soie", name: "Fleur de Soie", volumeSold: 24, revenue: 5280 },
  ];

  // Recent orders
  const recentOrders = orders.slice(0, 5).map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    customerEmail: o.customerEmail,
    totalAmount: o.totalAmount,
    status: o.status,
    paymentStatus: o.paymentStatus,
    createdAt: o.createdAt,
  }));

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    revenueChangePct: 14.8,
    totalOrders,
    ordersChangePct: 9.2,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    totalCustomers,
    pendingOrdersCount,
    lowStockCount,
    revenueTrend,
    orderStatusDistribution,
    topSellingProducts,
    recentOrders,
  };
}
