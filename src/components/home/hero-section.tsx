"use client";

import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Fragology Hero Introduction"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-brand-deep border-b border-border-subtle"
    >
      {/* Background Cinematic Atmosphere & Lighting */}
      <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-brand-espresso/80 rounded-full blur-[100px] pointer-events-none" />

      <Container size="wide" className="relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full border border-gold-primary/30 bg-brand-espresso/60 backdrop-blur-xs">
              <Sparkles size={12} className="text-gold-primary" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-gold-champagne font-medium">
                A NEW FRAGRANCE CHAPTER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-neutral-ivory leading-[1.08]">
              THE ESSENCE OF NATURE, <span className="italic font-normal text-gold-champagne">BOTTLED.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-muted font-light leading-relaxed max-w-xl">
              Discover a world of refined fragrances, thoughtfully composed to express individuality, elegance, and timeless character.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollToSection("#featured")}
              >
                EXPLORE COLLECTION
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => scrollToSection("#story")}
              >
                DISCOVER OUR STORY
              </Button>
            </div>

            {/* Hero Trust Micro-Indicators */}
            <div className="pt-6 border-t border-border-subtle/50 grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-neutral-ivory font-light">
                  30%
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-neutral-muted">
                  Extrait Concentration
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-neutral-ivory font-light">
                  Pure
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-neutral-muted">
                  Botanical Absolutes
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-neutral-ivory font-light">
                  Haute
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-neutral-muted">
                  French Distillation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual / Perfume Flacon & Botanical Composition */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            {/* Visual Canvas Framing */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-espresso/90 via-brand-rich to-brand-deep p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute inset-0 bg-radial-luxury opacity-80 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-gold-primary/10 pointer-events-none" />

              {/* Decorative Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-primary/50" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-primary/50" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-primary/50" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-primary/50" />

              {/* Atmospheric Background Floral Silhouette Lines */}
              <svg
                className="absolute inset-0 w-full h-full text-gold-primary/10 pointer-events-none stroke-current"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50 450 C 120 350, 180 200, 220 50" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M350 450 C 280 320, 220 220, 180 50" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="200" cy="220" r="140" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="200" cy="220" r="170" strokeWidth="0.5" strokeOpacity="0.2" />
              </svg>

              {/* Central Iconic Perfume Bottle Presentation */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Heavy Gold Crystal Stopper */}
                <div className="h-10 w-16 bg-gradient-to-b from-gold-champagne via-gold-primary to-gold-soft border border-gold-champagne/60 rounded-xs shadow-gold-glow flex items-center justify-center">
                  <div className="w-8 h-[1px] bg-brand-deep/40" />
                </div>
                {/* Flacon Neck */}
                <div className="h-3 w-8 bg-gradient-to-r from-gold-muted via-gold-primary to-gold-soft border-x border-gold-champagne/50" />
                {/* Flacon Shoulder */}
                <div className="w-48 h-3 bg-gradient-to-r from-brand-espresso via-gold-primary/20 to-brand-espresso border-t border-x border-gold-primary/40 rounded-t-xs" />
                {/* Flacon Architectural Glass Body */}
                <div className="relative w-48 h-64 rounded-b-xs border-b border-x border-gold-primary/40 bg-gradient-to-b from-brand-deep/80 via-gold-primary/10 to-brand-espresso/90 backdrop-blur-sm p-6 flex flex-col items-center justify-between shadow-2xl">
                  {/* Internal Liquid Core Sheen */}
                  <div className="absolute inset-x-3 top-2 bottom-6 rounded-xs bg-gradient-to-b from-gold-primary/20 via-gold-champagne/25 to-gold-soft/10 opacity-75" />

                  {/* Top Note Watermark */}
                  <span className="relative z-10 text-[8px] font-mono uppercase tracking-[0.3em] text-gold-champagne/80">
                    EXTRAIT DE PARFUM
                  </span>

                  {/* Brand Flacon Label */}
                  <div className="relative z-10 my-auto w-full border border-gold-primary/50 bg-brand-deep/95 py-4 px-3 text-center shadow-lg">
                    <span className="block font-serif text-sm tracking-[0.3em] uppercase text-neutral-ivory font-light">
                      FRAGOLOGY
                    </span>
                    <span className="block text-[7px] font-sans tracking-[0.25em] text-gold-primary uppercase mt-1">
                      Maison de Parfumerie
                    </span>
                  </div>

                  {/* Base Flacon Meta */}
                  <div className="relative z-10 flex items-center justify-between w-full text-[8px] font-mono text-neutral-muted/80 tracking-widest uppercase pt-2 border-t border-gold-primary/20">
                    <span>100 ML</span>
                    <span>3.4 FL. OZ.</span>
                  </div>
                </div>

                {/* Base Shadow Reflection */}
                <div className="w-36 h-3 bg-gold-primary/20 rounded-full blur-md mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <button
            onClick={() => scrollToSection("#benefits")}
            className="group flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne transition-colors"
            aria-label="Scroll to benefits"
          >
            <span className="text-[9px] font-sans uppercase tracking-[0.25em]">Discover More</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
