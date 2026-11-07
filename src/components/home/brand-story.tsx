"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  const scrollToValues = () => {
    const el = document.querySelector("#values");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="story"
      aria-label="Brand Story and Manifesto"
      className="py-20 sm:py-28 lg:py-32 bg-brand-deep border-b border-border-subtle overflow-hidden relative"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Luxury Visual / Atmospheric Composition */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-espresso via-brand-chocolate to-brand-deep p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Radial gradient sheen */}
              <div className="absolute inset-0 bg-radial-luxury opacity-70 pointer-events-none" />

              {/* Decorative Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-primary/50" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-primary/50" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-primary/50" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-primary/50" />

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.3em] text-gold-champagne/80">
                <span>MANIFESTO</span>
                <span>CHAPTER I</span>
              </div>

              {/* Center Emblem Graphic */}
              <div className="relative z-10 my-auto text-center space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-primary/40 bg-brand-deep/80 shadow-gold-subtle">
                  <span className="font-serif text-3xl font-light text-gold-primary">
                    F
                  </span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-light text-neutral-ivory italic max-w-xs mx-auto">
                  “The invisible language spoken before any word is uttered.”
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="relative z-10 text-center border-t border-border-subtle/40 pt-4">
                <span className="text-[10px] font-sans tracking-[0.25em] text-neutral-muted uppercase">
                  FRAGOLOGY MAISON
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-gold-champagne font-medium block">
              THE ART OF FRAGRANCE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide leading-[1.12]">
              MORE THAN A SCENT. <br className="hidden sm:inline" />
              <span className="text-gold-champagne italic font-normal">AN EXPRESSION OF YOU.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-muted font-light leading-relaxed">
              At Fragology, fragrance is an expression of individuality. Every composition begins with inspiration and comes together as an experience designed to be remembered.
            </p>

            <p className="text-xs sm:text-sm text-neutral-muted/80 font-light leading-relaxed">
              We approach each creation through the lens of architectural design—balancing volatile top chords that awaken the air with deeply grounding resins that linger closely on the skin for hours.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Button variant="primary" size="md" onClick={scrollToValues}>
                DISCOVER OUR STORY
              </Button>
              <Link href="/about">
                <Button variant="minimal" size="md">
                  Read Maison Philosophy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BrandStory;
