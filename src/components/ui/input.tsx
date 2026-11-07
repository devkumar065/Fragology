import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, helperText, id, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <input
          id={id}
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error && id
              ? `${id}-error`
              : helperText && id
              ? `${id}-helper`
              : undefined
          }
          className={cn(
            "w-full bg-brand-rich/90 border px-4 py-3 text-xs md:text-sm font-sans tracking-wide text-neutral-ivory placeholder:text-neutral-muted/50 rounded-xs transition-colors duration-200 outline-none",
            "border-border-subtle hover:border-gold-primary/40 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/30",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-rose-700/80 focus:border-rose-500 focus:ring-rose-500/20 text-rose-100",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={id ? `${id}-error` : undefined} className="text-[11px] text-rose-400 font-sans tracking-wide">
            {error}
          </p>
        ) : helperText ? (
          <p id={id ? `${id}-helper` : undefined} className="text-[11px] text-neutral-muted/70 font-sans tracking-wide">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
