"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Feather } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ARTICLES_DATA } from "@/data/articles";

const CATEGORIES: Array<{ label: string; value: string }> = [
  { label: "All Chronicles", value: "all" },
  { label: "Ingredients & Inspiration", value: "Ingredients & Inspiration" },
  { label: "Fragrance Education", value: "Fragrance Education" },
  { label: "Scent Guides", value: "Scent Guides" },
  { label: "Fragrance Notes", value: "Fragrance Notes" },
  { label: "Lifestyle", value: "Lifestyle" },
];

export default function JournalListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];

  const filteredArticles = ARTICLES_DATA.filter((a) => {
    if (selectedCategory === "all") return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Section 1: Journal Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            THE MAISON GAZETTE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            FRAGOLOGY JOURNAL
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
            Monographs on rare botanical extractions, harmonic olfactory chemistry, and the cultural philosophy of fragrance.
          </p>
        </div>

        {/* Section 2: Featured Article Card */}
        {featuredArticle && (
          <div className="mb-20 p-8 sm:p-14 border border-gold-primary/30 bg-gradient-to-r from-brand-rich via-brand-espresso to-brand-deep rounded-xs relative overflow-hidden shadow-luxury-card">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-luxury opacity-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne">
                  <span className="px-2 py-0.5 border border-gold-primary/40 rounded-xs bg-gold-primary/10">
                    FEATURED ESSAY
                  </span>
                  <span>{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <Link href={`/journal/${featuredArticle.slug}`}>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-ivory hover:text-gold-champagne transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-2xl">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/journal/${featuredArticle.slug}`}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans text-gold-primary hover:text-gold-champagne"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
                <div className="h-44 w-44 rounded-full border border-gold-primary/30 bg-brand-deep/80 flex items-center justify-center shadow-gold-subtle">
                  <BookOpen size={36} className="text-gold-primary" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3 & 4: Category Filter Navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 border-b border-border-subtle/60 gap-2 sm:gap-3 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? "bg-gold-primary text-brand-deep font-medium shadow-gold-subtle"
                  : "bg-brand-rich text-neutral-soft hover:text-gold-champagne border border-border-subtle/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section 5: Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredArticles.map((art) => (
            <Link
              key={art.id}
              href={`/journal/${art.slug}`}
              className="group flex flex-col justify-between border border-border-subtle bg-surface-card hover:border-gold-primary/60 transition-all duration-300 rounded-xs overflow-hidden p-8 shadow-luxury-card min-h-[360px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne/80">
                  <span>{art.category}</span>
                  <div className="flex items-center space-x-1 text-neutral-muted">
                    <Clock size={11} />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-light text-neutral-ivory group-hover:text-gold-champagne transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-muted font-light leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-border-subtle/40 flex items-center justify-between text-[11px] text-neutral-muted font-sans">
                <span className="font-mono text-[10px]">{art.publishedDate}</span>
                <span className="uppercase tracking-wider text-gold-primary group-hover:text-gold-champagne flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Section 6: Newsletter CTA */}
        <div className="p-10 sm:p-14 border border-border-subtle bg-brand-espresso/60 rounded-xs text-center max-w-2xl mx-auto space-y-4 shadow-luxury-card">
          <Feather size={20} strokeWidth={1.25} className="text-gold-primary mx-auto" />
          <h3 className="font-serif text-3xl font-light text-neutral-ivory">
            Receive Maison Monographs
          </h3>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-md mx-auto">
            Subscribe to receive private olfactive essays, formulation updates, and invitation-only previews of seasonal harvests.
          </p>
          <div className="pt-2">
            <Link href="/#newsletter">
              <Button variant="primary" size="sm">
                Join Dispatch Registry
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
