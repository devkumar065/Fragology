export interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export const ANNOUNCEMENT_CONFIG = {
  enabled: true,
  message: "COMPLIMENTARY SAMPLES WITH EVERY ORDER",
  link: "#featured",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero", isAnchor: true },
  { label: "Fragrances", href: "#featured", isAnchor: true },
  { label: "Collections", href: "#collections", isAnchor: true },
  { label: "Our Story", href: "#story", isAnchor: true },
  { label: "Journal", href: "/journal", isAnchor: false },
];

export const FOOTER_SECTIONS = {
  shop: [
    { label: "All Fragrances", href: "#featured" },
    { label: "Signature Collection", href: "#signature" },
    { label: "Scent Families", href: "#collections" },
    { label: "Discovery Samples", href: "#featured" },
  ],
  information: [
    { label: "Our Story", href: "#story" },
    { label: "Craftsmanship & Values", href: "#values" },
    { label: "Fragrance Journal", href: "/journal" },
    { label: "Client FAQ", href: "/faq" },
  ],
  customerCare: [
    { label: "Order Tracking", href: "/order-tracking" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Returns & Exchanges", href: "/returns-refunds" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
