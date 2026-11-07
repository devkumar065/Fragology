import { AdminRole, AdminModule, PermissionAction } from "./types";

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Administrator",
  product_manager: "Product Manager",
  inventory_manager: "Inventory Manager",
  order_manager: "Order & Fulfillment Manager",
  customer_support: "Customer Concierge Specialist",
  marketing_manager: "Marketing Director",
  content_manager: "Content & Editorial Manager",
};

// Module access matrix by role
export const ROLE_MODULE_PERMISSIONS: Record<AdminRole, Record<AdminModule, PermissionAction[]>> = {
  super_admin: {
    dashboard: ["view", "export", "manage"],
    products: ["view", "create", "edit", "delete", "export", "manage"],
    categories: ["view", "create", "edit", "delete", "manage"],
    collections: ["view", "create", "edit", "delete", "manage"],
    inventory: ["view", "create", "edit", "delete", "export", "manage"],
    orders: ["view", "create", "edit", "delete", "approve", "export", "manage"],
    customers: ["view", "create", "edit", "delete", "export", "manage"],
    coupons: ["view", "create", "edit", "delete", "export", "manage"],
    reviews: ["view", "create", "edit", "delete", "approve", "manage"],
    content: ["view", "create", "edit", "delete", "approve", "manage"],
    marketing: ["view", "create", "edit", "delete", "approve", "export", "manage"],
    settings: ["view", "create", "edit", "delete", "manage"],
  },
  product_manager: {
    dashboard: ["view"],
    products: ["view", "create", "edit", "delete", "export", "manage"],
    categories: ["view", "create", "edit", "delete", "manage"],
    collections: ["view", "create", "edit", "delete", "manage"],
    inventory: ["view"],
    orders: [],
    customers: [],
    coupons: ["view"],
    reviews: ["view", "approve"],
    content: ["view"],
    marketing: [],
    settings: [],
  },
  inventory_manager: {
    dashboard: ["view"],
    products: ["view"],
    categories: ["view"],
    collections: ["view"],
    inventory: ["view", "create", "edit", "export", "manage"],
    orders: ["view"],
    customers: [],
    coupons: [],
    reviews: [],
    content: [],
    marketing: [],
    settings: [],
  },
  order_manager: {
    dashboard: ["view"],
    products: ["view"],
    categories: ["view"],
    collections: ["view"],
    inventory: ["view"],
    orders: ["view", "edit", "approve", "export", "manage"],
    customers: ["view"],
    coupons: ["view"],
    reviews: [],
    content: [],
    marketing: [],
    settings: [],
  },
  customer_support: {
    dashboard: ["view"],
    products: ["view"],
    categories: ["view"],
    collections: ["view"],
    inventory: ["view"],
    orders: ["view"],
    customers: ["view", "edit"],
    coupons: ["view"],
    reviews: ["view", "approve"],
    content: [],
    marketing: [],
    settings: [],
  },
  marketing_manager: {
    dashboard: ["view"],
    products: ["view"],
    categories: ["view"],
    collections: ["view"],
    inventory: ["view"],
    orders: ["view", "export"],
    customers: ["view", "export"],
    coupons: ["view", "create", "edit", "delete", "manage"],
    reviews: ["view"],
    content: ["view"],
    marketing: ["view", "create", "edit", "delete", "approve", "export", "manage"],
    settings: [],
  },
  content_manager: {
    dashboard: ["view"],
    products: ["view"],
    categories: ["view"],
    collections: ["view", "edit"],
    inventory: [],
    orders: [],
    customers: [],
    coupons: [],
    reviews: ["view", "approve"],
    content: ["view", "create", "edit", "delete", "approve", "manage"],
    marketing: ["view"],
    settings: [],
  },
};

export function canAccessModule(role: AdminRole, module: AdminModule): boolean {
  if (role === "super_admin") return true;
  const permissions = ROLE_MODULE_PERMISSIONS[role]?.[module] || [];
  return permissions.includes("view");
}

export function hasPermission(
  role: AdminRole,
  module: AdminModule,
  action: PermissionAction
): boolean {
  if (role === "super_admin") return true;
  const permissions = ROLE_MODULE_PERMISSIONS[role]?.[module] || [];
  return permissions.includes(action) || permissions.includes("manage");
}
