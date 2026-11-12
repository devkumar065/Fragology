"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "./mobile-navigation";
import { AnnouncementBar } from "./announcement-bar";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor && href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className={isHomePage ? "absolute inset-x-0 top-0 z-40" : "relative"}>
      <AnnouncementBar overlay={isHomePage} />

      <header
        className={`${isHomePage ? "" : "sticky top-0 z-40"} w-full transition-all duration-300 ${
          isScrolled
            ? "bg-brand-deep/95 backdrop-blur-md border-b border-border-subtle shadow-luxury-card py-3.5"
            : `${isHomePage ? "bg-brand-deep/25" : "bg-brand-deep/80"} backdrop-blur-xs border-b border-border-subtle/50 py-5`
        }`}
      >
        <Container size="wide" className="flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Brand Wordmark */}
          <div className="flex items-center space-x-4 lg:w-1/4">
            <div className="lg:hidden">
              <IconButton
                icon={<Menu size={20} strokeWidth={1.25} />}
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
              label="Search fragrances"
              onClick={() => setSearchOpen(true)}
              variant="ghost"
              size="sm"
            />

            <Link href="/wishlist">
              <IconButton
                icon={<Heart size={18} strokeWidth={1.5} />}
                label="Saved fragrances"
                badgeCount={wishlistCount > 0 ? wishlistCount : undefined}
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              />
            </Link>

            <Link href={user ? "/my-account" : "/auth/login"}>
              <IconButton
                icon={<User size={18} strokeWidth={1.5} />}
                label={user ? "Client Account Portal" : "Client Sign In"}
                variant="ghost"
                size="sm"
              />
            </Link>

            <IconButton
              icon={<ShoppingBag size={18} strokeWidth={1.5} />}
              label="Shopping Bag"
              onClick={openCart}
              badgeCount={cartCount > 0 ? cartCount : undefined}
              variant="ghost"
              size="sm"
            />
          </div>
        </Container>
      </header>

      {/* Instant Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-brand-deep/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-brand-rich border border-gold-primary/50 p-6 sm:p-8 rounded-xs shadow-2xl relative z-10"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-5 right-5 text-neutral-muted hover:text-neutral-ivory p-1.5 transition-colors"
                aria-label="Close search overlay"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-primary font-medium block">
                  Atelier Catalog Search
                </span>
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by note, scent family, or flacon name (e.g. Amber, Rose, Oud)..."
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-11 text-sm text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                  <Search size={18} strokeWidth={1.5} className="absolute left-3.5 top-3.5 text-neutral-muted" />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-muted pt-2">
                  <span className="text-[11px]">Popular: Saffron, Sandalwood, Bergamot, Extrait</span>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gold-primary text-brand-deep text-xs uppercase tracking-wider font-medium hover:bg-gold-champagne transition-colors"
                  >
                    Explore
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  );
}

export default Header;
