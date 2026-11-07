export type FAQCategory =
  | "Products & Fragrances"
  | "Orders"
  | "Shipping"
  | "Returns & Refunds"
  | "Payments"
  | "General Questions";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}
