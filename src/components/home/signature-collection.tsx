"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export interface SignatureCollectionProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function SignatureCollection({
  heading = "THE SIGNATURE COLLECTION",
  description = "Discover a considered selection of distinctive fragrances made to leave a lasting impression.",
  ctaText = "EXPLORE THE COLLECTION",
  onCtaClick,
}: SignatureCollectionProps) {
  const handleScrollToFeatured = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const el = document.querySelector("#featured");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="signature"
      aria-label="Signature Collection Banner"
      className="relative py-24 sm:py-32 lg:py-36 bg-gradient-to-b from-brand-rich via-brand-espresso to-brand-deep border-b border-border-subtle overflow-hidden"
    >
      {/* Cinematic Ambient Glow & Vignette */}
      <div className="absolute inset-0 bg-dark-radial opacity-90 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Geometry Filigree */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-border-subtle/40 pointer-events-none rounded-xs hidden md:block" />

      <Container size="default" className="relative z-10 text-center space-y-6 sm:space-y-8 max-w-3xl">
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
          CURATED ANTHOLOGY
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
          {heading}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
          {description}
        </p>

        <div className="pt-4 flex justify-center">
          <Button variant="primary" size="lg" onClick={handleScrollToFeatured}>
            {ctaText}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default SignatureCollection;
