export interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export const ANNOUNCEMENT_CONFIG = {
  enabled: true,
  message: "COMPLIMENTARY SAMPLES WITH EVERY ORDER",
  link: "/shop",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isAnchor: false },
  { label: "Fragrances", href: "/shop", isAnchor: false },
  { label: "Collections", href: "/collections", isAnchor: false },
  { label: "Scent Finder", href: "/scent-finder", isAnchor: false },
  { label: "Our Story", href: "/about", isAnchor: false },
  { label: "Journal", href: "/journal", isAnchor: false },
];

export const FOOTER_SECTIONS = {
  shop: [
    { label: "All Fragrances", href: "/shop" },
    { label: "Signature Collection", href: "/collections/signature-collection" },
    { label: "Scent Families", href: "/collections" },
    { label: "Scent Finder Quiz", href: "/scent-finder" },
  ],
  information: [
    { label: "Our Story", href: "/about" },
    { label: "Fragrance Journal", href: "/journal" },
    { label: "Client Concierge", href: "/contact" },
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
