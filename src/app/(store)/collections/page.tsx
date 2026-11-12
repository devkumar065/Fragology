import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { COLLECTIONS_DATA } from "@/data/collections";

export default function CollectionsListingPage() {
  const featured = COLLECTIONS_DATA.find((c) => c.featured) || COLLECTIONS_DATA[0];
  const otherCollections = COLLECTIONS_DATA.filter((c) => c.id !== featured.id);

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-xs text-neutral-muted">
          <Link href="/" className="hover:text-gold-champagne transition-colors">
            Maison
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <span className="text-neutral-ivory">Collections</span>
        </nav>

        {/* Section 1 & 2: Collection Hero & Brand Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            CURATED ANTHOLOGY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            MAISON COLLECTIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
            Each Fragology collection is a thematic universe: distinct botanical chapters sculpted around sacred timbers, nocturnal petals, and opulent amber resins.
          </p>
        </div>

        {/* Section 3: Featured Collection Hero Banner */}
        <div className="mb-16 p-8 sm:p-14 border border-gold-primary/40 bg-gradient-to-r from-brand-rich via-brand-espresso to-brand-deep rounded-xs relative overflow-hidden shadow-luxury-card">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial-luxury opacity-60 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne block">
              PRIMARY COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-ivory tracking-wide leading-tight">
              {featured.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
              {featured.description}
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <Link
                href={`/collections/${featured.slug}`}
                className="px-6 py-3 bg-gold-primary text-brand-deep text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors inline-block"
              >
                Explore Collection ({featured.productCount} Flacons)
              </Link>
            </div>
          </div>
        </div>

        {/* Section 4: All Collections Grid */}
        <SectionHeading
          eyebrow="THEMATIC EDITIONS"
          heading="Olfactive Realms"
          description="Navigate through our dedicated olfactive families and specialized discovery sets."
          className="mb-12 text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {otherCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group flex flex-col justify-between border border-border-subtle bg-brand-rich/70 hover:border-gold-primary/70 transition-all duration-300 rounded-xs overflow-hidden p-8 sm:p-10 shadow-luxury-card min-h-[360px]"
            >
              {/* Background Ambient Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${col.accentGradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne block">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory tracking-wide group-hover:text-gold-champagne transition-colors">
                  {col.title}
                </h3>
              </div>

              {/* Center Monogram Graphic */}
              <div className="relative z-10 my-6 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border border-gold-primary/30 bg-brand-deep/80 flex items-center justify-center group-hover:border-gold-primary group-hover:scale-105 transition-all shadow-gold-subtle">
                  <span className="font-serif text-2xl font-light text-gold-primary">
                    {col.title.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <p className="text-xs text-neutral-muted leading-relaxed font-light line-clamp-2">
                  {col.description}
                </p>

                <div className="pt-2 border-t border-border-subtle/50 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-sans text-gold-champagne">
                  <span>{col.productCount} Formulations</span>
                  <ArrowRight
                    size={14}
                    className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section 5: Editorial Promotional Banner */}
        <div className="relative p-10 sm:p-14 border border-border-subtle bg-brand-espresso/50 rounded-xs text-center max-w-3xl mx-auto space-y-4 shadow-luxury-card">
          <Compass size={22} strokeWidth={1.25} className="text-gold-primary mx-auto" />
          <h3 className="font-serif text-3xl font-light text-neutral-ivory">
            Personal Scent Profiling
          </h3>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-lg mx-auto">
            Not sure which collection suits your aura? Take our five-step intuitive diagnostic to discover formulations curated to your personal style.
          </p>
          <div className="pt-2">
            <Link
              href="/scent-finder"
              className="px-6 py-2.5 border border-gold-primary/60 text-gold-champagne text-xs font-sans uppercase tracking-[0.2em] hover:bg-gold-primary hover:text-brand-deep transition-all inline-block"
            >
              Start Scent Finder Quiz
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
