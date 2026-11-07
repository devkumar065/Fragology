"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Tag,
  Check,
  Package,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/cart-context";
import { MAISON_COUPONS } from "@/data/coupons";

export default function CartPage() {
  const {
    items,
    cartCount,
    subtotal,
    discount,
    coupon,
    couponCode,
    couponMessage,
    shipping,
    estimatedTax,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!inputCode.trim()) return;

    setApplying(true);
    const res = await applyCoupon(inputCode);
    setApplying(false);

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setInputCode("");
    }
  };

  const complimentaryThreshold = 150;
  const remainingForFreeShipping = Math.max(0, complimentaryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / complimentaryThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-radial-dark">
        <Container size="tight" className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
            <ShoppingBag size={32} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium block">
            Maison Shopping Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide">
            Your Flacon Selection is Empty
          </h1>
          <p className="text-sm text-neutral-muted max-w-md mx-auto font-light leading-relaxed">
            Discover our curated extrait de parfums and eau de parfums hand-poured in Grasse, or explore the olfactory Scent Finder.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
            >
              Explore All Fragrances
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
        {/* Page Title */}
        <div className="mb-8 sm:mb-12 border-b border-border-subtle pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
              Curated Wardrobe
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
              Shopping Bag ({cartCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-neutral-muted hover:text-red-400 transition-colors self-start sm:self-auto"
          >
            Clear All Items
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        <div className="mb-8 p-4 bg-brand-espresso border border-border-subtle rounded-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-neutral-soft font-light">
                <span>Complimentary White-Glove Insured Courier</span>
                <span className="text-gold-champagne font-medium">
                  Add ${remainingForFreeShipping.toFixed(2)} more to unlock
                </span>
              </div>
              <div className="w-full bg-brand-deep h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gold-primary h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-gold-champagne">
              <Sparkles size={16} />
              <span>Complimentary Insured Courier &amp; Atelier Presentation Box Unlocked</span>
            </div>
          )}
        </div>

        {/* Main Grid: Left Items List, Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-border-subtle/50 border border-border-subtle bg-brand-rich/60 rounded-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-brand-espresso/40 transition-colors"
                >
                  {/* Flacon Visual + Info */}
                  <div className="flex items-start space-x-4 min-w-0">
                    <div
                      className="w-20 h-24 shrink-0 bg-brand-deep border border-border-subtle rounded-xs flex flex-col items-center justify-center p-2 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(180deg, rgba(23,17,12,0.9) 0%, rgba(8,7,6,0.95) 100%)`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full mb-1"
                        style={{ backgroundColor: item.accentColor || "#C8A45D" }}
                      />
                      <span className="font-serif text-[11px] text-gold-champagne tracking-widest uppercase text-center line-clamp-1">
                        {item.productName.slice(0, 5)}
                      </span>
                      <span className="text-[9px] text-neutral-muted uppercase tracking-wider mt-1">
                        {item.variantSize}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-serif text-lg font-light text-neutral-ivory hover:text-gold-champagne transition-colors"
                      >
                        {item.productName}
                      </Link>
                      {item.productSubtitle && (
                        <p className="text-xs text-neutral-muted font-light">
                          {item.productSubtitle}
                        </p>
                      )}
                      <p className="text-[11px] text-gold-champagne/80 uppercase tracking-wider font-light">
                        {item.volumeDisplay} &bull; {item.concentration}
                      </p>
                      <p className="text-xs text-neutral-muted font-mono pt-1">
                        ${item.priceNum.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Price */}
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-border-subtle/30">
                    {/* Stepper */}
                    <div className="flex items-center border border-border-subtle rounded-xs bg-brand-deep">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-neutral-muted hover:text-neutral-ivory transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-xs font-mono text-neutral-ivory font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-neutral-muted hover:text-neutral-ivory transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="font-serif text-lg text-gold-champagne font-light w-20 text-right">
                      ${(item.priceNum * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-neutral-muted hover:text-red-400 transition-colors"
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Privilege Code Box */}
            <div className="p-6 bg-brand-rich border border-border-subtle rounded-xs space-y-4">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-neutral-soft font-light">
                <Tag size={15} className="text-gold-primary" />
                <span>Maison Privilege / Courtesy Code</span>
              </div>

              {coupon ? (
                <div className="flex items-center justify-between p-3 bg-brand-espresso border border-gold-primary/40 rounded-xs">
                  <div className="flex items-center space-x-2 text-xs text-gold-champagne">
                    <Check size={16} />
                    <div>
                      <span className="font-mono font-bold tracking-wider">{coupon.code}</span>
                      <span className="text-neutral-muted ml-2">&bull; {coupon.description}</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs uppercase tracking-wider text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FRAGOLOGY10 or MAISON20"
                    className="flex-1 bg-brand-espresso border border-border-subtle px-4 py-2.5 text-xs text-neutral-ivory font-mono uppercase placeholder-neutral-muted/40 focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={applying}
                    className="px-6 py-2.5 bg-brand-deep border border-gold-primary/50 text-gold-champagne hover:bg-gold-primary hover:text-brand-deep text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {applying ? "Verifying..." : "Apply"}
                  </button>
                </form>
              )}

              {errorMsg && (
                <p className="text-xs text-red-400 font-light">{errorMsg}</p>
              )}
              {couponMessage && !errorMsg && (
                <p className="text-xs text-gold-champagne/90 font-light">{couponMessage}</p>
              )}

              {/* Sample test coupons strip for testing convenience */}
              <div className="pt-2 text-[11px] text-neutral-muted flex flex-wrap items-center gap-2">
                <span>Available Maison Codes:</span>
                {MAISON_COUPONS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setInputCode(c.code);
                      applyCoupon(c.code);
                    }}
                    className="px-2 py-0.5 bg-brand-deep border border-border-subtle/80 hover:border-gold-primary text-gold-champagne font-mono text-[10px] rounded-xs transition-colors"
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Luxury Assurance Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-brand-espresso/60 border border-border-subtle/40 rounded-xs flex items-center space-x-3 text-xs text-neutral-muted">
                <ShieldCheck size={20} className="text-gold-primary shrink-0" />
                <span>Cellophane sealed with exterior 2ml test vial</span>
              </div>
              <div className="p-4 bg-brand-espresso/60 border border-border-subtle/40 rounded-xs flex items-center space-x-3 text-xs text-neutral-muted">
                <Package size={20} className="text-gold-primary shrink-0" />
                <span>Complimentary gift box &amp; monogram card</span>
              </div>
              <div className="p-4 bg-brand-espresso/60 border border-border-subtle/40 rounded-xs flex items-center space-x-3 text-xs text-neutral-muted">
                <Sparkles size={20} className="text-gold-primary shrink-0" />
                <span>14-day returns on unopened presentation flacon</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-6 sticky top-28 shadow-2xl">
              <h2 className="font-serif text-xl font-light text-neutral-ivory tracking-wider uppercase border-b border-border-subtle/60 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-neutral-muted font-light">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif text-sm text-neutral-ivory">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-gold-champagne">
                    <span>Privilege Courtesy ({couponCode})</span>
                    <span className="font-serif text-sm">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>White-Glove Insured Courier</span>
                  <span className={shipping === 0 ? "text-gold-champagne" : "text-neutral-ivory"}>
                    {shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Excise &amp; Duties (8%)</span>
                  <span className="font-serif text-sm text-neutral-ivory">
                    ${estimatedTax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle/60 flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-neutral-soft font-light">
                  Total Investment
                </span>
                <span className="font-serif text-2xl text-gold-champagne font-light">
                  ${total.toFixed(2)} USD
                </span>
              </div>

              <div className="pt-2 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors duration-200"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/shop"
                  className="w-full block text-center py-2 text-xs uppercase tracking-wider text-neutral-muted hover:text-gold-champagne transition-colors"
                >
                  Continue Browsing Fragrances
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
