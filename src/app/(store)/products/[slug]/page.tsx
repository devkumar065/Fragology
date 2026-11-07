"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Package,
  Heart,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductVariant } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Variant state: defaults to 100ml or last variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[product.variants.length - 1] || {
      size: "100ml",
      volumeDisplay: "100ml Architectural Flacon",
      price: product.price,
      priceNum: product.priceNum,
    }
  );

  // Gallery thumbnail state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Phase 4 notice modal state
  const [phaseModalNotice, setPhaseModalNotice] = useState<string | null>(null);

  // Wishlist toggle
  const [isWishlisted, setIsWishlisted] = useState(false);

  const galleryAngles = [
    { label: "Front Flacon", desc: "Architectural Glass Silhouette" },
    { label: "Stopper Detail", desc: "Gold Monogram Crown" },
    { label: "Presentation Box", desc: "Cellophane Sealed with Exterior Test Vial" },
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handlePurchaseAction = (action: "bag" | "buy") => {
    setPhaseModalNotice(
      action === "bag"
        ? `Added ${quantity} x ${product.name} (${selectedVariant.size}) to pending bag. Full shopping bag operations will be enabled in Phase 4.`
        : `Instant checkout for ${product.name} will be enabled in Phase 4 with encrypted payment gateways.`
    );
  };

  const relatedProducts = getRelatedProducts(product.slug, 4);

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Section 1: Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-xs text-neutral-muted">
          <Link href="/" className="hover:text-gold-champagne transition-colors">
            Maison
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <Link href="/shop" className="hover:text-gold-champagne transition-colors">
            Fragrances
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <span className="text-neutral-ivory truncate">{product.name}</span>
        </nav>

        {/* Main Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Section 2: Product Gallery (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Stage Display */}
            <div className="relative aspect-[4/5] w-full rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-espresso via-brand-chocolate to-brand-deep p-10 flex flex-col items-center justify-center overflow-hidden shadow-2xl select-none">
              {/* Radial Lighting */}
              <div className="absolute inset-0 bg-radial-luxury opacity-70 pointer-events-none" />

              {/* Decorative Corner Filigree */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold-primary/50" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold-primary/50" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold-primary/50" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold-primary/50" />

              {/* Angle Tag Indicator */}
              <div className="absolute top-6 left-6 z-20">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gold-champagne/90 bg-brand-deep/80 px-2.5 py-1 border border-border-subtle rounded-xs">
                  {galleryAngles[activeGalleryIndex].label}
                </span>
              </div>

              {/* Central Luxury Perfume Flacon Model */}
              <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-300">
                {/* Heavy Gold Stopper */}
                <div className="h-10 w-16 bg-gradient-to-b from-gold-champagne via-gold-primary to-gold-soft border border-gold-champagne/60 rounded-xs shadow-gold-glow flex items-center justify-center">
                  <span className="font-serif text-xs text-brand-deep font-semibold">F</span>
                </div>
                {/* Flacon Neck */}
                <div className="h-3 w-8 bg-gradient-to-r from-gold-muted via-gold-primary to-gold-soft border-x border-gold-champagne/50" />
                {/* Flacon Shoulder */}
                <div className="w-52 h-4 bg-gradient-to-r from-brand-espresso via-gold-primary/20 to-brand-espresso border-t border-x border-gold-primary/40 rounded-t-xs" />
                {/* Architectural Heavy Glass Flacon Body */}
                <div className="relative w-52 h-72 rounded-b-xs border-b border-x border-gold-primary/40 bg-gradient-to-b from-brand-deep/80 via-gold-primary/10 to-brand-espresso/90 backdrop-blur-sm p-6 flex flex-col items-center justify-between shadow-2xl">
                  {/* Internal Liquid Core Sheen */}
                  <div className="absolute inset-x-3 top-2 bottom-6 rounded-xs bg-gradient-to-b from-gold-primary/20 via-gold-champagne/25 to-gold-soft/10 opacity-75" />

                  {/* Watermark Label */}
                  <span className="relative z-10 text-[8px] font-mono uppercase tracking-[0.3em] text-gold-champagne/80">
                    {product.concentration}
                  </span>

                  {/* Brand Flacon Label */}
                  <div className="relative z-10 my-auto w-full border border-gold-primary/50 bg-brand-deep/95 py-4 px-3 text-center shadow-lg">
                    <span className="block font-serif text-base tracking-[0.3em] uppercase text-neutral-ivory font-light">
                      {product.name}
                    </span>
                    <span className="block text-[8px] font-sans tracking-[0.25em] text-gold-primary uppercase mt-1">
                      {product.family}
                    </span>
                  </div>

                  {/* Flacon Volume Meta */}
                  <div className="relative z-10 flex items-center justify-between w-full text-[9px] font-mono text-neutral-muted/80 tracking-widest uppercase pt-2 border-t border-gold-primary/20">
                    <span>{selectedVariant.size}</span>
                    <span>FLACON</span>
                  </div>
                </div>

                {/* Soft Shadow Base */}
                <div className="w-40 h-3 bg-gold-primary/20 rounded-full blur-md mt-3" />
              </div>

              {/* Angle Description Subtitle */}
              <div className="absolute bottom-6 z-20 text-center">
                <p className="text-[10px] font-sans text-neutral-muted/70 tracking-wider">
                  {galleryAngles[activeGalleryIndex].desc}
                </p>
              </div>
            </div>

            {/* Thumbnail Gallery Navigation */}
            <div className="grid grid-cols-3 gap-4">
              {galleryAngles.map((angle, idx) => (
                <button
                  key={angle.label}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`p-3 text-left border rounded-xs transition-all ${
                    activeGalleryIndex === idx
                      ? "border-gold-primary bg-brand-espresso/80 text-neutral-ivory"
                      : "border-border-subtle bg-brand-rich/50 text-neutral-muted hover:border-gold-primary/50"
                  }`}
                >
                  <span className="block font-serif text-xs text-neutral-ivory">{angle.label}</span>
                  <span className="block text-[9px] font-sans text-neutral-muted truncate mt-0.5">
                    {angle.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3–6: Product Details, Variant Selection & Actions (Right Column) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
                  {product.family} • {product.concentration}
                </span>
                {product.badge && <Badge variant="bestseller">{product.badge}</Badge>}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-light text-neutral-ivory tracking-wide leading-tight">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs sm:text-sm text-neutral-muted font-light italic">
                  {product.subtitle}
                </p>
              )}

              {/* Price Display: dynamically updates with selected variant */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-light text-neutral-ivory font-sans">
                  {selectedVariant.price}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-muted/70">
                  Complimentary Insulated Delivery
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light border-y border-border-subtle/50 py-4">
              {product.description}
            </p>

            {/* Section 4: Product Variants (30ml, 50ml, 100ml) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans uppercase tracking-[0.2em] text-neutral-soft font-medium">
                  Select Flacon Format
                </span>
                <span className="text-gold-champagne font-mono text-[11px]">
                  {selectedVariant.volumeDisplay}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 text-center border rounded-xs transition-all ${
                      selectedVariant.size === v.size
                        ? "border-gold-primary bg-gold-primary/10 text-gold-champagne shadow-gold-subtle"
                        : "border-border-subtle bg-brand-rich/70 text-neutral-soft hover:border-gold-primary/50"
                    }`}
                  >
                    <span className="block font-serif text-sm text-neutral-ivory">{v.size}</span>
                    <span className="block font-sans text-xs text-neutral-muted mt-1">{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 5: Quantity Selection */}
            <div className="space-y-3">
              <span className="block font-sans uppercase tracking-[0.2em] text-xs text-neutral-soft font-medium">
                Quantity
              </span>
              <div className="flex items-center space-x-4">
                <div className="inline-flex items-center border border-border-subtle bg-brand-rich rounded-xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2.5 text-neutral-muted hover:text-neutral-ivory disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-medium text-neutral-ivory">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="p-2.5 text-neutral-muted hover:text-neutral-ivory disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-[11px] font-mono text-neutral-muted">
                  Max 10 flacons per allocation
                </span>
              </div>
            </div>

            {/* Section 6: Purchase Action Area (Phase 4 notice) */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={() => handlePurchaseAction("bag")}
                >
                  Add to Bag • {selectedVariant.price}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => handlePurchaseAction("buy")}
                >
                  Buy Now
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3.5 border rounded-xs flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? "border-gold-primary bg-gold-primary text-brand-deep"
                      : "border-border-subtle bg-brand-rich text-neutral-ivory hover:text-gold-champagne hover:border-gold-primary"
                  }`}
                  aria-label="Wishlist flacon"
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Skin-Test Guarantee Note */}
              <div className="p-3 bg-brand-espresso/60 border border-border-subtle/50 rounded-xs flex items-start space-x-2.5 text-[11px] text-neutral-muted leading-relaxed">
                <ShieldCheck size={14} className="text-gold-primary flex-shrink-0 mt-0.5" />
                <span>
                  Includes matching exterior 2ml test vial. Unopened cellophane may be returned within 30 days.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Fragrance Notes Pyramid */}
        <section className="mb-24 p-8 sm:p-12 border border-border-subtle bg-brand-rich/40 rounded-xs">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
              HARMONIC ACCORDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory">
              The Olfactory Pyramid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {/* Top Notes */}
            <div className="p-6 border border-border-subtle/50 bg-brand-deep/80 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne block">
                TOP NOTES (0–15 MIN)
              </span>
              <h3 className="font-serif text-xl text-neutral-ivory font-light">
                {product.notes.top}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                The immediate introduction—sparkling and radiant botanical volatility awakening the senses.
              </p>
            </div>

            {/* Heart Notes */}
            <div className="p-6 border border-gold-primary/40 bg-brand-espresso/70 rounded-xs space-y-3 shadow-gold-subtle">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-primary block">
                HEART NOTES (2–6 HOURS)
              </span>
              <h3 className="font-serif text-xl text-neutral-ivory font-light">
                {product.notes.heart}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                The emotional signature of the fragrance, providing rich floral, resinous, or spiced character.
              </p>
            </div>

            {/* Base Notes */}
            <div className="p-6 border border-border-subtle/50 bg-brand-deep/80 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne block">
                BASE NOTES (8–24+ HOURS)
              </span>
              <h3 className="font-serif text-xl text-neutral-ivory font-light">
                {product.notes.base}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                Deep architectural foundations anchored in rare woods and resins that linger close to skin.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 & 9: Product Story & Additional Product Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
          {/* Section 8: Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
              THE STORY BEHIND THE FLACON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory leading-tight">
              An Architectural Study in {product.family} Olfaction
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
              <p>{product.story.inspiration}</p>
              <p>{product.story.personality}</p>
              <div className="pt-2">
                <span className="text-xs font-medium text-neutral-soft uppercase tracking-wider block mb-1">
                  Recommended Occasions:
                </span>
                <p className="text-xs text-neutral-muted">{product.story.recommendedOccasions}</p>
              </div>
            </div>
          </div>

          {/* Section 9: Additional Specifications */}
          <div className="lg:col-span-5 p-6 sm:p-8 border border-border-subtle bg-brand-rich/60 rounded-xs space-y-4">
            <h3 className="font-serif text-xl text-neutral-ivory font-light border-b border-border-subtle pb-3">
              Flacon Specifications
            </h3>
            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-border-subtle/30">
                <dt className="text-neutral-muted uppercase tracking-wider">Fragrance Family</dt>
                <dd className="text-neutral-ivory font-medium">{product.family}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle/30">
                <dt className="text-neutral-muted uppercase tracking-wider">Concentration</dt>
                <dd className="text-neutral-ivory font-medium">{product.concentration}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle/30">
                <dt className="text-neutral-muted uppercase tracking-wider">Available Volumes</dt>
                <dd className="text-neutral-ivory font-medium">30ml, 50ml, 100ml</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle/30">
                <dt className="text-neutral-muted uppercase tracking-wider">Maceration Time</dt>
                <dd className="text-neutral-ivory font-medium">90 Days Micro-Batch</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle/30">
                <dt className="text-neutral-muted uppercase tracking-wider">Presentation Box</dt>
                <dd className="text-neutral-ivory font-medium">Rigid Architectural Box</dd>
              </div>
              <div className="py-2 text-[11px] text-neutral-muted/70 leading-relaxed font-light">
                <strong>Ingredients Placeholder:</strong> Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Coumarin. Full allergy disclosures will be stamped on final production cartons.
              </div>
            </dl>
          </div>
        </div>

        {/* Section 10: Related Fragrances */}
        <section className="border-t border-border-subtle pt-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
                COMPLEMENTARY COMPOSITIONS
              </span>
              <h2 className="font-serif text-3xl font-light text-neutral-ivory mt-1">
                You May Also Admire
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-gold-champagne hover:underline"
            >
              All Flacons
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>

        {/* Phase 4 Notice Modal */}
        {phaseModalNotice && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-md bg-brand-espresso border border-gold-primary/50 p-6 sm:p-8 rounded-xs shadow-gold-glow text-center space-y-4">
              <button
                onClick={() => setPhaseModalNotice(null)}
                className="absolute top-4 right-4 text-neutral-muted hover:text-neutral-ivory"
                aria-label="Dismiss notice"
              >
                <X size={18} />
              </button>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-champagne">
                <Package size={18} />
              </div>
              <h3 className="font-serif text-xl text-neutral-ivory font-light tracking-wide">
                Phase 4 Acquisition Notice
              </h3>
              <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light">
                {phaseModalNotice}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setPhaseModalNotice(null)}
                  className="px-6 py-2.5 bg-gold-primary text-brand-deep text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
