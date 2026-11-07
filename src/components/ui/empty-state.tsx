import React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  heading: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionProps?: Partial<ButtonProps>;
}

export function EmptyState({
  icon,
  heading,
  description,
  actionLabel,
  onAction,
  actionProps,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 border border-border-subtle bg-brand-rich/40 rounded-xs max-w-xl mx-auto backdrop-blur-xs",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-primary/30 bg-gold-primary/5 text-gold-champagne shadow-gold-subtle">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-2xl md:text-3xl font-light text-neutral-ivory mb-2 tracking-wide">
        {heading}
      </h3>
      <p className="text-xs md:text-sm text-neutral-muted leading-relaxed max-w-md mb-6 font-light">
        {description}
      </p>
      {actionLabel && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          {...actionProps}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
