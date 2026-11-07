import { Collection } from "@/types/collection";

export const COLLECTIONS_DATA: Collection[] = [
  {
    id: "signature-collection",
    slug: "signature-collection",
    title: "Signature Collection",
    subtitle: "The Masterworks of the Maison",
    description:
      "A considered selection of distinctive fragrances made to leave a lasting impression. Formulated in high concentration extrait de parfum.",
    story:
      "The Signature Collection represents the foundational philosophy of Fragology. Each flacon is an uncompromising architectural achievement, matured over multiple months to achieve resonance, depth, and transcendent sillage.",
    productCount: 5,
    productIds: ["golden-reverie", "velvet-essence", "amber-dusk", "midnight-bloom", "santale-nocturne"],
    accentGradient: "from-gold-primary/20 via-brand-espresso to-brand-deep",
    featured: true,
  },
  {
    id: "floral-collection",
    slug: "floral-collection",
    title: "Floral Collection",
    subtitle: "Luminous Petals & Night Botanicals",
    description:
      "Capturing the delicate, ethereal spectrum of natural petals, nocturnal blossoms, and powdery Florentine orris.",
    story:
      "Flowers are distilled at the peak of dawn and late twilight. From night-blooming jasmine sambac to Centifolia roses harvested by hand, this collection transforms romantic botanical heritage into modern, poised elegance.",
    productCount: 2,
    productIds: ["midnight-bloom", "fleur-de-soie"],
    accentGradient: "from-rose-950/30 via-brand-espresso to-brand-deep",
  },
  {
    id: "woody-collection",
    slug: "woody-collection",
    title: "Woody Collection",
    subtitle: "Grounded Resins & Ancient Barks",
    description:
      "Smoky cedar, Haitian vetiver, Florentine leather, and sacred Australian sandalwood creating an enduring aura of quiet strength.",
    story:
      "Deep roots, ancient timber, and smoked resins. The Woody Collection grounds the wearer in quiet confidence and architectural presence, creating a meditative trail that lingers intimately on skin.",
    productCount: 3,
    productIds: ["velvet-essence", "santale-nocturne", "vetiver-celeste"],
    accentGradient: "from-amber-950/30 via-brand-espresso to-brand-deep",
  },
  {
    id: "oriental-collection",
    slug: "oriental-collection",
    title: "Oriental Collection",
    subtitle: "Warm Amber & Opulent Spices",
    description:
      "Opulent amber resins, bourbon vanilla, saffron threads, and rare warm spices layered in transcendent nocturnal warmth.",
    story:
      "Rich with nocturnal mystique. The Oriental Collection draws upon the history of ancient trade routes, warm resins, and velvety spices to deliver unforgettable evening presence.",
    productCount: 2,
    productIds: ["golden-reverie", "amber-dusk"],
    accentGradient: "from-yellow-950/30 via-brand-espresso to-brand-deep",
  },
  {
    id: "fresh-collection",
    slug: "fresh-collection",
    title: "Fresh Collection",
    subtitle: "Coastal Citrus & Mineral Air",
    description:
      "Crisp Calabrian bergamot, ocean sea-mist, and sunlit citrus that awaken the senses with clarity and light.",
    story:
      "Formulated for effortless radiance. Combining crystalline marine notes with hand-expressed citrus oils to evoke Mediterranean morning currents.",
    productCount: 2,
    productIds: ["solaris-citron", "vetiver-celeste"],
    accentGradient: "from-emerald-950/30 via-brand-espresso to-brand-deep",
  },
  {
    id: "discovery-collection",
    slug: "discovery-collection",
    title: "Discovery Collection",
    subtitle: "The Olfactive Exploration Ensemble",
    description:
      "A curated anthology of miniature atomizers designed to guide your personal discovery across all five fragrance families.",
    story:
      "Perfume should be experienced over time, through morning air, warm afternoons, and quiet evenings. The Discovery Collection allows the patron to live with each formulation before committing to an architectural flacon.",
    productCount: 3,
    productIds: ["solaris-citron", "fleur-de-soie", "vetiver-celeste"],
    accentGradient: "from-stone-900 via-brand-espresso to-brand-deep",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS_DATA.find((c) => c.slug === slug || c.id === slug);
}
