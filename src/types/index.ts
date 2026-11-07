export interface FragranceProduct {
  id: string;
  slug: string;
  name: string;
  family: string;
  concentration: string;
  price: number;
  volume: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  images: string[];
  inStock: boolean;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  productCount: number;
}
