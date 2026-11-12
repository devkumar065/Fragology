"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Search, Heart, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/data/navigation";
import { IconButton } from "@/components/ui/icon-button";
import { Divider } from "@/components/ui/divider";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick?: (featureName: string) => void;
}

export function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && href.startsWith("#")) {
      e.preventDefault();
      onClose();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-brand-deep/98 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between p-6 border-b border-border-subtle">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-2xl tracking-[0.28em] font-light uppercase text-neutral-ivory"
            >
              FRAGOLOGY
            </Link>
            <IconButton
              icon={<X size={20} strokeWidth={1.25} />}
              label="Close menu"
              onClick={onClose}
              variant="ghost"
              size="sm"
            />
          </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col justify-between">
        <nav className="flex flex-col space-y-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href, item.isAnchor)}
              className="font-serif text-2xl font-light tracking-wider text-neutral-ivory hover:text-gold-champagne transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/order-tracking"
            onClick={onClose}
            className="font-serif text-xl font-light tracking-wider text-neutral-muted hover:text-gold-champagne transition-colors duration-200 pt-2"
          >
            Track Consignment
          </Link>
        </nav>

        {/* Action icons row */}
        <div className="space-y-6 pt-8 border-t border-border-subtle">
          <div className="grid grid-cols-4 gap-4 text-center">
            <Link
              href="/shop"
              onClick={onClose}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2 transition-colors duration-300"
              aria-label="Search Fragrances"
            >
              <div className="w-9 h-9 rounded-full bg-brand-espresso/80 border border-border-subtle flex items-center justify-center text-gold-champagne">
                <Search size={16} strokeWidth={1.25} />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-sans">Search</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2 relative transition-colors duration-300"
              aria-label="Saved Wishlist"
            >
              <div className="w-9 h-9 rounded-full bg-brand-espresso/80 border border-border-subtle flex items-center justify-center text-gold-champagne">
                <Heart size={16} strokeWidth={1.25} />
              </div>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-gradient-to-r from-gold-primary to-gold-champagne text-brand-deep rounded-full text-[9px] font-bold flex items-center justify-center shadow-gold-subtle font-numbers">
                  {wishlistCount}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider font-sans">Saved</span>
            </Link>

            <Link
              href={user ? "/my-account" : "/auth/login"}
              onClick={onClose}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2 transition-colors duration-300"
              aria-label="Account Concierge"
            >
              <div className="w-9 h-9 rounded-full bg-brand-espresso/80 border border-border-subtle flex items-center justify-center text-gold-champagne">
                <User size={16} strokeWidth={1.25} />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-sans">
                {user ? "Account" : "Sign In"}
              </span>
            </Link>

            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2 relative transition-colors duration-300"
              aria-label="Shopping Bag"
            >
              <div className="w-9 h-9 rounded-full bg-brand-espresso/80 border border-border-subtle flex items-center justify-center text-gold-champagne">
                <ShoppingBag size={16} strokeWidth={1.25} />
              </div>
              {cartCount > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-gradient-to-r from-gold-primary to-gold-champagne text-brand-deep rounded-full text-[9px] font-bold flex items-center justify-center shadow-gold-subtle font-numbers">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider font-sans">
                Bag ({cartCount})
              </span>
            </button>
          </div>

          <Divider variant="subtle" />

          <p className="text-[11px] font-sans font-light text-neutral-muted text-center tracking-wider">
            Maison de Haute Parfumerie &bull; Paris &amp; Grasse
          </p>
        </div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;
