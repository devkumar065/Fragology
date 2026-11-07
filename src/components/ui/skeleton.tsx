import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rect" | "circle" | "text";
}

export function Skeleton({
  className,
  variant = "rect",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rect: "rounded-xs",
    circle: "rounded-full",
    text: "h-3.5 w-full rounded-xs",
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "relative overflow-hidden bg-brand-espresso/80 border border-border-subtle/30",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gold-primary/10 before:to-transparent",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
