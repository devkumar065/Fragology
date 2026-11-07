import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";

export function Footer() {
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

          {/* Column: Olfactive Anthology */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Anthology
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/shop" className="hover:text-gold-champagne transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-gold-champagne transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/scent-finder" className="hover:text-gold-champagne transition-colors">
                  Scent Finder Quiz
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gold-champagne transition-colors">
                  Discovery Atomizers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Maison Heritage */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Maison
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/about" className="hover:text-gold-champagne transition-colors">
                  The Philosophy
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-gold-champagne transition-colors">
                  Fragrance Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-champagne transition-colors">
                  Concierge Inquiries
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-champagne transition-colors">
                  Client FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Client Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans uppercase tracking-[0.25em] text-neutral-ivory font-medium">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/order-tracking" className="hover:text-gold-champagne transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gold-champagne transition-colors">
                  Climate Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns-refunds" className="hover:text-gold-champagne transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold-champagne transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-champagne transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider variant="gold" withEmblem className="my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-muted/70 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} FRAGOLOGY Maison de Parfumerie. All rights reserved.</p>
          <p className="font-light tracking-wider">
            Distilled with precision. Bottled in architectural glass.
          </p>
        </div>
      </Container>
    </footer>
  );
}
