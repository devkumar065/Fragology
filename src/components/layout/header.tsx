"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/scent-finder", label: "Scent Finder" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-brand-deep/95 backdrop-blur-md border-b border-border-subtle shadow-luxury-card py-3.5"
          : "bg-brand-deep/80 backdrop-blur-xs border-b border-border-subtle/50 py-5"
      }`}
    >
      <Container size="wide" className="flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Secondary Links */}
        <div className="flex items-center space-x-4 lg:w-1/3">
          <div className="lg:hidden">
            <IconButton
              icon={mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="sm"
            />
          </div>
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-sans font-light text-neutral-soft">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-gold-champagne transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Brand Wordmark */}
        <div className="flex justify-center text-center">
          <Link href="/" className="group inline-flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl md:text-3xl tracking-[0.28em] font-light uppercase text-neutral-ivory group-hover:text-gold-champagne transition-colors duration-300">
              FRAGOLOGY
            </span>
            <span className="text-[8px] font-sans uppercase tracking-[0.35em] text-gold-muted/80 -mt-1 hidden sm:block">
              Haute Parfumerie
            </span>
          </Link>
        </div>

        {/* Right: Nav End + Action Icons */}
        <div className="flex items-center justify-end space-x-2 sm:space-x-3 lg:w-1/3">
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-sans font-light text-neutral-soft mr-6">
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-gold-champagne transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/shop" aria-label="Search fragrances">
            <IconButton
              icon={<Search size={18} strokeWidth={1.5} />}
              label="Search fragrances"
              variant="ghost"
              size="sm"
            />
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:inline-flex">
            <IconButton
              icon={<Heart size={18} strokeWidth={1.5} />}
              label="Saved fragrances"
              variant="ghost"
              size="sm"
            />
          </Link>

          <Link href="/my-account" aria-label="Account">
            <IconButton
              icon={<User size={18} strokeWidth={1.5} />}
              label="Account concierge"
              variant="ghost"
              size="sm"
            />
          </Link>

          <Link href="/cart" aria-label="Shopping bag">
            <IconButton
              icon={<ShoppingBag size={18} strokeWidth={1.5} />}
              label="Shopping bag"
              badgeCount={0}
              variant="ghost"
              size="sm"
            />
          </Link>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-brand-deep/98 border-b border-border-subtle p-6 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200 z-50">
          <nav className="flex flex-col space-y-4 text-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-sans uppercase tracking-[0.25em] text-neutral-ivory hover:text-gold-champagne py-2 border-b border-border-subtle/30"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex justify-center space-x-6">
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-gold-champagne flex items-center gap-2"
              >
                <Heart size={14} /> Wishlist
              </Link>
              <Link
                href="/my-account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-gold-champagne flex items-center gap-2"
              >
                <User size={14} /> Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
