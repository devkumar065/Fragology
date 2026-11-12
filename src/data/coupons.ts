import { Coupon } from "@/types/coupon";

export const MAISON_COUPONS: Coupon[] = [
  {
    code: "FRAGOLOGY10",
    description: "Maison Privilège: 10% complimentary courtesy across all orders",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 0,
    isActive: true,
  },
  {
    code: "MAISON20",
    description: "Haute Parfumerie Invitation: 20% privilege on orders exceeding ₹25,000",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 25000,
    maxDiscount: 10000,
    isActive: true,
  },
  {
    code: "WELCOME50",
    description: "New Client Courtesy: ₹2,000 credit for orders exceeding ₹18,000",
    discountType: "fixed",
    discountValue: 2000,
    minOrderValue: 18000,
    maxDiscount: 2000,
    isActive: true,
  },
];

export function validateCoupon(code: string, subtotal: number): {
  valid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
} {
  const cleanCode = code.trim().toUpperCase();
  const match = MAISON_COUPONS.find(
    (c) => c.code.toUpperCase() === cleanCode && c.isActive
  );

  if (!match) {
    return {
      valid: false,
      discountAmount: 0,
      message: `The privilege code "${cleanCode}" is not recognized or has expired.`,
    };
  }

  if (match.minOrderValue && subtotal < match.minOrderValue) {
    return {
      valid: false,
      coupon: match,
      discountAmount: 0,
      message: `Privilege code "${cleanCode}" requires a minimum order of ₹${match.minOrderValue.toLocaleString("en-IN")}. (Current bag: ₹${subtotal.toLocaleString("en-IN")})`,
    };
  }

  let discount = 0;
  if (match.discountType === "percentage") {
    discount = (subtotal * match.discountValue) / 100;
  } else {
    discount = match.discountValue;
  }

  if (match.maxDiscount && discount > match.maxDiscount) {
    discount = match.maxDiscount;
  }

  // Discount cannot exceed subtotal
  discount = Math.min(discount, subtotal);

  return {
    valid: true,
    coupon: match,
    discountAmount: Math.round(discount * 100) / 100,
    message: `Privilege code "${cleanCode}" applied: ${match.description}`,
  };
}
