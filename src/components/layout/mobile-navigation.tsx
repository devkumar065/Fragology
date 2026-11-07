"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Search, Heart, User, ShoppingBag } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { IconButton } from "@/components/ui/icon-button";
import { Divider } from "@/components/ui/divider";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (featureName: string) => void;
}

export function MobileNavigation({
  isOpen,
  onClose,
  onActionClick,
}: MobileNavigationProps) {
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

  if (!isOpen) return null;

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
    <div
      className="fixed inset-0 z-50 lg:hidden flex flex-col bg-brand-deep/98 backdrop-blur-2xl transition-all duration-300"
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
          icon={<X size={20} />}
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
        </nav>

        {/* Action icons row */}
        <div className="space-y-6 pt-8 border-t border-border-subtle">
          <div className="grid grid-cols-4 gap-4 text-center">
            <button
              onClick={() => onActionClick("Search")}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2"
              aria-label="Search Fragrances"
            >
              <Search size={18} />
              <span className="text-[10px] uppercase tracking-wider font-sans">Search</span>
            </button>
            <button
              onClick={() => onActionClick("Wishlist")}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2"
              aria-label="Saved Wishlist"
            >
              <Heart size={18} />
              <span className="text-[10px] uppercase tracking-wider font-sans">Saved</span>
            </button>
            <button
              onClick={() => onActionClick("Account Concierge")}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2"
              aria-label="Account Concierge"
            >
              <User size={18} />
              <span className="text-[10px] uppercase tracking-wider font-sans">Account</span>
            </button>
            <button
              onClick={() => onActionClick("Shopping Bag")}
              className="flex flex-col items-center space-y-2 text-neutral-muted hover:text-gold-champagne p-2"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={18} />
              <span className="text-[10px] uppercase tracking-wider font-sans">Bag (0)</span>
            </button>
          </div>

          <Divider variant="subtle" />

          <p className="text-[11px] font-sans font-light text-neutral-muted text-center tracking-wider">
            Maison de Haute Parfumerie • Paris & Grasse
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
