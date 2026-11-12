"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface AnnouncementBarProps {
  overlay?: boolean;
  isScrolled?: boolean;
}

const LUXURY_ANNOUNCEMENTS = [
  {
    text: "COMPLIMENTARY SAMPLES WITH EVERY COMMISSION",
    link: "/shop",
    highlight: "SAMPLES",
  },
  {
    text: "COMPLIMENTARY INSURED WHITE-GLOVE COURIER OVER ₹1,999",
    link: "/shop",
    highlight: "WHITE-GLOVE COURIER",
  },
  {
    text: "HAUTE PARFUMERIE • HAND-POURED IN GRASSE & PARIS",
    link: "/about",
    highlight: "GRASSE & PARIS",
  },
];

export function AnnouncementBar({
  overlay = false,
  isScrolled = false,
}: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LUXURY_ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = LUXURY_ANNOUNCEMENTS[index];

  return (
    <aside
      aria-label="Announcement"
      className={`relative z-50 w-full transition-all duration-300 border-b border-gold-primary/15 overflow-hidden ${
        isScrolled
          ? "h-0 opacity-0 border-transparent py-0"
          : "h-7 sm:h-8 opacity-100"
      } ${
        overlay
          ? "bg-brand-deep/80 backdrop-blur-sm"
          : "bg-[#0b0806]/95 backdrop-blur-md"
      }`}
    >
      <div className="h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center space-x-2 text-center"
          >
            <span className="text-[7px] text-gold-primary" aria-hidden="true">
              ✦
            </span>
            <Link
              href={current.link}
              className="text-[9.5px] sm:text-[10px] font-sans font-medium uppercase tracking-[0.28em] text-neutral-ivory hover:text-gold-champagne transition-colors"
            >
              {current.text}
            </Link>
            <span className="text-[7px] text-gold-primary" aria-hidden="true">
              ✦
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}

export default AnnouncementBar;
