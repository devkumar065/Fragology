"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Heart,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductVariant } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

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

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isWishlisted = isInWishlist(product.id);

  const galleryAngles = [
    { label: "Front Flacon", desc: "Architectural Glass Silhouette" },
    { label: "Stopper Detail", desc: "Gold Monogram Crown" },
    { label: "Presentation Box", desc: "Cellophane Sealed with Exterior Test Vial" },
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToBag = () => {
    addItem(product, selectedVariant, quantity);
    openCart();
    setToastMessage(`Added ${quantity} x ${product.name} (${selectedVariant.size}) to your bag.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push("/checkout");
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    setToastMessage(
      added
        ? `Added "${product.name}" to your private wishlist.`
        : `Removed "${product.name}" from your wishlist.`
    );
    setTimeout(() => setToastMessage(null), 3000);
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

              {/* Stylized Architectural Flacon Art Component */}
              <div className="relative z-10 flex flex-col items-center justify-center transform transition-transform duration-700 hover:scale-105">
                {/* Heavy Gold Stopper */}
                <div className="h-10 w-14 bg-gradient-to-b from-gold-champagne via-gold-primary to-gold-soft border border-gold-champagne/60 rounded-xs shadow-gold-glow flex items-center justify-center">
                  <span className="font-serif text-[10px] tracking-widest text-brand-deep uppercase font-bold">
                    F
                  </span>
                </div>

                {/* Neck Collar */}
                <div className="h-3 w-6 bg-gold-primary/80" />

                {/* Glass Flacon Base */}
                <div className="relative h-72 w-52 rounded-xs border-2 border-gold-primary/40 bg-gradient-to-b from-brand-deep/60 via-gold-primary/10 to-brand-espresso/90 backdrop-blur-md flex flex-col items-center justify-between p-6 shadow-2xl">
                  {/* Flacon internal golden liquid shimmer */}
                  <div className="absolute inset-x-3 top-3 bottom-10 bg-gradient-to-b from-gold-primary/15 via-gold-champagne/20 to-transparent rounded-xs opacity-70" />

                  {/* Embossed Paper Label */}
                  <div className="relative z-10 mt-10 border border-gold-primary/50 bg-brand-deep/95 py-3 px-4 text-center w-full shadow-lg">
                    <span className="block font-serif text-sm font-light text-neutral-ivory tracking-widest uppercase">
                      {product.name}
                    </span>
                    <span className="block text-[8px] font-sans tracking-[0.3em] text-gold-champagne uppercase mt-0.5">
                      {product.concentration}
                    </span>
                  </div>

                  {/* Volume Stamp */}
                  <span className="relative z-10 text-[9px] font-mono tracking-widest text-neutral-muted uppercase">
                    {selectedVariant.volumeDisplay}
                  </span>
                </div>
              </div>

              {/* Accent Color Atmosphere Bar */}
              <div
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ backgroundColor: product.accentColor || "#C8A45D" }}
              />
            </div>

            {/* Thumbnail Angle Selectors */}
            <div className="grid grid-cols-3 gap-4">
              {galleryAngles.map((angle, idx) => (
                <button
                  key={angle.label}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`p-3 text-left border rounded-xs transition-all ${
                    activeGalleryIndex === idx
                      ? "border-gold-primary bg-brand-espresso text-neutral-ivory shadow-gold-subtle"
                      : "border-border-subtle bg-brand-rich/50 text-neutral-muted hover:border-gold-primary/40"
                  }`}
                >
                  <span className="block font-sans text-xs uppercase tracking-wider text-gold-champagne">
                    {angle.label}
                  </span>
                  <span className="block text-[11px] font-light text-neutral-muted truncate mt-0.5">
                    {angle.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Product Narrative & Configuration (Right Column) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Category / Badge / Title */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-muted font-medium">
                  {product.family} Collection
                </span>
                {product.badge && <Badge variant="bestseller">{product.badge}</Badge>}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-light text-neutral-ivory tracking-wide leading-tight">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs sm:text-sm text-neutral-muted font-light italic">
                  {product.subtitle}
                </p>
              )}

              {/* Price Display */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-light text-neutral-ivory font-sans">
                  {selectedVariant.price}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gold-champagne/80">
                  Complimentary Insured Delivery Included
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

            {/* Section 6: Purchase Action Area */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleAddToBag}
                >
                  Add to Bag &bull; {selectedVariant.price}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <button
                  onClick={handleToggleWishlist}
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
                  Includes matching exterior 2ml test vial. Unopened cellophane may be returned within 14 days for a full refund.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-brand-espresso/70 border border-border-subtle rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-primary">
                Top Notes (Opening 15 mins)
              </span>
              <h3 className="font-serif text-xl font-light text-neutral-ivory">
                {product.notes.top}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                The initial luminous aura that greets the senses upon atomization.
              </p>
            </div>

            <div className="p-6 bg-brand-espresso/70 border border-border-subtle rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-champagne">
                Heart Notes (Hours 1 - 4)
              </span>
              <h3 className="font-serif text-xl font-light text-neutral-ivory">
                {product.notes.heart}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                The enduring core personality that melds with skin chemistry throughout the day.
              </p>
            </div>

            <div className="p-6 bg-brand-espresso/70 border border-border-subtle rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-muted">
                Base Notes (Hours 4 - 14+)
              </span>
              <h3 className="font-serif text-xl font-light text-neutral-ivory">
                {product.notes.base}
              </h3>
              <p className="text-xs text-neutral-muted font-light leading-relaxed">
                The sensual sillage of rare woods, resins, and ambers that lingers into the evening.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Related Fragrance Recommendations */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-subtle pb-4 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-primary">
                HARMONIC COMPANIONS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory mt-1">
                You May Also Appreciate
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider text-gold-champagne hover:underline"
            >
              Explore Full Wardrobe &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>

        {/* Floating Toast Notice */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-brand-espresso border border-gold-primary text-neutral-ivory px-5 py-3 rounded-xs shadow-gold-glow flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2 text-xs">
            <Sparkles size={16} className="text-gold-primary" />
            <span>{toastMessage}</span>
          </div>
        )}
      </Container>
    </div>
  );
}
