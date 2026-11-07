export const SITE_CONFIG = {
  name: "Fragology",
  description: "Curated artisanal perfumery, bespoke scents, and olfactive journeys.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fragology.com",
};

export const OLFACTIVE_FAMILIES = [
  "Woody",
  "Floral",
  "Oriental",
  "Citrus",
  "Aquatic",
  "Gourmand",
  "Chypre",
  "Fougère",
] as const;

export const FRAGRANCE_CONCENTRATIONS = [
  "Extrait de Parfum (25-35%)",
  "Eau de Parfum (15-20%)",
  "Eau de Toilette (5-15%)",
] as const;
