export interface ProductDemo {
  id: string;
  name: string;
  family: string;
  price: string;
  volume: string;
  badge?: "Bestseller" | "Limited Edition" | "New" | null;
  description: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  accentColor: string;
}

export const FEATURED_FRAGRANCES: ProductDemo[] = [
  {
    id: "golden-reverie",
    name: "Golden Reverie",
    family: "Oriental Amber",
    price: "$240",
    volume: "100ml Extrait de Parfum",
    badge: "Bestseller",
    description:
      "A radiant contemplation of warm amber resins, saffron threads, and aged Bourbon vanilla.",
    notes: {
      top: "Persian Saffron, Bergamot Zest",
      heart: "Golden Amber, Heliotrope, Cardamom",
      base: "Bourbon Vanilla, Labdanum, Benzoin",
    },
    accentColor: "#C8A45D",
  },
  {
    id: "velvet-essence",
    name: "Velvet Essence",
    family: "Woody Leathery",
    price: "$260",
    volume: "100ml Extrait de Parfum",
    badge: "Limited Edition",
    description:
      "A tactile composition of Florentine leather, birch tar, and ancient Atlas cedarwood.",
    notes: {
      top: "Crushed Black Pepper, Clary Sage",
      heart: "Supple Leather, Violet Leaf, Orris",
      base: "Atlas Cedar, Smoked Birch, Vetiver",
    },
    accentColor: "#AE8847",
  },
  {
    id: "amber-dusk",
    name: "Amber Dusk",
    family: "Warm Gourmand",
    price: "$250",
    volume: "100ml Extrait de Parfum",
    badge: null,
    description:
      "The quiet warmth of twilight captured in wild mountain honey, dark cocoa, and roasted tonka bean.",
    notes: {
      top: "Bitter Almond, Cinnamon Bark",
      heart: "Wild Honey, Dark Cacao, Plum Accord",
      base: "Roasted Tonka, Frankincense, Sandalwood",
    },
    accentColor: "#80633B",
  },
  {
    id: "midnight-bloom",
    name: "Midnight Bloom",
    family: "Floral Botanical",
    price: "$230",
    volume: "100ml Extrait de Parfum",
    badge: "New",
    description:
      "An enigmatic night garden of blooming jasmine sambac, crimson damask rose, and black tea.",
    notes: {
      top: "Pink Peppercorn, Mandarin Leaf",
      heart: "Night Jasmine Sambac, Damask Rose",
      base: "Black Tea Absolu, White Musk, Patchouli",
    },
    accentColor: "#E2C78D",
  },
];
