export interface FragranceNotes {
  top: string;
  heart: string;
  base: string;
}

export interface ProductVariant {
  size: "30ml" | "50ml" | "100ml";
  volumeDisplay: string;
  price: string;
  priceNum: number;
}

export type FragranceFamilyType = "Floral" | "Woody" | "Oriental" | "Fresh" | "Unisex";

export type ScentCharacterType = "Sweet" | "Fresh" | "Spicy" | "Musky" | "Balanced";

export type OccasionType = "Everyday" | "Work" | "Evening" | "Special Occasions" | "Any Occasion";

export type IntensityType = "Light" | "Moderate" | "Intense";

export type MoodType = "Elegant" | "Mysterious" | "Energetic" | "Romantic" | "Minimal";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  family: FragranceFamilyType;
  concentration: "Extrait de Parfum (30%)" | "Eau de Parfum (20%)";
  price: string;
  priceNum: number;
  volume: string;
  variants: ProductVariant[];
  badge?: "Bestseller" | "Limited Edition" | "New" | null;
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
}

export type ProductDemo = Product;
