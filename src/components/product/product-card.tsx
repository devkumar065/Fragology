"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, Sparkles, X, ShoppingBag } from "lucide-react";
import { type Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist: toggleWish } = useWishlist();
  const { addItem, openCart } = useCart();

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isWishlisted = isInWishlist(product.id);
  const productUrl = `/products/${product.slug || product.id}`;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWish(product);
    setToastMessage(
      added
        ? `Added "${product.name}" to your private wishlist.`
        : `Removed "${product.name}" from your wishlist.`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[product.variants.length - 1];
    addItem(product, defaultVariant, 1);
    openCart();
    setToastMessage(`Added "${product.name}" to your shopping bag.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const getBadgeVariant = (badgeText?: string | null) => {
    if (!badgeText) return undefined;
    const lower = badgeText.toLowerCase();
    if (lower.includes("bestseller")) return "bestseller";
    if (lower.includes("new")) return "new";
    if (lower.includes("limited")) return "limited-edition";
    return "gold";
  };

  return (
    <>
      <div className="group relative flex flex-col border border-border-subtle bg-brand-rich/70 hover:border-gold-primary/60 transition-all duration-300 rounded-xs overflow-hidden shadow-luxury-card">
        {/* Card Visual / Bottle Presentation Canvas */}
        <Link
          href={productUrl}
          className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-brand-espresso via-brand-chocolate to-brand-deep flex items-center justify-center p-8 select-none block"
          aria-label={`View ${product.name} details`}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-radial-luxury opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-gold-primary/5 pointer-events-none" />

          {/* Luxury Stylized Flacon Silhouette Graphic */}
          <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {/* Flacon Stopper */}
            <div className="h-6 w-8 bg-gradient-to-b from-gold-champagne via-gold-primary to-gold-soft border border-gold-champagne/40 rounded-xs shadow-gold-subtle" />
            {/* Flacon Neck */}
            <div className="h-2 w-4 bg-gold-primary/60" />
            {/* Flacon Body */}
            <div className="relative h-44 w-32 rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-deep/60 via-gold-primary/5 to-brand-espresso/80 backdrop-blur-xs flex flex-col items-center justify-between p-4 shadow-luxury-card">
              {/* Bottle internal golden sheen */}
              <div className="absolute inset-x-2 top-2 bottom-6 bg-gradient-to-b from-gold-primary/10 via-gold-champagne/15 to-transparent rounded-xs opacity-60" />

              {/* Flacon Label */}
              <div className="relative z-10 mt-6 border border-gold-primary/40 bg-brand-deep/90 py-2.5 px-3 text-center w-full">
                <span className="block font-serif text-xs font-light text-neutral-ivory tracking-wider uppercase">
                  {product.name}
                </span>
                <span className="block text-[7px] font-sans tracking-[0.25em] text-gold-champagne uppercase mt-0.5">
                  Extrait
                </span>
              </div>

              {/* Volume indication */}
              <span className="relative z-10 text-[8px] font-mono tracking-widest text-neutral-muted/70 uppercase">
                {product.volume || "100 ML"}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20">
              <Badge variant={getBadgeVariant(product.badge)}>
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Quick Action Overlays */}
          <div className="absolute top-3 right-3 z-20 flex flex-col space-y-2">
            <button
              onClick={handleToggleWishlist}
              className={`h-8 w-8 rounded-full border border-border-subtle backdrop-blur-md flex items-center justify-center transition-all ${
                isWishlisted
                  ? "bg-gold-primary text-brand-deep border-gold-primary"
                  : "bg-brand-deep/80 text-neutral-muted hover:text-gold-champagne hover:border-gold-primary"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <button
              onClick={openQuickView}
              className="h-8 w-8 rounded-full border border-border-subtle bg-brand-deep/80 text-neutral-muted hover:text-gold-champagne hover:border-gold-primary backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              aria-label="Quick olfactory notes preview"
            >
              <Eye size={14} />
            </button>
          </div>

          {/* Hover Overlay "Quick Acquire" Action */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-deep via-brand-deep/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex justify-center">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 px-4 bg-gold-primary text-brand-deep text-[11px] font-sans uppercase tracking-[0.18em] font-medium hover:bg-gold-champagne transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={13} />
              <span>Acquire Flacon</span>
            </button>
          </div>
        </Link>

        {/* Card Details Body */}
        <div className="p-5 flex flex-col flex-1 justify-between bg-brand-rich">
          <div>
            {/* Olfactory Family Tag */}
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-gold-muted font-medium block">
              {product.family} &bull; {product.concentration}
            </span>

            {/* Product Name */}
            <Link href={productUrl} className="group-hover:text-gold-champagne transition-colors">
              <h3 className="font-serif text-lg font-light text-neutral-ivory tracking-wide mt-1">
                {product.name}
              </h3>
            </Link>

            {/* Olfactory Notes Capsule */}
            <p className="text-[11px] font-sans text-neutral-muted line-clamp-1 mt-1 font-light">
              {product.notes.top} &bull; {product.notes.heart}
            </p>
          </div>

          {/* Price & Action Bottom Strip */}
          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
            <span className="font-serif text-base text-gold-champagne font-light">
              {product.price}
            </span>

            <button
              onClick={openQuickView}
              className="text-[10px] font-sans uppercase tracking-[0.15em] text-neutral-muted hover:text-gold-champagne transition-colors underline-offset-4 hover:underline"
            >
              Quick Notes
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-brand-espresso border border-gold-primary/40 rounded-xs shadow-gold-glow p-6 sm:p-10 text-neutral-ivory overflow-hidden">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-5 right-5 text-neutral-muted hover:text-neutral-ivory"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Visual Preview */}
              <div className="h-64 bg-gradient-to-b from-brand-chocolate to-brand-deep rounded-xs border border-border-subtle flex flex-col items-center justify-center p-4 text-center">
                <div className="h-4 w-6 bg-gold-primary/80 rounded-xs mb-1" />
                <div className="h-32 w-24 border border-gold-primary/40 bg-brand-deep flex items-center justify-center p-2 text-center">
                  <span className="font-serif text-xs text-gold-champagne uppercase">
                    {product.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gold-muted mt-3 uppercase tracking-widest">
                  {product.volume}
                </span>
              </div>

              {/* Details & Notes Pyramid */}
              <div className="space-y-4">
                {product.badge && (
                  <Badge variant={getBadgeVariant(product.badge)}>{product.badge}</Badge>
                )}
                <div>
                  <h3 className="font-serif text-3xl font-light text-neutral-ivory">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold-champagne mt-0.5">
                    {product.family} &bull; {product.price}
                  </p>
                </div>

                <p className="text-xs text-neutral-muted leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Fragrance Pyramid */}
                <div className="border-t border-border-subtle pt-3 space-y-1.5 text-xs">
                  <p>
                    <strong className="text-gold-champagne font-normal uppercase text-[10px] tracking-widest">Top: </strong>
                    <span className="text-neutral-soft">{product.notes.top}</span>
                  </p>
                  <p>
                    <strong className="text-gold-champagne font-normal uppercase text-[10px] tracking-widest">Heart: </strong>
                    <span className="text-neutral-soft">{product.notes.heart}</span>
                  </p>
                  <p>
                    <strong className="text-gold-champagne font-normal uppercase text-[10px] tracking-widest">Base: </strong>
                    <span className="text-neutral-soft">{product.notes.base}</span>
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link href={productUrl} className="flex-1">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => setQuickViewOpen(false)}
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      setQuickViewOpen(false);
                      handleQuickAdd(e);
                    }}
                  >
                    Acquire Flacon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Demo Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-espresso border border-gold-primary text-neutral-ivory px-5 py-3 rounded-xs shadow-gold-glow flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2 text-xs">
          <Sparkles size={16} className="text-gold-primary" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

export default ProductCard;
