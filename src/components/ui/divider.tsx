import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "gold" | "accent";
  withEmblem?: boolean;
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  variant = "subtle",
  withEmblem = false,
  label,
  className,
  ...props
}: DividerProps) {
  const lineStyles = {
    subtle: "border-border-subtle",
    gold: "border-gold-primary/30",
    accent: "border-gold-primary/50",
  };

  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block h-full w-[1px] border-r", lineStyles[variant], className)}
        {...props}
      />
    );
  }

  if (withEmblem || label) {
    return (
      <div
        role="separator"
        className={cn("relative flex items-center justify-center my-6 w-full", className)}
        {...props}
      >
        <div className={cn("flex-grow border-t", lineStyles[variant])} />
        <span className="mx-4 flex items-center justify-center text-gold-primary text-xs uppercase tracking-[0.25em] font-sans">
          {withEmblem ? (
            <svg
              className="h-2.5 w-2.5 text-gold-primary transform rotate-45 fill-current opacity-80"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" />
            </svg>
          ) : (
            label
          )}
        </span>
        <div className={cn("flex-grow border-t", lineStyles[variant])} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={cn("w-full border-t my-4", lineStyles[variant], className)}
      {...props}
    />
  );
}
