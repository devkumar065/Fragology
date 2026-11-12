"use client";

import Image from "next/image";
import Link from "next/link";
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
          alt="Fragology Haute Parfumerie"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Invisible Clickable Hotspot over EXPLORE button to navigate to /shop */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="w-full px-6 pt-16 sm:px-10 sm:pt-20 lg:px-[8vw] lg:pt-6">
          <div className="max-w-[46vw] pt-[26vh] sm:pt-[28vh] lg:pt-[24vh]">
            <Link
              href="/shop"
              aria-label="Explore Fragrances"
              className="pointer-events-auto inline-block w-44 sm:w-52 h-12 sm:h-14 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
