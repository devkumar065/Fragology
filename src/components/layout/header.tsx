"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "./mobile-navigation";
import { AnnouncementBar } from "./announcement-bar";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useAuth } from "@/context/auth-context";
import { PRODUCTS_CATALOG } from "@/data/products";

const POPULAR_SEARCH_TERMS = [
  "Saffron",
  "Amber",
  "Florentine Leather",
  "Bergamot",
  "Extrait",
  "Jasmine",
];

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
  const [fragranceMenuOpen, setFragranceMenuOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);

  const fragranceTimeout = useRef<NodeJS.Timeout | null>(null);
  const collectionsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products for instant live search
  const liveSearchResults = searchQuery.trim()
    ? PRODUCTS_CATALOG.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.family.toLowerCase().includes(q) ||
          p.notes.top.toLowerCase().includes(q) ||
          p.notes.heart.toLowerCase().includes(q) ||
          p.notes.base.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const onFragranceEnter = () => {
    if (fragranceTimeout.current) clearTimeout(fragranceTimeout.current);
    setFragranceMenuOpen(true);
    setCollectionsMenuOpen(false);
  };
  const onFragranceLeave = () => {
    fragranceTimeout.current = setTimeout(() => setFragranceMenuOpen(false), 200);
  };

  const onCollectionsEnter = () => {
    if (collectionsTimeout.current) clearTimeout(collectionsTimeout.current);
    setCollectionsMenuOpen(true);
    setFragranceMenuOpen(false);
  };
  const onCollectionsLeave = () => {
    collectionsTimeout.current = setTimeout(() => setCollectionsMenuOpen(false), 200);
  };

  // Featured flacon for the flyout
  const featuredProduct = PRODUCTS_CATALOG[0]; // Golden Reverie

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 transition-all duration-300">
        <AnnouncementBar overlay={isHomePage && !isScrolled} isScrolled={isScrolled} />

        <header
          className={`w-full transition-all duration-400 select-none ${
            isScrolled
              ? "bg-[#0b0806]/95 backdrop-blur-md border-b border-gold-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.85)] py-3 sm:py-3.5"
              : isHomePage
              ? "bg-gradient-to-b from-[#070504]/90 via-[#070504]/40 to-transparent backdrop-blur-[2px] border-b border-gold-primary/10 py-4 sm:py-5"
              : "bg-[#0b0806]/95 backdrop-blur-md border-b border-border-subtle/70 py-4"
          }`}
        >
          <Container size="wide" className="flex items-center justify-between">
            {/* Left: Mobile Menu Trigger & Maison Wordmark */}
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              <div className="lg:hidden">
                <IconButton
                  icon={<Menu size={20} strokeWidth={1.25} />}
                  label="Open navigation menu"
                  onClick={() => setMobileMenuOpen(true)}
                  variant="ghost"
                  size="sm"
                />
              </div>

              <Link href="/" className="group inline-flex flex-col py-1">
                <span className="font-serif text-xl sm:text-2xl lg:text-[26px] tracking-[0.32em] font-light uppercase text-neutral-ivory group-hover:text-gold-champagne transition-colors duration-300">
                  FRAGOLOGY
                </span>
                <span className="text-[7.5px] font-sans uppercase tracking-[0.42em] text-gold-champagne/80 font-medium -mt-0.5 hidden sm:block transition-colors group-hover:text-gold-primary">
                  Haute Parfumerie
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation with Zero-Wrap and Luxury Hover Indicators */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-10 gap-6 xl:gap-8 2xl:gap-10"
            >
              <Link
                href="/"
                className="relative py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
              >
                Home
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                    pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>

              {/* Fragrances with Flyout Dropdown */}
              <div
                className="relative"
                onMouseEnter={onFragranceEnter}
                onMouseLeave={onFragranceLeave}
              >
                <Link
                  href="/shop"
                  className="relative inline-flex items-center gap-1 py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
                >
                  <span>Fragrances</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 opacity-60 group-hover:opacity-100 ${
                      fragranceMenuOpen ? "rotate-180 text-gold-champagne" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                      pathname.startsWith("/shop") || pathname.startsWith("/products")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

                {/* Fragrances Mega Flyout */}
                <AnimatePresence>
                  {fragranceMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] bg-[#0d0907]/98 border border-gold-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-6 rounded-xs z-50"
                    >
                      <div className="grid grid-cols-12 gap-6">
                        {/* Scent Families */}
                        <div className="col-span-4 border-r border-border-subtle/50 pr-4 space-y-3">
                          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-gold-primary font-semibold block">
                            Scent Families
                          </span>
                          <ul className="space-y-2 text-xs">
                            {[
                              { label: "Oriental & Amber", query: "Oriental" },
                              { label: "Woody & Leather", query: "Woody" },
                              { label: "Floral & Jasmine", query: "Floral" },
                              { label: "Fresh & Citrus", query: "Fresh" },
                              { label: "Unisex Signature", query: "Unisex" },
                            ].map((f) => (
                              <li key={f.label}>
                                <Link
                                  href={`/shop?category=${f.query}`}
                                  onClick={() => setFragranceMenuOpen(false)}
                                  className="text-neutral-ivory/80 hover:text-gold-champagne transition-colors block py-0.5"
                                >
                                  {f.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Curations */}
                        <div className="col-span-4 border-r border-border-subtle/50 pr-4 space-y-3">
                          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-gold-primary font-semibold block">
                            Anthology
                          </span>
                          <ul className="space-y-2 text-xs">
                            <li>
                              <Link
                                href="/shop"
                                onClick={() => setFragranceMenuOpen(false)}
                                className="text-neutral-ivory/80 hover:text-gold-champagne transition-colors block py-0.5 font-medium"
                              >
                                All Fragrances
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/shop"
                                onClick={() => setFragranceMenuOpen(false)}
                                className="text-neutral-ivory/80 hover:text-gold-champagne transition-colors block py-0.5"
                              >
                                Extrait de Parfum (30%)
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/collections/signature-collection"
                                onClick={() => setFragranceMenuOpen(false)}
                                className="text-neutral-ivory/80 hover:text-gold-champagne transition-colors block py-0.5"
                              >
                                Signature Reserve
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/scent-finder"
                                onClick={() => setFragranceMenuOpen(false)}
                                className="text-gold-champagne/90 hover:text-gold-primary transition-colors block py-0.5 font-medium inline-flex items-center gap-1.5"
                              >
                                <Sparkles size={11} className="text-gold-primary" />
                                <span>Scent Consultation</span>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Featured Flacon Card */}
                        {featuredProduct && (
                          <div className="col-span-4 flex flex-col justify-between bg-brand-deep/80 border border-border-subtle/60 p-3 rounded-xs">
                            <div>
                              <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-gold-muted block mb-1.5">
                                Featured Flacon
                              </span>
                              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-brand-espresso mb-2">
                                <Image
                                  src={featuredProduct.images?.[0] || "/images/products/golden-reverie-bottle.jpg"}
                                  alt={featuredProduct.name}
                                  fill
                                  className="object-cover"
                                  sizes="140px"
                                />
                              </div>
                              <span className="block font-serif text-sm font-light text-neutral-ivory line-clamp-1">
                                {featuredProduct.name}
                              </span>
                              <span className="block font-numbers text-xs text-gold-champagne font-medium mt-0.5">
                                {featuredProduct.price}
                              </span>
                            </div>
                            <Link
                              href={`/products/${featuredProduct.slug}`}
                              onClick={() => setFragranceMenuOpen(false)}
                              className="mt-2 text-[10px] font-sans uppercase tracking-widest text-gold-primary hover:text-gold-champagne inline-flex items-center gap-1 font-medium"
                            >
                              <span>View Flacon</span>
                              <ArrowRight size={10} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collections with Flyout */}
              <div
                className="relative"
                onMouseEnter={onCollectionsEnter}
                onMouseLeave={onCollectionsLeave}
              >
                <Link
                  href="/collections"
                  className="relative inline-flex items-center gap-1 py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
                >
                  <span>Collections</span>
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 opacity-60 group-hover:opacity-100 ${
                      collectionsMenuOpen ? "rotate-180 text-gold-champagne" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                      pathname.startsWith("/collections") ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

                {/* Collections Flyout */}
                <AnimatePresence>
                  {collectionsMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-[#0d0907]/98 border border-gold-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-5 rounded-xs z-50 space-y-3"
                    >
                      <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-gold-primary font-semibold block">
                        Curated Collections
                      </span>
                      <ul className="space-y-2.5 text-xs">
                        {[
                          { label: "The Signature Collection", href: "/collections/signature-collection" },
                          { label: "Oriental Sanctum", href: "/collections/oriental-collection" },
                          { label: "Florentine Leather & Woods", href: "/collections/woody-collection" },
                          { label: "Grasse Botanical Florals", href: "/collections/floral-collection" },
                          { label: "Travel & Discovery Sets", href: "/shop" },
                        ].map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={() => setCollectionsMenuOpen(false)}
                              className="text-neutral-ivory/80 hover:text-gold-champagne transition-colors block py-0.5"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/scent-finder"
                className="relative py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
              >
                Scent Finder
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                    pathname === "/scent-finder" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>

              <Link
                href="/about"
                className="relative py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
              >
                Our Story
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                    pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>

              <Link
                href="/journal"
                className="relative py-2 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-sans font-medium text-neutral-ivory/80 hover:text-gold-champagne transition-colors duration-200 whitespace-nowrap group"
              >
                Journal
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent transition-all duration-300 rounded-full ${
                    pathname.startsWith("/journal") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </nav>

            {/* Right: Actions (Search, Wishlist, Account, Bag) */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-2 shrink-0">
              <IconButton
                icon={<Search size={18} strokeWidth={1.25} />}
                label="Search fragrances"
                onClick={() => setSearchOpen(true)}
                variant="ghost"
                size="sm"
              />

              <Link href="/wishlist">
                <IconButton
                  icon={<Heart size={18} strokeWidth={1.25} />}
                  label="Saved fragrances"
                  badgeCount={wishlistCount > 0 ? wishlistCount : undefined}
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                />
              </Link>

              <Link href={user ? "/my-account" : "/auth/login"}>
                <IconButton
                  icon={<User size={18} strokeWidth={1.25} />}
                  label={user ? "Client Account Portal" : "Client Sign In"}
                  variant="ghost"
                  size="sm"
                />
              </Link>

              <IconButton
                icon={<ShoppingBag size={18} strokeWidth={1.25} />}
                label="Shopping Bag"
                onClick={openCart}
                badgeCount={cartCount > 0 ? cartCount : undefined}
                variant="ghost"
                size="sm"
              />
            </div>
          </Container>
        </header>
      </div>

      {/* Spacer for non-homepage views so content is never obscured by the fixed luxury header */}
      {!isHomePage && (
        <div className="h-[76px] sm:h-[84px]" aria-hidden="true" />
      )}

      {/* Luxury Instant Search Modal Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-[#070504]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-[#0d0a07] border border-gold-primary/40 p-6 sm:p-8 rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative z-10 space-y-6"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-5 right-5 text-neutral-muted hover:text-neutral-ivory p-1.5 transition-colors"
                aria-label="Close search overlay"
              >
                <X size={20} strokeWidth={1.25} />
              </button>

              <div className="border-b border-border-subtle/70 pb-4">
                <span className="text-[9.5px] uppercase tracking-[0.3em] text-gold-primary font-medium block mb-2">
                  Maison Anthology Search
                </span>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by note, accord, or flacon name..."
                    className="w-full bg-brand-deep/80 border border-gold-primary/30 px-4 py-3 pl-11 text-sm text-neutral-ivory placeholder-neutral-muted/40 focus:outline-hidden focus:border-gold-primary transition-colors rounded-xs font-light"
                  />
                  <Search size={18} strokeWidth={1.25} className="absolute left-3.5 top-3.5 text-gold-champagne/70" />
                </form>
              </div>

              {/* Live search results if typing */}
              {searchQuery.trim() && (
                <div className="space-y-3">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-muted block">
                    Matching Flacons ({liveSearchResults.length})
                  </span>
                  {liveSearchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {liveSearchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center space-x-3 p-2.5 bg-brand-deep/60 border border-border-subtle/50 hover:border-gold-primary/60 transition-colors rounded-xs group"
                        >
                          <div className="relative w-12 h-14 bg-brand-espresso shrink-0 rounded-xs overflow-hidden">
                            <Image
                              src={prod.images?.[0] || "/images/products/golden-reverie-bottle.jpg"}
                              alt={prod.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block font-serif text-xs text-neutral-ivory group-hover:text-gold-champagne transition-colors truncate">
                              {prod.name}
                            </span>
                            <span className="block text-[10px] text-neutral-muted uppercase tracking-wider">
                              {prod.family} &bull; {prod.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-muted italic py-2">
                      No flacons match &quot;{searchQuery}&quot;. Press Enter to explore the full catalog.
                    </p>
                  )}
                </div>
              )}

              {/* Popular Curations */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-muted block">
                  Popular Notes &amp; Accords:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="text-[11px] px-3 py-1 bg-brand-deep/70 border border-border-subtle/80 hover:border-gold-primary/60 text-neutral-ivory/80 hover:text-gold-champagne transition-colors rounded-xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-6 py-2.5 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
