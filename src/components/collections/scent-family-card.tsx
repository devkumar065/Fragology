import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ScentFamily } from "@/data/scent-families";

export interface ScentFamilyCardProps {
  family: ScentFamily;
}

export function ScentFamilyCard({ family }: ScentFamilyCardProps) {
  return (
    <Link
      href="#featured"
      className="group relative flex flex-col justify-between border border-border-subtle bg-surface-card hover:border-gold-primary/70 transition-all duration-300 rounded-xs overflow-hidden p-8 sm:p-10 min-h-[380px] shadow-luxury-card"
    >
      {/* Background Ambient Aura Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${family.accentGradient} opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none`}
      />
      <div className="absolute inset-0 bg-dark-radial opacity-80 pointer-events-none" />

      {/* Decorative Corner Filigree Marks */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-primary/30 group-hover:border-gold-primary/60 transition-colors" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-primary/30 group-hover:border-gold-primary/60 transition-colors" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-primary/30 group-hover:border-gold-primary/60 transition-colors" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-primary/30 group-hover:border-gold-primary/60 transition-colors" />

      {/* Card Header Content */}
      <div className="relative z-10 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne block">
          {family.subtitle}
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide group-hover:text-gold-champagne transition-colors">
          {family.title}
        </h3>
      </div>

      {/* Center Decorative Fragrance Emblem */}
      <div className="relative z-10 my-6 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border border-gold-primary/30 bg-brand-deep/80 flex items-center justify-center group-hover:border-gold-primary group-hover:scale-105 transition-all duration-300 shadow-gold-subtle">
          <span className="font-serif text-2xl font-light text-gold-primary">
            {family.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Card Footer Content */}
      <div className="relative z-10 space-y-4">
        <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light">
          {family.description}
        </p>

        <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-sans text-gold-champagne">
          <span>Explore Accord</span>
          <ArrowRight
            size={14}
            className="transform group-hover:translate-x-1.5 transition-transform duration-300"
          />
        </div>
      </div>
    </Link>
  );
}

export default ScentFamilyCard;
