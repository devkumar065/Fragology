import { Product } from "@/types/product";

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: "golden-reverie",
    slug: "golden-reverie",
    name: "Golden Reverie",
    subtitle: "Luminous Amber & Persian Saffron",
    family: "Oriental",
    concentration: "Extrait de Parfum (30%)",
    price: "$240",
    priceNum: 240,
    volume: "100ml Extrait",
    badge: "Bestseller",
    description:
      "A radiant contemplation of warm amber resins, saffron threads, and aged Bourbon vanilla.",
    story: {
      inspiration:
        "Inspired by the golden hour over ancient spice trade sanctuaries, where warmth settles into stone courtyards.",
      personality:
        "Opulent, magnetic, and contemplative. Leaves a resonant sillage that turns heads quietly.",
      recommendedOccasions: "Formal evenings, black-tie celebrations, and contemplative twilight dinners.",
    },
    notes: {
      top: "Persian Saffron, Calabrian Bergamot Zest, Pink Pepper",
      heart: "Golden Amber, Heliotrope, Cardamom Pods",
      base: "Bourbon Vanilla, Labdanum Resin, Benzoin Tears",
    },
    accordTags: ["amber", "saffron", "vanilla", "spicy", "oriental"],
    collections: ["signature-collection", "oriental-collection"],
    character: "Spicy",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#C8A45D",
    ratingDemo: { score: 4.9, count: 68 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$110", priceNum: 110 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$165", priceNum: 165 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$240", priceNum: 240 },
    ],
  },
  {
    id: "velvet-essence",
    slug: "velvet-essence",
    name: "Velvet Essence",
    subtitle: "Florentine Leather & Atlas Cedar",
    family: "Woody",
    concentration: "Extrait de Parfum (30%)",
    price: "$260",
    priceNum: 260,
    volume: "100ml Extrait",
    badge: "Limited Edition",
    description:
      "A tactile composition of Florentine leather, birch tar, and ancient Atlas cedarwood.",
    story: {
      inspiration:
        "The intimate atmosphere of a historic library bound in gilded leather and seasoned cedarwood shelving.",
      personality:
        "Aristocratic, grounded, and intensely sophisticated with dry smoky undertones.",
      recommendedOccasions: "Autumn evenings, gallery openings, and intimate intellectual gatherings.",
    },
    notes: {
      top: "Crushed Black Pepper, Clary Sage, Juniper",
      heart: "Supple Florentine Leather, Violet Leaf, Florentine Orris",
      base: "Atlas Cedar, Smoked Birch Tar, Haitian Vetiver",
    },
    accordTags: ["leather", "woody", "cedar", "smoky", "birch"],
    collections: ["signature-collection", "woody-collection"],
    character: "Musky",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Elegant",
    inStock: true,
    accentColor: "#AE8847",
    ratingDemo: { score: 4.8, count: 42 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$120", priceNum: 120 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$180", priceNum: 180 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$260", priceNum: 260 },
    ],
  },
  {
    id: "amber-dusk",
    slug: "amber-dusk",
    name: "Amber Dusk",
    subtitle: "Wild Mountain Honey & Roasted Tonka",
    family: "Oriental",
    concentration: "Extrait de Parfum (30%)",
    price: "$250",
    priceNum: 250,
    volume: "100ml Extrait",
    badge: null,
    description:
      "The quiet warmth of twilight captured in wild mountain honey, dark cocoa, and roasted tonka bean.",
    story: {
      inspiration:
        "The gentle transition from sunset into twilight as mountain flowers cool under the evening stars.",
      personality:
        "Comforting, indulgent, and deeply sensual without overpowering sweetness.",
      recommendedOccasions: "Private dinners, winter fireside evenings, and cool autumn strolls.",
    },
    notes: {
      top: "Bitter Almond, Ceylon Cinnamon Bark, Blood Orange",
      heart: "Wild Mountain Honey, Dark Cacao Absolu, Damask Plum",
      base: "Roasted Tonka Bean, Omani Frankincense, Mysore Sandalwood",
    },
    accordTags: ["honey", "amber", "tonka", "gourmand", "cinnamon"],
    collections: ["signature-collection", "oriental-collection"],
    character: "Sweet",
    occasion: "Special Occasions",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#80633B",
    ratingDemo: { score: 4.7, count: 39 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$115", priceNum: 115 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$175", priceNum: 175 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$250", priceNum: 250 },
    ],
  },
  {
    id: "midnight-bloom",
    slug: "midnight-bloom",
    name: "Midnight Bloom",
    subtitle: "Night Jasmine Sambac & Black Tea",
    family: "Floral",
    concentration: "Extrait de Parfum (30%)",
    price: "$230",
    priceNum: 230,
    volume: "100ml Extrait",
    badge: "New",
    description:
      "An enigmatic night garden of blooming jasmine sambac, crimson damask rose, and black tea.",
    story: {
      inspiration:
        "The heady aroma released by nocturnal blossoms opening only under the full moon in Grasse.",
      personality:
        "Hypnotic, poetic, and alluring with a dry, tannic edge of rare dark tea.",
      recommendedOccasions: "Intimate soirées, opera nights, and moonlight galas.",
    },
    notes: {
      top: "Pink Peppercorn, Italian Mandarin Leaf, Green Angelica",
      heart: "Night Jasmine Sambac, Grassoise Centifolia Rose, Magnolia",
      base: "Black Tea Absolu, White Cashmere Musk, Indonesian Patchouli",
    },
    accordTags: ["floral", "jasmine", "rose", "tea", "botanical"],
    collections: ["signature-collection", "floral-collection"],
    character: "Balanced",
    occasion: "Special Occasions",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#E2C78D",
    ratingDemo: { score: 4.9, count: 54 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$105", priceNum: 105 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$155", priceNum: 155 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$230", priceNum: 230 },
    ],
  },
  {
    id: "santale-nocturne",
    slug: "santale-nocturne",
    name: "Santal Nocturne",
    subtitle: "Australian Sandalwood & Papyrus",
    family: "Woody",
    concentration: "Extrait de Parfum (30%)",
    price: "$245",
    priceNum: 245,
    volume: "100ml Extrait",
    badge: "Bestseller",
    description:
      "A serene architectural woody fragrance built around sacred sandalwood, papyrus, and violet leaf.",
    story: {
      inspiration:
        "The meditative stillness of temple courtyards enveloped in sandalwood smoke and morning rain.",
      personality:
        "Calm, commanding, and minimalist. Ideal as a signature daily scent.",
      recommendedOccasions: "Executive boardroom meetings, studio sessions, and daily signature wear.",
    },
    notes: {
      top: "Cardamom Seeds, Violet Leaf, Bergamot",
      heart: "Egyptian Papyrus, Iris Butter, Cedar Needle",
      base: "Australian Sandalwood, Ambergris Accord, Iso E Super",
    },
    accordTags: ["woody", "sandalwood", "papyrus", "cardamom", "calm"],
    collections: ["signature-collection", "woody-collection"],
    character: "Balanced",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#AE8847",
    ratingDemo: { score: 5.0, count: 91 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$110", priceNum: 110 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$170", priceNum: 170 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$245", priceNum: 245 },
    ],
  },
  {
    id: "solaris-citron",
    slug: "solaris-citron",
    name: "Solaris Citron",
    subtitle: "Calabrian Bergamot & Sea Salt Accord",
    family: "Fresh",
    concentration: "Eau de Parfum (20%)",
    price: "$210",
    priceNum: 210,
    volume: "100ml Extrait",
    badge: "New",
    description:
      "Luminous sun-drenched coastal citrus accented by aromatic sea salt, neroli, and white amber.",
    story: {
      inspiration:
        "The cliffs of the Amalfi coast overlooking azure water where citrus groves meet the Mediterranean mist.",
      personality:
        "Crisp, invigorating, and effortlessly radiant.",
      recommendedOccasions: "Summer mornings, seaside excursions, and daily daytime wear.",
    },
    notes: {
      top: "Calabrian Bergamot, Amalfi Lemon, Sea Salt Crystals",
      heart: "Tunisian Neroli, Rosemary, White Jasmine Petals",
      base: "Sunlit Driftwood, White Amber, Mineral Musk",
    },
    accordTags: ["fresh", "citrus", "marine", "bergamot", "neroli"],
    collections: ["fresh-collection", "discovery-collection"],
    character: "Fresh",
    occasion: "Work",
    intensity: "Light",
    mood: "Energetic",
    inStock: true,
    accentColor: "#C8A45D",
    ratingDemo: { score: 4.8, count: 29 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$95", priceNum: 95 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$145", priceNum: 145 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$210", priceNum: 210 },
    ],
  },
  {
    id: "fleur-de-soie",
    slug: "fleur-de-soie",
    name: "Fleur de Soie",
    subtitle: "Dewy White Gardenia & Silk Musk",
    family: "Floral",
    concentration: "Extrait de Parfum (30%)",
    price: "$235",
    priceNum: 235,
    volume: "100ml Extrait",
    badge: null,
    description:
      "A silky, translucent bouquet of white gardenia, lily of the valley, and powdered orris root.",
    story: {
      inspiration:
        "The delicate feel of haute couture raw silk against warm skin on a spring morning.",
      personality:
        "Graceful, pure, and understated elegance.",
      recommendedOccasions: "Weddings, garden luncheons, and springtime celebrations.",
    },
    notes: {
      top: "Dewy Pear, Green Freesia, Aldehydes",
      heart: "White Gardenia, Lily of the Valley, Florentine Orris",
      base: "Silk Musk, Blonde Woods, Clean Cedar",
    },
    accordTags: ["floral", "gardenia", "musk", "powdery", "silk"],
    collections: ["floral-collection", "discovery-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Light",
    mood: "Romantic",
    inStock: true,
    accentColor: "#E2C78D",
    ratingDemo: { score: 4.6, count: 21 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$105", priceNum: 105 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$160", priceNum: 160 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$235", priceNum: 235 },
    ],
  },
  {
    id: "vetiver-celeste",
    slug: "vetiver-celeste",
    name: "Vétiver Céleste",
    subtitle: "Haitian Vetiver & Cold Incense",
    family: "Unisex",
    concentration: "Extrait de Parfum (30%)",
    price: "$225",
    priceNum: 225,
    volume: "100ml Extrait",
    badge: "Bestseller",
    description:
      "A refined, earth-meets-sky duality of roots and mineral freshness with cold Omani incense.",
    story: {
      inspiration:
        "High-altitude mountain plateaus where earthy vetiver roots mingle with crisp alpine currents.",
      personality:
        "Modern, poised, versatile, and magnetically unisex.",
      recommendedOccasions: "Year-round daily wear, professional settings, and creative milestones.",
    },
    notes: {
      top: "Grapefruit Peel, Pink Pepper, Nutmeg",
      heart: "Cold Incense, Haitian Vetiver Heart, Clary Sage",
      base: "Cedarwood, Oakmoss, Clean White Amber",
    },
    accordTags: ["unisex", "vetiver", "incense", "earthy", "clean"],
    collections: ["woody-collection", "fresh-collection", "discovery-collection"],
    character: "Balanced",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#AE8847",
    ratingDemo: { score: 4.9, count: 77 },
    variants: [
      { size: "30ml", volumeDisplay: "30ml Travel Flacon", price: "$100", priceNum: 100 },
      { size: "50ml", volumeDisplay: "50ml Presentation Flacon", price: "$150", priceNum: 150 },
      { size: "100ml", volumeDisplay: "100ml Architectural Flacon", price: "$225", priceNum: 225 },
    ],
  },
];

// Backward-compatible export for Phase 2 Homepage
export const FEATURED_FRAGRANCES = PRODUCTS_CATALOG.slice(0, 4);

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
