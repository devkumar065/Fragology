export interface ScentFamily {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  notesSample: string;
  accentGradient: string;
}

export const SCENT_FAMILIES: ScentFamily[] = [
  {
    id: "floral",
    title: "Floral",
    subtitle: "Luminous & Ethereal",
    description:
      "Luminous petals, dew-kissed jasmine, and velvet botanical accords that evoke blossoming serenity.",
    notesSample: "Jasmine Sambac, Damask Rose, Neroli",
    accentGradient: "from-rose-950/40 via-brand-espresso to-brand-deep",
  },
  {
    id: "woody",
    title: "Woody",
    subtitle: "Grounded & Sacred",
    description:
      "Smoky cedar, Haitian vetiver, and sacred Australian sandalwood creating an enduring aura of quiet strength.",
    notesSample: "Atlas Cedar, Haitian Vetiver, Sandalwood",
    accentGradient: "from-amber-950/40 via-brand-espresso to-brand-deep",
  },
  {
    id: "oriental",
    title: "Oriental",
    subtitle: "Opulent & Enveloping",
    description:
      "Opulent amber resins, bourbon vanilla, and rare warm spices layered in transcendent warmth.",
    notesSample: "Amber Resin, Cardamom, Bourbon Vanilla",
    accentGradient: "from-yellow-950/40 via-brand-espresso to-brand-deep",
  },
  {
    id: "fresh",
    title: "Fresh",
    subtitle: "Vibrant & Crisp",
    description:
      "Crisp Calabrian bergamot, ocean sea-mist, and sunlit citrus that awaken the senses with clarity.",
    notesSample: "Calabrian Bergamot, Sea Salt, White Grapefruit",
    accentGradient: "from-emerald-950/40 via-brand-espresso to-brand-deep",
  },
];
