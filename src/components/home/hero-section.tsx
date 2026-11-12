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

      {/* Subtle cinematic chiaroscuro gradient for text readability on smaller viewports */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/85 via-brand-deep/35 to-transparent pointer-events-none lg:bg-none" />

      {/* Hero Editorial Content — Same-to-same match with reference visual */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 pt-20 sm:px-10 sm:pt-24 lg:px-[8vw] lg:pt-8">
          <div className="max-w-[92vw] sm:max-w-[56vw] lg:max-w-[44vw] xl:max-w-[39vw] flex flex-col items-center text-center">
            {/* Top Delicate Gold Accent Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 sm:w-16 h-[1.5px] bg-[#C6A467] mb-5 sm:mb-6 lg:mb-7 shadow-[0_0_12px_rgba(198,164,103,0.5)] origin-center"
            />

            {/* Line 1: The Art of (Refined High-Contrast Serif) */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.1rem,4.2vw,3.8rem)] font-light tracking-[0.03em] leading-normal text-[#F6EFEA] drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] mb-1 sm:mb-2"
            >
              The Art of
            </motion.h1>

            {/* Line 2: Fragrance (Flowing Champagne Gold Cursive Typography — Generous Box, Zero Clipping) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-visible px-6 sm:px-10 my-1 sm:my-2 filter drop-shadow-[0_4px_24px_rgba(198,164,103,0.35)] select-none"
            >
              <span
                className="font-script text-[clamp(3.4rem,7.2vw,6.2rem)] font-normal leading-[1.3] sm:leading-[1.35] tracking-[0.02em] block overflow-visible py-2 px-2"
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

            {/* Line 3: NATURE • ELEGANCE • INDIVIDUALITY (Spaced Uppercase) */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[10px] sm:text-xs lg:text-[13px] uppercase tracking-[0.32em] sm:tracking-[0.4em] text-[#D9CBC0] font-light mt-3 sm:mt-4 lg:mt-5 mb-8 sm:mb-9 lg:mb-10 text-center drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
            >
              NATURE <span className="text-[#C6A467] mx-1.5 sm:mx-2">•</span> ELEGANCE{" "}
              <span className="text-[#C6A467] mx-1.5 sm:mx-2">•</span> INDIVIDUALITY
            </motion.p>

            {/* Line 4: Minimalist Gold Outlined Box Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-5 sm:gap-6 border border-[#C6A467]/85 bg-transparent px-8 py-3.5 sm:px-9 sm:py-4 transition-all duration-300 hover:border-gold-champagne hover:bg-[#C6A467]/15 hover:shadow-[0_0_25px_rgba(198,164,103,0.25)] active:scale-95"
              >
                <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.38em] text-[#F6EFEA] transition-colors group-hover:text-gold-champagne">
                  EXPLORE
                </span>
                <ArrowRight
                  size={14}
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
