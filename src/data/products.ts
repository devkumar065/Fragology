import { Product } from "@/types/product";

export const PRODUCTS_CATALOG: Product[] = [];

// Backward-compatible export for Homepage
export const FEATURED_FRAGRANCES: Product[] = PRODUCTS_CATALOG.slice(0, 4);

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS_CATALOG.slice(0, count);

  return PRODUCTS_CATALOG.filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same family
      if (a.family === current.family && b.family !== current.family) return -1;
      if (b.family === current.family && a.family !== current.family) return 1;
      return 0;
    })
    .slice(0, count);
}

// Export alias for Storefront E-commerce & database synchronization
export const PRODUCTS = PRODUCTS_CATALOG;
