"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Fragology Hero"
      className="relative h-[max(100svh,56.35vw)] min-h-[100svh] overflow-hidden border-b border-border-subtle bg-brand-deep select-none"
    >
      {/* Background Hero Image with Slow Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/new-hero.png"
          alt="Fragology Haute Parfumerie Flacon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-[66%_center] lg:object-center"
        />
      </motion.div>

      {/* Cinematic gradient overlay optimized for mobile contrast and desktop chiaroscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/50 to-brand-deep/70 sm:bg-gradient-to-r sm:from-brand-deep/90 sm:via-brand-deep/40 sm:to-transparent pointer-events-none" />

      {/* Hero Editorial Content — Compact, Refined Luxury Lockup */}
      <div className="absolute inset-0 flex items-center justify-center sm:justify-start">
        <div className="w-full px-5 pt-14 sm:px-10 sm:pt-20 lg:px-[8vw] lg:pt-0">
          <div className="max-w-[90vw] sm:max-w-[56vw] lg:max-w-[44vw] xl:max-w-[39vw] flex flex-col items-center text-center mx-auto sm:mx-0">
            {/* Top Delicate Gold Accent Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 sm:w-14 h-[1.5px] bg-[#C6A467] mb-2 sm:mb-3 shadow-[0_0_10px_rgba(198,164,103,0.5)] origin-center"
            />

            {/* Line 1: The Art of (Refined High-Contrast Serif) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.6rem,3.8vw,3.4rem)] font-light tracking-[0.06em] uppercase leading-none text-[#F6EFEA] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
            >
              The Art of
            </motion.h1>

            {/* Line 2: Fragrance (Flowing Champagne Gold Cursive Typography — Tightened Vertical Lockup) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-1 sm:-mt-2 mb-1 sm:mb-1.5 filter drop-shadow-[0_4px_20px_rgba(198,164,103,0.35)] select-none overflow-visible"
            >
              <span
                className="font-script text-[clamp(3.1rem,6.8vw,5.6rem)] font-normal leading-[1.05] sm:leading-[1.1] tracking-[0.01em] block overflow-visible py-0.5 px-2"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FAF1DF 0%, #E8CD96 35%, #CFA558 75%, #A98036 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fragrance
              </span>
            </motion.div>

            {/* Line 3: NATURE • ELEGANCE • INDIVIDUALITY (Subtle, Compact Spaced Subtitle) */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[9px] sm:text-[11px] lg:text-xs uppercase tracking-[0.28em] sm:tracking-[0.38em] text-[#D9CBC0]/90 font-light mt-1 sm:mt-1.5 mb-5 sm:mb-7 text-center drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
            >
              NATURE <span className="text-[#C6A467] mx-1 sm:mx-1.5">•</span> ELEGANCE{" "}
              <span className="text-[#C6A467] mx-1 sm:mx-1.5">•</span> INDIVIDUALITY
            </motion.p>

            {/* Line 4: Minimalist Gold Outlined Box Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-4 sm:gap-6 border border-[#C6A467]/85 bg-[#C6A467]/10 px-7 py-2.5 sm:px-8 sm:py-3.5 transition-all duration-300 hover:border-gold-champagne hover:bg-[#C6A467]/25 hover:shadow-[0_0_20px_rgba(198,164,103,0.3)] active:scale-95"
              >
                <span className="font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.34em] sm:tracking-[0.38em] text-[#F6EFEA] transition-colors group-hover:text-gold-champagne">
                  EXPLORE
                </span>
                <ArrowRight
                  size={13}
                  strokeWidth={1.4}
                  className="text-[#C6A467] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold-champagne"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
