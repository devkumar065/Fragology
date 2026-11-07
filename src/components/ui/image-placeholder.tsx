import React from "react";
import { cn } from "@/lib/utils";

export interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "square" | "portrait" | "landscape" | "banner" | "wide";
  label?: string;
  sublabel?: string;
  category?: string;
  showMonogram?: boolean;
}

export function ImagePlaceholder({
  aspectRatio = "portrait",
  label,
  sublabel,
  category,
  showMonogram = true,
  className,
  children,
  ...props
}: ImagePlaceholderProps) {
  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    banner: "aspect-[16/7]",
    wide: "aspect-[16/9]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full border border-border-subtle/50 rounded-xs bg-gradient-to-b from-brand-espresso via-brand-rich to-brand-deep flex flex-col items-center justify-center p-6 text-center select-none group",
        aspectStyles[aspectRatio],
        className
      )}
      {...props}
    >
      {/* Subtle Ambient CSS Lighting / Vignette */}
      <div className="absolute inset-0 bg-radial-luxury opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-gold-primary/5 pointer-events-none" />

      {/* Decorative Corner Accents */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-gold-primary/30" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gold-primary/30" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gold-primary/30" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-gold-primary/30" />

      {/* Monogram or Emblem */}
      {showMonogram && (
        <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-deep/80 text-gold-champagne shadow-gold-subtle group-hover:border-gold-primary transition-colors duration-300">
          <span className="font-serif text-lg font-light tracking-widest text-gold-primary">
            F
          </span>
        </div>
      )}

      {category && (
        <span className="relative z-10 text-[9px] font-mono uppercase tracking-[0.3em] text-gold-champagne/80 mb-1">
          {category}
        </span>
      )}

      {label && (
        <h4 className="relative z-10 font-serif text-lg sm:text-xl font-light text-neutral-ivory tracking-wide max-w-[85%]">
          {label}
        </h4>
      )}

      {sublabel && (
        <p className="relative z-10 text-[11px] font-sans text-neutral-muted/80 mt-1 max-w-[80%] font-light">
          {sublabel}
        </p>
      )}

      {children}
    </div>
  );
}
