"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MotionFadeIn } from "@/components/ui/motion-reveal";

export function BrandStory() {
  const scrollToValues = () => {
    const el = document.querySelector("#values");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="story"
      aria-label="Brand Story and Manifesto"
      className="py-20 sm:py-28 lg:py-32 bg-brand-ivory border-y border-border-subtle overflow-hidden relative"
    >
      {/* Subtle Warm Editorial Ambient Sheen */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#F7F2EB] via-[#E4D9C7] to-transparent rounded-full blur-[100px] pointer-events-none opacity-70" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Luxury Photographic Manifesto Composition */}
          <MotionFadeIn direction="right" className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-xs border border-border-subtle overflow-hidden shadow-[0_20px_50px_rgba(23,17,12,0.3)] group">
              {/* Real Editorial Perfume Image */}
              <Image
                src="/images/story/brand-manifesto.jpg"
                alt="Fragology Haute Parfumerie Creation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Rich Chiaroscuro Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/50 to-brand-deep/30" />

              {/* Decorative Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-primary/70 z-10" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-primary/70 z-10" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-primary/70 z-10" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-primary/70 z-10" />

              {/* Card Content Overlay */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                {/* Top Meta */}
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.3em] text-gold-champagne bg-brand-deep/60 px-3 py-1.5 border border-border-subtle/60 backdrop-blur-xs w-full">
                  <span>MANIFESTO</span>
                  <span>CHAPTER I</span>
                </div>

                {/* Center Emblem & Quote */}
                <div className="my-auto text-center space-y-4 py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-primary/60 bg-brand-deep/80 backdrop-blur-md shadow-gold-subtle">
                    <span className="font-serif text-2xl font-light text-gold-primary">
                      F
                    </span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl font-light text-neutral-ivory italic max-w-xs mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    “The invisible language spoken before any word is uttered.”
                  </p>
                </div>

                {/* Bottom Meta */}
                <div className="text-center border-t border-gold-primary/30 pt-3 bg-brand-deep/60 backdrop-blur-xs -mx-2 px-2 py-1">
                  <span className="text-[10px] font-sans tracking-[0.25em] text-gold-champagne uppercase font-medium">
                    FRAGOLOGY MAISON
                  </span>
                </div>
              </div>
            </div>
          </MotionFadeIn>

          {/* Right Column: Editorial Copy in Warm Ivory Canvas with Dark Brown Typography */}
          <MotionFadeIn direction="left" delay={0.2} className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-gold-muted font-semibold block">
              THE ART OF FRAGRANCE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-brand-dark tracking-wide leading-[1.12]">
              MORE THAN A SCENT. <br className="hidden sm:inline" />
              <span className="text-gold-muted italic font-normal">AN EXPRESSION OF YOU.</span>
            </h2>

            <p className="text-base sm:text-lg text-brand-rich font-normal leading-relaxed">
              At Fragology, fragrance is an expression of individuality. Every composition begins with inspiration and comes together as an experience designed to be remembered.
            </p>

            <p className="text-xs sm:text-sm text-brand-chocolate font-normal leading-relaxed">
              We approach each creation through the lens of architectural design—balancing volatile top chords that awaken the air with deeply grounding resins that linger closely on the skin for hours.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToValues}
                className="relative inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-medium text-xs px-8 py-3.5 bg-brand-dark text-neutral-ivory hover:bg-brand-rich border border-border-subtle transition-colors shadow-md"
              >
                DISCOVER OUR STORY
              </button>
              <Link
                href="/about"
                className="relative inline-flex items-center justify-center font-sans uppercase tracking-widest text-xs px-6 py-3.5 text-brand-dark hover:text-gold-muted underline underline-offset-8 transition-colors font-medium"
              >
                Read Maison Philosophy
              </Link>
            </div>
          </MotionFadeIn>
        </div>
      </Container>
    </section>
  );
}

export default BrandStory;
