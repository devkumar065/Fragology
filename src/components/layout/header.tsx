"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, Menu, Sparkles, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "./mobile-navigation";
import { AnnouncementBar } from "./announcement-bar";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featureModalMessage, setFeatureModalMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleActionClick = (featureName: string) => {
    setFeatureModalMessage(
      `${featureName} is reserved for future implementation phases (Phase 3 customer authentication & Phase 4 shopping bag).`
    );
  };

  const handleNavAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-brand-deep/95 backdrop-blur-md border-b border-border-subtle shadow-luxury-card py-3.5"
            : "bg-brand-deep/80 backdrop-blur-xs border-b border-border-subtle/50 py-5"
        }`}
      >
        <Container size="wide" className="flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Brand Wordmark */}
          <div className="flex items-center space-x-4 lg:w-1/4">
            <div className="lg:hidden">
              <IconButton
                icon={<Menu size={20} />}
                label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                variant="ghost"
                size="sm"
              />
            </div>
            <Link href="/" className="group inline-flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-light uppercase text-neutral-ivory group-hover:text-gold-champagne transition-colors duration-300">
                FRAGOLOGY
              </span>
              <span className="text-[8px] font-sans uppercase tracking-[0.35em] text-gold-muted/80 -mt-1 hidden sm:block">
                Haute Parfumerie
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center justify-center space-x-8 text-xs uppercase tracking-[0.22em] font-sans font-light text-neutral-soft lg:w-2/4"
          >
            {NAV_ITEMS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavAnchor(e, link.href, link.isAnchor)}
                className="relative py-1 text-neutral-soft hover:text-gold-champagne transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Action Icons */}
          <div className="flex items-center justify-end space-x-1 sm:space-x-3 lg:w-1/4">
            <IconButton
              icon={<Search size={18} strokeWidth={1.5} />}
              label="Search fragrances (Phase 3)"
              onClick={() => handleActionClick("Instant Search")}
              variant="ghost"
              size="sm"
            />

            <IconButton
              icon={<Heart size={18} strokeWidth={1.5} />}
              label="Saved fragrances (Phase 3)"
              onClick={() => handleActionClick("Wishlist")}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            />

            <IconButton
              icon={<User size={18} strokeWidth={1.5} />}
              label="Client Concierge (Phase 3)"
              onClick={() => handleActionClick("Account Concierge")}
              variant="ghost"
              size="sm"
            />

            <IconButton
              icon={<ShoppingBag size={18} strokeWidth={1.5} />}
              label="Shopping Bag (Phase 4)"
              onClick={() => handleActionClick("Shopping Bag")}
              badgeCount={0}
              variant="ghost"
              size="sm"
            />
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onActionClick={(action) => {
          setMobileMenuOpen(false);
          handleActionClick(action);
        }}
      />

      {/* Information Modal for Future Phase Affordances */}
      {featureModalMessage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-brand-espresso border border-gold-primary/50 p-6 sm:p-8 rounded-xs shadow-gold-glow text-center space-y-4">
            <button
              onClick={() => setFeatureModalMessage(null)}
              className="absolute top-4 right-4 text-neutral-muted hover:text-neutral-ivory"
              aria-label="Dismiss notification"
            >
              <X size={18} />
            </button>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-champagne">
              <Sparkles size={18} />
            </div>
            <h3 className="font-serif text-xl text-neutral-ivory font-light tracking-wide">
              Maison Notice
            </h3>
            <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light">
              {featureModalMessage}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setFeatureModalMessage(null)}
                className="px-6 py-2.5 bg-gold-primary text-brand-deep text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
