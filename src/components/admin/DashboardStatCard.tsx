import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface DashboardStatCardProps {
  label: string;
  value: string | number;
  changePct?: number;
  subtext?: string;
  icon?: React.ReactNode;
}

export function DashboardStatCard({
  label,
  value,
  changePct,
  subtext,
  icon,
}: DashboardStatCardProps) {
  const isPositive = changePct !== undefined && changePct >= 0;

  return (
    <div className="bg-brand-rich border border-border-subtle p-6 rounded-xs relative overflow-hidden group hover:border-gold-primary/40 transition-colors shadow-luxury-card">
      {/* Top subtle gold ambient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent group-hover:via-gold-primary transition-all duration-300" />

      <div className="flex justify-between items-start">
        <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-neutral-muted block">
          {label}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-full bg-brand-deep/90 border border-gold-primary/25 flex items-center justify-center text-gold-champagne group-hover:text-gold-primary group-hover:border-gold-primary/50 group-hover:shadow-gold-subtle transition-all duration-300">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-numbers text-2xl sm:text-3xl text-neutral-ivory font-semibold tracking-tight">
          {value}
        </span>

        {changePct !== undefined && (
          <span
            className={`inline-flex items-center text-xs font-numbers font-semibold ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
            {isPositive ? `+${changePct}%` : `${changePct}%`}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-[11px] text-neutral-muted/80 font-light truncate">
          {subtext}
        </p>
      )}
    </div>
  );
}
