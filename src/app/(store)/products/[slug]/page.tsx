"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Heart,
  Plus,
  Minus,
  Check,
  ZoomIn,
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

// Fallback gallery labels when no real images
const GALLERY_LABELS = [
  { label: "Front Flacon", desc: "Architectural Glass Silhouette" },
  { label: "Lifestyle", desc: "With Female Model" },
  { label: "Detail Shot", desc: "Gold Cap & Label" },
  { label: "Presentation", desc: "With Gift Box" },
  { label: "Ingredients", desc: "Raw Accords & Notes" },
];

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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isWishlisted = isInWishlist(product.id);

  // Build gallery: use product.images if available, else fallback to placeholder labels
  const hasRealImages = product.images && product.images.length > 0;
  const galleryItems = hasRealImages
    ? product.images!.map((src, i) => ({
        src,
        label: GALLERY_LABELS[i]?.label ?? `View ${i + 1}`,
        desc: GALLERY_LABELS[i]?.desc ?? "",
      }))
    : GALLERY_LABELS.map((g) => ({ src: null, label: g.label, desc: g.desc }));

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
  const activeItem = galleryItems[activeGalleryIndex];

  return (
    <div className="py-10 sm:py-16 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Main Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 max-w-6xl mx-auto">
          {/* Section 2: Product Gallery — Compact & Refined Luxury Presentation */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3.5 max-w-lg mx-auto w-full">

            {/* Left: Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-y-auto sm:max-h-[520px] shrink-0">
              {galleryItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`shrink-0 w-14 h-16 sm:w-16 sm:h-[72px] border rounded-xs overflow-hidden transition-all duration-200 ${
                    activeGalleryIndex === idx
                      ? "border-gold-primary ring-1 ring-gold-primary/50 shadow-gold-subtle opacity-100"
                      : "border-border-subtle hover:border-gold-primary/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  {item.src ? (
                    <div className="relative w-full h-full bg-brand-rich">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-brand-espresso flex flex-col items-center justify-center p-1">
                      <span className="text-[8px] font-mono text-gold-champagne/80 text-center leading-tight">
                        {item.label}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Right: Main Image Stage (Clean, Contained & Proportionate) */}
            <div className="flex-1 order-1 sm:order-2 w-full">
              <div
                className="relative aspect-[4/5] max-h-[520px] w-full border border-gold-primary/30 bg-gradient-to-b from-brand-rich via-brand-espresso to-brand-deep overflow-hidden rounded-xs shadow-xl cursor-zoom-in select-none group mx-auto"
                onClick={() => activeItem.src && setLightboxOpen(true)}
              >
                {/* Radial luxury atmosphere */}
                <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none z-0" />

                {/* Corner Filigree */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-primary/50 z-10" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-primary/50 z-10" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold-primary/50 z-10" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-primary/50 z-10" />

                {/* View label badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-champagne bg-brand-deep/85 px-2.5 py-1 border border-border-subtle backdrop-blur-xs">
                    {activeItem.label}
                  </span>
                </div>

                {/* Zoom hint */}
                {activeItem.src && (
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-brand-deep/85 border border-border-subtle p-1.5 backdrop-blur-xs">
                      <ZoomIn size={13} className="text-gold-champagne" />
                    </div>
                  </div>
                )}

                {/* Main Image or Flacon Illustration */}
                {activeItem.src ? (
                  <div className="relative w-full h-full z-10">
                    <Image
                      src={activeItem.src}
                      alt={`${product.name} — ${activeItem.label}`}
                      fill
                      priority={activeGalleryIndex === 0}
                      className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-102"
                      sizes="(max-width: 1024px) 100vw, 420px"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  /* Fallback: Architectural Flacon Illustration */
                  <div className="relative z-10 flex flex-col items-center justify-center h-full transform transition-transform duration-700 hover:scale-105">
                    {/* Gold Stopper */}
                    <div className="h-10 w-14 bg-gradient-to-b from-gold-champagne via-gold-primary to-gold-soft border border-gold-champagne/60 shadow-gold-glow flex items-center justify-center">
                      <span className="font-serif text-[10px] tracking-widest text-brand-deep uppercase font-bold">F</span>
                    </div>
                    {/* Neck */}
                    <div className="h-3 w-6 bg-gold-primary/80" />
                    {/* Body */}
                    <div className="relative h-72 w-52 border-2 border-gold-primary/40 bg-gradient-to-b from-brand-deep/60 via-gold-primary/10 to-brand-espresso/90 backdrop-blur-md flex flex-col items-center justify-between p-6 shadow-2xl">
                      <div className="absolute inset-x-3 top-3 bottom-10 bg-gradient-to-b from-gold-primary/15 via-gold-champagne/20 to-transparent opacity-70" />
                      <div className="relative z-10 mt-10 border border-gold-primary/50 bg-brand-deep/95 py-3 px-4 text-center w-full shadow-lg">
                        <span className="block font-serif text-sm font-light text-neutral-ivory tracking-widest uppercase">{product.name}</span>
                        <span className="block text-[8px] font-sans tracking-[0.3em] text-gold-champagne uppercase mt-0.5">{product.concentration}</span>
                      </div>
                      <span className="relative z-10 text-[9px] font-mono tracking-widest text-neutral-muted uppercase">{selectedVariant.volumeDisplay}</span>
                    </div>
                  </div>
                )}

                {/* Accent bar */}
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 z-20"
                  style={{ backgroundColor: product.accentColor || "#C8A45D" }}
                />
              </div>

              {/* Mobile thumbnail strip — horizontal scroll */}
              <div className="flex gap-2 mt-3 overflow-x-auto sm:hidden pb-1">
                {galleryItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`shrink-0 w-12 h-14 border rounded-xs overflow-hidden transition-all ${
                      activeGalleryIndex === idx
                        ? "border-gold-primary ring-1 ring-gold-primary"
                        : "border-border-subtle opacity-60"
                    }`}
                  >
                    {item.src ? (
                      <div className="relative w-full h-full bg-brand-rich">
                        <Image src={item.src} alt={item.label} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-brand-espresso flex items-center justify-center">
                        <span className="text-[7px] font-mono text-gold-champagne/60 text-center px-0.5">{item.label}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Product Narrative & Configuration (Right Column) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
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

              {/* Price Display — INR */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-semibold text-neutral-ivory font-numbers">
                  {selectedVariant.price}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-wider text-gold-champagne/80">
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
                <span className="text-gold-champagne font-numbers text-[11px] font-medium">
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
                    <span className="block font-numbers font-medium text-sm text-neutral-ivory">{v.size}</span>
                    <span className="block font-numbers font-semibold text-xs text-neutral-muted mt-1">{v.price}</span>
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
                  <span className="w-12 text-center text-xs font-numbers font-medium text-neutral-ivory">
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
            <Check size={16} strokeWidth={1.5} className="text-gold-primary" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && activeItem.src && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-3xl w-full max-h-[90vh] aspect-[4/5]">
              <Image
                src={activeItem.src}
                alt={`${product.name} — ${activeItem.label}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl font-light"
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
