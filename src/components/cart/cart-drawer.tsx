"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const {
    items,
    cartCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const complimentaryThreshold = 150;
  const remainingForFreeShipping = Math.max(0, complimentaryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / complimentaryThreshold) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-brand-deep/80 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container */}
      <aside className="relative z-10 w-full max-w-md bg-brand-rich border-l border-border-subtle shadow-2xl flex flex-col h-full text-neutral-ivory animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle/80 bg-brand-deep">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={18} className="text-gold-primary" />
            <h2 className="font-serif text-lg font-light tracking-wider uppercase text-neutral-ivory">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag drawer"
            className="p-1.5 text-neutral-muted hover:text-neutral-ivory transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Complimentary Maison Gifting Banner */}
        <div className="bg-brand-espresso/90 px-6 py-3 border-b border-border-subtle text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-neutral-muted">
                <span>Complimentary Insured Courier</span>
                <span className="text-gold-champagne font-medium">${remainingForFreeShipping.toFixed(2)} away</span>
              </div>
              <div className="w-full bg-brand-deep h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gold-primary h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gold-champagne">
              <Sparkles size={14} className="shrink-0" />
              <span>Complimentary White Glove Courier Unlocked</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-light text-neutral-ivory">
                Your Flacon Bag is Empty
              </h3>
              <p className="text-xs text-neutral-muted max-w-xs font-light leading-relaxed">
                Explore our haute parfumerie collection to curate your signature fragrance wardrobe.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-block px-6 py-2.5 bg-gold-primary text-brand-deep text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
                >
                  Explore Fragrances
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 p-4 bg-brand-espresso/50 border border-border-subtle/40 rounded-xs group hover:border-gold-primary/30 transition-colors"
              >
                {/* Flacon Visual Swatch */}
                <div
                  className="w-16 h-20 shrink-0 bg-brand-deep border border-border-subtle rounded-xs flex flex-col items-center justify-center p-2 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, rgba(23,17,12,0.9) 0%, rgba(8,7,6,0.95) 100%)`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-1"
                    style={{ backgroundColor: item.accentColor || "#C8A45D" }}
                  />
                  <span className="font-serif text-[10px] text-gold-champagne tracking-widest uppercase text-center line-clamp-1">
                    {item.productName.slice(0, 4)}
                  </span>
                  <span className="text-[8px] text-neutral-muted uppercase tracking-wider mt-1">
                    {item.variantSize}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.productSlug}`}
                        onClick={closeCart}
                        className="font-serif text-sm font-normal text-neutral-ivory hover:text-gold-champagne transition-colors truncate"
                      >
                        {item.productName}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-muted hover:text-red-400 p-0.5 ml-2 transition-colors"
                        aria-label={`Remove ${item.productName} from bag`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-muted font-light mt-0.5">
                      {item.volumeDisplay}
                    </p>
                    <p className="text-[10px] text-gold-muted uppercase tracking-wider mt-0.5">
                      {item.concentration}
                    </p>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-border-subtle/30">
                    <div className="flex items-center border border-border-subtle rounded-xs bg-brand-deep">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-neutral-muted hover:text-neutral-ivory transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-mono text-neutral-ivory">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-neutral-muted hover:text-neutral-ivory transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="font-serif text-sm text-gold-champagne">
                      ${(item.priceNum * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Checkout Area */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border-subtle bg-brand-deep space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-muted font-light">
                <span>Subtotal</span>
                <span className="text-neutral-ivory font-serif text-sm">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-muted font-light">
                <span>Shipping</span>
                <span className="text-gold-champagne">
                  {subtotal >= complimentaryThreshold ? "Complimentary" : "$25.00"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle/50 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-neutral-muted font-light">
                Estimated Bag Total
              </span>
              <span className="font-serif text-xl text-gold-champagne">
                ${(subtotal + (subtotal >= complimentaryThreshold ? 0 : 25)).toFixed(2)}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors duration-200"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full block text-center py-2.5 text-xs uppercase tracking-wider text-neutral-soft hover:text-gold-champagne transition-colors"
              >
                View Full Bag & Apply Privileges
              </Link>
            </div>

            {/* Assurance */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] text-neutral-muted font-light border-t border-border-subtle/30">
              <ShieldCheck size={12} className="text-gold-primary" />
              <span>Includes 2ml discovery vial for risk-free testing</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
