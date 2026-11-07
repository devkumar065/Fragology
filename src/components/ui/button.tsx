import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "minimal";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-champagne disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.99]";

    const variantStyles = {
      primary:
        "bg-gold-primary text-brand-deep hover:bg-gold-champagne shadow-gold-subtle hover:shadow-gold-glow border border-gold-primary/80",
      secondary:
        "border border-gold-primary/40 text-gold-champagne bg-brand-deep/50 hover:bg-gold-primary/10 hover:border-gold-primary backdrop-blur-sm",
      minimal:
        "text-neutral-ivory hover:text-gold-champagne bg-transparent underline-offset-8 hover:underline p-0 tracking-widest",
    };

    const sizeStyles = {
      sm: variant === "minimal" ? "text-[11px]" : "text-[11px] px-5 py-2.5",
      md: variant === "minimal" ? "text-xs" : "text-xs px-8 py-3.5",
      lg: variant === "minimal" ? "text-sm" : "text-xs px-10 py-4",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2.5 h-3.5 w-3.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
