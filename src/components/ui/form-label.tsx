import React from "react";
import { cn } from "@/lib/utils";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormLabel({
  className,
  children,
  required,
  ...props
}: FormLabelProps) {
  return (
    <label
      className={cn(
        "block text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-neutral-soft mb-2 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-gold-primary ml-1" title="Required field" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
