import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center" | "right";
  headingLevel?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "center",
  headingLevel: Tag = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col space-y-3 max-w-3xl",
        alignmentStyles[align],
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-gold-champagne font-medium">
          {eyebrow}
        </span>
      )}
      <Tag className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-neutral-ivory leading-tight">
        {heading}
      </Tag>
      {description && (
        <p className="text-sm md:text-base text-neutral-muted font-light leading-relaxed max-w-2xl pt-1">
          {description}
        </p>
      )}
    </div>
  );
}
