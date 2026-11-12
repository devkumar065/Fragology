export interface CartItem {
  id: string; // unique cart line item id, e.g. `${productId}-${variantSize}`
  productId: string;
  productSlug: string;
  productName: string;
  productSubtitle?: string;
  variantSize: string;
  volumeDisplay: string;
  concentration: string;
  priceNum: number;
  unitPrice?: number; // alias for priceNum
  priceDisplay: string;
  quantity: number;
  image?: string;
  accentColor?: string;
}

export interface CartCalculation {
  subtotal: number;
  discount: number;
  shipping: number;
  estimatedTax: number;
  total: number;
}
