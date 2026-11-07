import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { FEATURED_FRAGRANCES } from "@/data/products";

export function FeaturedFragrances() {
  return (
    <section
      id="featured"
      aria-label="Featured Fragrance Collection"
      className="py-20 sm:py-28 bg-brand-deep border-b border-border-subtle"
    >
      <Container size="wide">
        <SectionHeading
          eyebrow="DISCOVER FRAGOLOGY"
          heading="SCENTS WORTH REMEMBERING"
          description="Explore fragrances that express character, depth, and individuality."
          className="mb-14 sm:mb-20 text-center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURED_FRAGRANCES.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-muted/70">
            Phase 2 Demonstration Catalog • Full Extrait Collection Available in Phase 3
          </p>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedFragrances;
