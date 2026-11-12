export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface ProductVariant {
  size: string;
  volumeDisplay: string;
  price: string;
  priceNum: number;
}

export type FragranceFamilyType =
  | "Floral"
  | "Woody"
  | "Oriental"
  | "Fresh"
  | "Unisex"
  | "Spicy"
  | "Gourmand"
  | "Aromatic"
  | "Leather"
  | "Aquatic"
  | string;

export type ScentCharacterType = "Sweet" | "Fresh" | "Spicy" | "Musky" | "Balanced" | string;

export type OccasionType = "Everyday" | "Work" | "Evening" | "Special Occasions" | "Any Occasion" | string;

export type IntensityType = "Light" | "Moderate" | "Intense" | string;

export type MoodType = "Elegant" | "Mysterious" | "Energetic" | "Romantic" | "Minimal" | string;

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  subtitle?: string;
  family: FragranceFamilyType;
  concentration: string;
  price: string;
  priceNum: number;
  volume: string;
  variants: ProductVariant[];
  badge?: "Bestseller" | "Limited Edition" | "New" | string | null;
  description: string;
  story: {
    inspiration: string;
    personality: string;
    recommendedOccasions: string;
  };
  notes: FragranceNotes;
  accordTags: string[];
  collections: string[];
  character: ScentCharacterType;
  occasion: OccasionType;
  intensity: IntensityType;
  mood: MoodType;
  inStock: boolean;
  accentColor: string;
  ratingDemo?: {
    score: number;
    count: number;
  };
  images?: string[];
  productUrl?: string;
  sourceUrl?: string;
}

export type ProductDemo = Product;
