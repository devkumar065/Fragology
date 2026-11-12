"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { getCollectionBySlug, COLLECTIONS_DATA } from "@/data/collections";
import { PRODUCTS_CATALOG } from "@/data/products";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionDetailsPage({ params }: CollectionPageProps) {
  const { slug } = use(params);
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const [sortBy, setSortBy] = useState("featured");

  // Get associated products for this collection
  const associatedProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) =>
      collection.productIds.includes(p.id) || p.collections.includes(collection.id)
    ).sort((a, b) => {
      if (sortBy === "price-low") return a.priceNum - b.priceNum;
      if (sortBy === "price-high") return b.priceNum - a.priceNum;
      if (sortBy === "alpha") return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [collection, sortBy]);

  // Related collections (excluding current)
  const relatedCollections = COLLECTIONS_DATA.filter((c) => c.id !== collection.id).slice(0, 3);

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Section 2–4: Collection Hero, Description & Story */}
        <div className="relative p-10 sm:p-16 border border-gold-primary/30 bg-gradient-to-r from-brand-rich via-brand-espresso to-brand-deep rounded-xs overflow-hidden mb-16 shadow-luxury-card">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${collection.accentGradient} opacity-40 pointer-events-none`}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne block">
              {collection.subtitle}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
              {collection.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-muted font-light leading-relaxed">
              {collection.description}
            </p>
            <div className="pt-2 border-t border-border-subtle/50 text-xs text-neutral-muted/80 leading-relaxed font-light">
              <p>{collection.story}</p>
            </div>
          </div>
        </div>

        {/* Section 5 & 6: Product Grid Header & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border-subtle gap-4">
          <div>
            <h2 className="font-serif text-2xl text-neutral-ivory font-light">
              Collection Formulations
            </h2>
            <p className="text-xs text-neutral-muted font-sans uppercase tracking-wider mt-1">
              <span className="font-numbers font-medium">{associatedProducts.length}</span> Dedicated Flacons
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-neutral-muted">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-rich border border-border-subtle text-neutral-ivory text-xs px-3 py-2 rounded-xs outline-none focus:border-gold-primary"
            >
              <option value="featured">Featured Order</option>
              <option value="alpha">Alphabetical (A–Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {associatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section 7: Related Collections */}
        <section className="border-t border-border-subtle pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
                EXPLORE FURTHER
              </span>
              <h3 className="font-serif text-3xl font-light text-neutral-ivory mt-1">
                Other Maison Collections
              </h3>
            </div>
            <Link
              href="/collections"
              className="text-xs uppercase tracking-widest text-gold-champagne hover:underline"
            >
              View All Collections
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCollections.map((rel) => (
              <Link
                key={rel.id}
                href={`/collections/${rel.slug}`}
                className="p-6 border border-border-subtle bg-brand-rich/50 hover:border-gold-primary/60 rounded-xs transition-all group"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-champagne block">
                  {rel.subtitle}
                </span>
                <h4 className="font-serif text-xl text-neutral-ivory group-hover:text-gold-champagne transition-colors mt-1 mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-neutral-muted line-clamp-2 leading-relaxed font-light mb-4">
                  {rel.description}
                </p>
                <div className="flex items-center space-x-1 text-xs text-gold-champagne uppercase tracking-wider font-sans">
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
