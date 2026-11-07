import React from "react";

export type BadgeTone = "success" | "warning" | "danger" | "info" | "gold" | "neutral";

export interface StatusBadgeProps {
  status: string;
  tone?: BadgeTone;
  size?: "sm" | "md";
}

export function StatusBadge({ status, tone, size = "md" }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  // Automatic tone deduction if not provided
  let computedTone: BadgeTone = tone || "neutral";
  if (!tone) {
    if (
      normalized.includes("paid") ||
      normalized.includes("delivered") ||
      normalized.includes("approved") ||
      normalized.includes("active") ||
      normalized.includes("healthy") ||
      normalized.includes("sent")
    ) {
      computedTone = "success";
    } else if (
      normalized.includes("pending") ||
      normalized.includes("low") ||
      normalized.includes("draft") ||
      normalized.includes("scheduled")
    ) {
      computedTone = "warning";
    } else if (
      normalized.includes("cancelled") ||
      normalized.includes("refunded") ||
      normalized.includes("failed") ||
      normalized.includes("out") ||
      normalized.includes("rejected") ||
      normalized.includes("suspended")
    ) {
      computedTone = "danger";
    } else if (
      normalized.includes("shipped") ||
      normalized.includes("transit") ||
      normalized.includes("processing") ||
      normalized.includes("confirmed")
    ) {
      computedTone = "gold";
    }
  }

  const toneStyles: Record<BadgeTone, string> = {
    success: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    warning: "bg-amber-950/60 border-amber-500/40 text-amber-300",
    danger: "bg-red-950/60 border-red-500/40 text-red-300",
    gold: "bg-gold-primary/10 border-gold-primary/40 text-gold-champagne",
    info: "bg-sky-950/60 border-sky-500/40 text-sky-300",
    neutral: "bg-brand-espresso border-border-subtle text-neutral-muted",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]",
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-mono tracking-wider font-medium border rounded-xs ${toneStyles[computedTone]} ${sizeStyles[size]}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
