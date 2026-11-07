import type { Metadata } from "next";
import {
  HeroSection,
  BenefitsStrip,
  FeaturedFragrances,
  ScentFamilies,
  BrandStory,
  SignatureCollection,
  BrandValues,
  NewsletterSection,
} from "@/components/home";

export const metadata: Metadata = {
  title: "Fragology | Discover the Art of Fragrance",
  description:
    "Explore distinctive fragrances and discover the world of Fragology, a modern luxury fragrance brand crafted for individuality and timeless character.",
  openGraph: {
    title: "Fragology | Discover the Art of Fragrance",
    description:
      "Explore distinctive fragrances and discover the world of Fragology, a modern luxury fragrance brand.",
    url: "/",
    siteName: "Fragology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fragology | Discover the Art of Fragrance",
    description:
      "Explore distinctive fragrances and discover the world of Fragology, a modern luxury fragrance brand.",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-brand-deep">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Benefits Strip */}
      <BenefitsStrip />

      {/* 3. Featured Fragrances */}
      <FeaturedFragrances />

      {/* 4. Shop by Fragrance Family */}
      <ScentFamilies />

      {/* 5. Brand Story / Manifesto */}
      <BrandStory />

      {/* 6. Signature Collection */}
      <SignatureCollection />

      {/* 7. Craftsmanship & Brand Values */}
      <BrandValues />

      {/* 8. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
