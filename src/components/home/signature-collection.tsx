"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MotionFadeIn } from "@/components/ui/motion-reveal";

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
      className="relative py-28 sm:py-36 lg:py-44 bg-brand-deep border-b border-border-subtle overflow-hidden"
    >
      {/* Background Cinematic Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/collections/signature-collection-banner.jpg"
          alt="The Fragology Signature Collection"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        {/* Layered luxury obsidian & gold dark wash for crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/85 to-brand-deep/75" />
        <div className="absolute inset-0 bg-radial-luxury opacity-80" />
      </div>

      {/* Decorative Geometry Filigree */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-gold-primary/20 pointer-events-none rounded-xs hidden md:block z-10" />

      <Container size="default" className="relative z-10 text-center max-w-3xl">
        <MotionFadeIn direction="up" className="space-y-6 sm:space-y-8">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium bg-brand-deep/70 px-4 py-1.5 border border-border-subtle/70 inline-block backdrop-blur-xs">
            CURATED ANTHOLOGY
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]">
            {heading}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-ivory/80 font-light leading-relaxed max-w-xl mx-auto drop-shadow-md">
            {description}
          </p>

          <div className="pt-4 flex justify-center">
            <Button variant="primary" size="lg" onClick={handleScrollToFeatured}>
              {ctaText}
            </Button>
          </div>
        </MotionFadeIn>
      </Container>
    </section>
  );
}

export default SignatureCollection;
