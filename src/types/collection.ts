export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  productCount: number;
  productIds: string[];
  accentGradient: string;
  featured?: boolean;
}
