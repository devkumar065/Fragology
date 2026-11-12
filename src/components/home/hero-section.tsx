"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { NatureTitle } from "./nature-title";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Fragology Hero"
      className="relative h-[max(100svh,56.35vw)] min-h-[100svh] overflow-hidden border-b border-border-subtle bg-brand-deep"
    >
      {/* Background Hero Image with Slow Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/fragology-hero.jpg"
          alt="Fragology Haute Parfumerie"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Subtle Cinematic Contrast Overlay for Typographic Elegance */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-brand-deep/35 to-transparent pointer-events-none" />

      {/* Hero Editorial Typography & CTA */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 pt-16 sm:px-10 sm:pt-20 lg:px-[8vw] lg:pt-6">
          <div className="max-w-[46vw]">
            {/* Nature, — elegant flowing italic display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[min(85vw,340px)] sm:w-[min(55vw,440px)] md:w-[min(44vw,500px)] lg:w-[min(38vw,560px)] xl:w-[min(36vw,610px)]"
            >
              <NatureTitle />
            </motion.div>

            {/* BOTTLED. — widely spaced, refined uppercase serif */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-1 sm:-mt-1.5 lg:-mt-2"
            >
              <h1 className="font-serif text-[clamp(2.6rem,6.2vw,5.6rem)] font-light uppercase leading-none tracking-[0.22em] text-[#F1E8DA] drop-shadow-[0_2px_20px_rgba(23,17,12,0.85)]">
                BOTTLED.
              </h1>
            </motion.div>

            {/* EXPLORE — minimal letter-spaced button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 lg:mt-11"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-between gap-7 sm:gap-8 border border-gold-primary/80 bg-transparent px-7 py-3 sm:px-8 sm:py-3.5 transition-all duration-300 hover:border-gold-champagne hover:bg-gold-primary hover:text-brand-deep active:scale-95"
              >
                <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.42em] text-gold-champagne transition-colors group-hover:text-brand-deep">
                  EXPLORE
                </span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.3}
                  className="text-gold-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-deep"
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
