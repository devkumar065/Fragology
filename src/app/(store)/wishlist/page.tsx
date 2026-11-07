"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, Share2, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";

export default function WishlistPage() {
  const { items, wishlistCount, clearWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const [copied, setCopied] = useState(false);

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      addItem(p, undefined, 1);
    });
    openCart();
  };

  const handleShareWishlist = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-radial-dark">
        <Container size="tight" className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
            <Heart size={32} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium block">
            Private Olfactory Wardrobe
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-neutral-muted max-w-md mx-auto font-light leading-relaxed">
            Bookmark your favorite olfactory compositions to receive private notifications upon limited seasonal distillations.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
            >
              Discover Fragrances
            </Link>
            <Link
              href="/scent-finder"
              className="px-8 py-3.5 bg-brand-espresso border border-gold-primary/40 text-gold-champagne hover:border-gold-primary text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Take Scent Consultation
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-radial-dark min-h-[85vh]">
      <Container size="wide">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
              Curated Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
              Saved Fragrances ({wishlistCount})
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleShareWishlist}
              className="px-4 py-2 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-xs uppercase tracking-wider text-neutral-ivory flex items-center space-x-2 rounded-xs transition-colors"
            >
              {copied ? <Check size={14} className="text-gold-primary" /> : <Share2 size={14} />}
              <span>{copied ? "Link Copied" : "Share Wishlist"}</span>
            </button>

            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.15em] font-medium hover:bg-gold-champagne flex items-center space-x-2 rounded-xs transition-colors"
            >
              <ShoppingBag size={14} />
              <span>Add All to Bag</span>
            </button>

            <button
              onClick={clearWishlist}
              className="p-2 text-neutral-muted hover:text-red-400 transition-colors"
              aria-label="Clear wishlist"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
