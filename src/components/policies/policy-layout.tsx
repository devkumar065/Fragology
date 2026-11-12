"use client";

import React from "react";
import { ArrowUp, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { PolicyDocument } from "@/types/policy";

export interface PolicyLayoutProps {
  policy: PolicyDocument;
}

export function PolicyLayout({ policy }: PolicyLayoutProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-16 sm:py-24 bg-brand-deep min-h-screen">
      <Container size="default">
        {/* Page Hero */}
        <div className="max-w-3xl mb-12 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne block">
            MAISON GOVERNANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            {policy.title}
          </h1>
          <p className="text-xs font-mono text-gold-muted/80 tracking-widest uppercase">
            Effective Date: {policy.lastUpdated}
          </p>
          <p className="text-sm sm:text-base text-neutral-muted font-light leading-relaxed pt-2">
            {policy.introduction}
          </p>
        </div>

        {/* Template Disclaimer Callout */}
        <div className="mb-12 p-4 sm:p-5 border border-gold-primary/30 bg-brand-espresso/60 rounded-xs flex items-start space-x-3 text-xs text-neutral-muted">
          <ShieldAlert size={18} className="text-gold-primary flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-light">
            <strong className="text-neutral-ivory font-normal">Notice:</strong> This document represents a structural policy template for Fragology. Final legal entity registration, statutory jurisdiction, courier SLA commitments, and binding commercial parameters will be designated prior to commercial checkout enablement.
          </p>
        </div>

        <Divider variant="gold" className="mb-12" />

        {/* Layout Grid: Sticky Table of Contents + Policy Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Table of Contents Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 p-6 border border-border-subtle/60 bg-brand-rich/50 rounded-xs">
            <h3 className="font-serif text-lg text-neutral-ivory font-light mb-4">
              Table of Contents
            </h3>
            <ul className="space-y-2.5 text-xs font-light">
              {policy.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-left text-neutral-muted hover:text-gold-champagne transition-colors leading-relaxed block w-full truncate"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content Column */}
          <main className="lg:col-span-8 space-y-12">
            {policy.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-32">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory border-b border-border-subtle/50 pb-3">
                  {section.title}
                </h2>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* Back to top button */}
            <div className="pt-8 border-t border-border-subtle flex justify-end">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-champagne hover:underline"
              >
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}

export default PolicyLayout;
