"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, Clock, User, Share2, Sparkles, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, ARTICLES_DATA } from "@/data/articles";

interface BlogDetailsProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { slug } = use(params);
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="narrow">
        {/* Section 1: Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-xs text-neutral-muted">
          <Link href="/" className="hover:text-gold-champagne transition-colors">
            Maison
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <Link href="/journal" className="hover:text-gold-champagne transition-colors">
            Journal
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <span className="text-neutral-ivory truncate">{article.title}</span>
        </nav>

        {/* Section 2 & 3: Article Category, Title & Subtitle */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
            <span className="px-2 py-0.5 border border-gold-primary/30 rounded-xs bg-gold-primary/10">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-lg text-neutral-muted font-light leading-relaxed italic">
              {article.subtitle}
            </p>
          )}

          {/* Section 4: Publication Metadata */}
          <div className="flex flex-wrap items-center justify-between py-4 border-y border-border-subtle text-xs text-neutral-muted gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <User size={13} className="text-gold-primary" />
                <span>{article.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                <Clock size={13} className="text-gold-primary" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <span className="font-mono text-[11px]">{article.publishedDate}</span>
            </div>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard.");
                }
              }}
              className="inline-flex items-center space-x-1.5 text-neutral-soft hover:text-gold-champagne text-[11px] uppercase tracking-wider transition-colors"
            >
              <Share2 size={13} />
              <span>Share Monograph</span>
            </button>
          </div>
        </div>

        {/* Section 5: Atmospheric Editorial Image Block */}
        <div className="relative aspect-[16/8] w-full rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-espresso via-brand-chocolate to-brand-deep p-8 flex items-center justify-center overflow-hidden mb-12 shadow-luxury-card select-none">
          <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none" />
          <div className="relative z-10 text-center space-y-2">
            <BookOpen size={28} className="text-gold-primary mx-auto" strokeWidth={1.5} />
            <span className="font-serif text-base text-neutral-ivory font-light italic">
              Fragology Monograph Series
            </span>
          </div>
        </div>

        {/* Section 6: Article Body */}
        <div className="prose prose-invert max-w-none text-neutral-muted font-light text-sm sm:text-base leading-relaxed space-y-8">
          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl text-neutral-ivory font-serif font-light leading-relaxed border-l-2 border-gold-primary pl-6 py-1">
            {article.content.leadParagraph}
          </p>

          {/* Body Sections */}
          {article.content.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4 pt-2">
              {section.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory pt-4 border-b border-border-subtle/40 pb-2">
                  {section.heading}
                </h2>
              )}

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="text-neutral-soft leading-relaxed">
                  {para}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-6 p-6 border-y border-gold-primary/30 bg-brand-rich/40 text-center">
                  <p className="font-serif text-xl text-gold-champagne font-light italic">
                    &ldquo;{section.quote}&rdquo;
                  </p>
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Section 7: Related Articles */}
        <div className="mt-20 pt-16 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-light text-neutral-ivory">
              Related Chronicles
            </h3>
            <Link
              href="/journal"
              className="text-xs uppercase tracking-widest text-gold-champagne hover:underline"
            >
              All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="p-6 border border-border-subtle bg-brand-rich/50 hover:border-gold-primary/60 rounded-xs transition-all group"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-champagne block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-serif text-lg text-neutral-ivory group-hover:text-gold-champagne transition-colors leading-snug mb-2">
                  {rel.title}
                </h4>
                <div className="flex items-center space-x-1 text-xs text-gold-champagne uppercase tracking-wider font-sans">
                  <span>Read</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 8: Newsletter CTA */}
        <div className="mt-16 p-8 border border-border-subtle bg-brand-espresso/60 rounded-xs text-center space-y-4">
          <Sparkles size={18} className="text-gold-primary mx-auto" />
          <h4 className="font-serif text-2xl font-light text-neutral-ivory">
            Receive The Next Monograph
          </h4>
          <p className="text-xs text-neutral-muted max-w-sm mx-auto font-light leading-relaxed">
            Stay close to Fragology for private previews of seasonal extraits and research essays.
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
    </article>
  );
}
