import React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  badgeCount?: number;
  variant?: "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      label,
      badgeCount,
      variant = "ghost",
      size = "md",
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
    };

    const variantStyles = {
      ghost:
        "text-neutral-ivory/85 hover:text-gold-champagne hover:bg-gold-primary/10 transition-all duration-200",
      outline:
        "border border-border-subtle text-neutral-ivory/85 hover:border-gold-primary/60 hover:text-gold-champagne hover:bg-brand-espresso/80 transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xs transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-champagne disabled:opacity-40 disabled:cursor-not-allowed",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center transition-transform duration-200">{icon}</span>
        {typeof badgeCount === "number" && badgeCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-primary px-1 text-[9px] font-bold text-brand-deep leading-none ring-2 ring-brand-deep font-numbers shadow-gold-subtle"
            aria-hidden="true"
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
