import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "new" | "bestseller" | "limited-edition" | "outline" | "gold";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "outline",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    new: "bg-brand-espresso border-gold-primary/60 text-gold-champagne",
    bestseller: "bg-gold-primary text-brand-deep font-semibold border-gold-champagne",
    "limited-edition": "bg-brand-chocolate border-gold-soft text-gold-champagne",
    outline: "border-border-subtle bg-brand-deep/80 text-neutral-soft",
    gold: "border-gold-primary/40 bg-gold-primary/10 text-gold-champagne",
  };

  const sizeStyles = {
    sm: "text-[9px] px-2 py-0.5 tracking-[0.2em]",
    md: "text-[10px] px-3 py-1 tracking-[0.25em]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase font-sans border rounded-xs font-medium select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
