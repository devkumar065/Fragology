"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { FOOTER_SECTIONS } from "@/data/navigation";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-brand-rich border-t border-border-subtle text-neutral-muted text-xs font-sans">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Monogram Column */}
          <div className="lg:col-span-2 space-y-4 max-w-sm">
            <span className="font-serif text-2xl tracking-[0.28em] font-light uppercase text-neutral-ivory">
              FRAGOLOGY
            </span>
            <p className="text-neutral-muted/80 text-xs font-light leading-relaxed">
              Maison de haute parfumerie. Pure extrait de parfum crafted from rare botanical absolutes, harmonious accords, and timeless distillation.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-primary">
                Paris • Grasse • Florence • Kyoto
              </span>
            </div>
          </div>

          {/* Column: Shop */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Shop Fragrances
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {FOOTER_SECTIONS.shop.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-gold-champagne transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Information */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Maison Heritage
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {FOOTER_SECTIONS.information.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-gold-champagne transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {FOOTER_SECTIONS.customerCare.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-gold-champagne transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider variant="gold" withEmblem className="my-12" />

        {/* Footer Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-muted/70 space-y-4 sm:space-y-0">
          <div>
            <p>© {new Date().getFullYear()} FRAGOLOGY Maison de Parfumerie. All rights reserved.</p>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 text-neutral-soft hover:text-gold-champagne transition-colors uppercase tracking-widest font-sans text-[10px]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
