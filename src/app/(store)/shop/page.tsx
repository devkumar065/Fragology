"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, RotateCcw, ChevronRight, Crown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { PRODUCTS_CATALOG } from "@/data/products";

const CATEGORIES: Array<{ label: string; value: string }> = [
  { label: "All Fragrances", value: "all" },
  { label: "Floral", value: "Floral" },
  { label: "Woody", value: "Woody" },
  { label: "Oriental", value: "Oriental" },
  { label: "Fresh", value: "Fresh" },
  { label: "Unisex", value: "Unisex" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConcentration, setSelectedConcentration] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceMax, setPriceMax] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Client-side filtering & sorting logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.family !== selectedCategory) {
        return false;
      }

      // Concentration filter
      if (
        selectedConcentration !== "all" &&
        !product.concentration.includes(selectedConcentration)
      ) {
        return false;
      }

      // Price filter
      if (product.priceNum > priceMax) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Search query across name, family, notes
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFamily = product.family.toLowerCase().includes(query);
        const matchesNotes = `${product.notes.top} ${product.notes.heart} ${product.notes.base}`
          .toLowerCase()
          .includes(query);
        const matchesTags = product.accordTags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesName && !matchesFamily && !matchesNotes && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "alpha-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price-low") {
        return a.priceNum - b.priceNum;
      }
      if (sortBy === "price-high") {
        return b.priceNum - a.priceNum;
      }
      if (sortBy === "newest") {
        return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
      }
      // "featured" default
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    });
  }, [selectedCategory, selectedConcentration, searchQuery, sortBy, priceMax, inStockOnly]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedConcentration("all");
    setSortBy("featured");
    setPriceMax(3000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery !== "" ||
    selectedConcentration !== "all" ||
    sortBy !== "featured" ||
    priceMax < 3000 ||
    inStockOnly;

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center space-x-2 text-xs text-neutral-muted">
          <Link href="/" className="hover:text-gold-champagne transition-colors">
            Maison
          </Link>
          <ChevronRight size={12} className="text-border-subtle" />
          <span className="text-neutral-ivory">Fragrance Boutique</span>
        </nav>

        {/* Section 1: Page Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            HAUTE PARFUMERIE ANTHOLOGY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            EXPLORE THE WORLD OF FRAGOLOGY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
            Discover distinctive fragrances crafted to express individuality, elegance, and character. Formulated with high concentration botanical extraits.
          </p>
        </div>

        {/* Section 2: Category Navigation Strip */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 border-b border-border-subtle/60 gap-2 sm:gap-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans font-light transition-all whitespace-nowrap ${
                selectedCategory === cat.value
                  ? "bg-gold-primary text-brand-deep font-medium shadow-gold-subtle"
                  : "bg-brand-rich/80 text-neutral-soft hover:text-gold-champagne border border-border-subtle/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section 3: Search, Filter Bar & Controls */}
        <div className="bg-brand-rich/70 border border-border-subtle p-5 sm:p-6 rounded-xs mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-muted" />
              <input
                type="text"
                placeholder="Search flacons, accords, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-deep border border-border-subtle pl-10 pr-4 py-2.5 text-xs text-neutral-ivory placeholder:text-neutral-muted/50 rounded-xs focus:border-gold-primary outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-muted hover:text-neutral-ivory text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Desktop Filters Row */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Concentration Filter */}
              <select
                value={selectedConcentration}
                onChange={(e) => setSelectedConcentration(e.target.value)}
                className="bg-brand-deep border border-border-subtle text-neutral-ivory text-xs px-3 py-2.5 rounded-xs outline-none focus:border-gold-primary"
              >
                <option value="all">Concentration: All</option>
                <option value="Extrait">Extrait de Parfum (30%)</option>
                <option value="Eau de Parfum">Eau de Parfum (20%)</option>
              </select>

              {/* Sorting Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-deep border border-border-subtle text-neutral-ivory text-xs px-3 py-2.5 rounded-xs outline-none focus:border-gold-primary"
              >
                <option value="featured">Sort: Featured</option>
                <option value="alpha-asc">Alphabetical (A–Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center space-x-1.5 px-3 py-2.5 border border-border-subtle text-xs text-neutral-ivory rounded-xs"
              >
                <SlidersHorizontal size={14} />
                <span>Price & Stock</span>
              </button>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center space-x-1 text-xs text-gold-champagne hover:underline py-1"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Advanced / Mobile Drawer Filters (Price & Stock) */}
          <div className={`${showMobileFilters ? "block" : "hidden md:flex"} pt-4 border-t border-border-subtle/50 items-center justify-between text-xs text-neutral-muted gap-6`}>
            <div className="flex items-center space-x-4">
              <span className="font-sans text-[11px] uppercase tracking-wider text-neutral-soft">
                Maximum Price: <span className="font-numbers font-semibold text-gold-champagne">₹{priceMax.toLocaleString("en-IN")}</span>
              </span>
              <input
                type="range"
                min="1000"
                max="3000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="accent-gold-primary cursor-pointer w-32 sm:w-48"
              />
            </div>

            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-gold-primary rounded-xs"
              />
              <span className="text-neutral-soft">In-Stock Flacons Only</span>
            </label>
          </div>
        </div>

        {/* Filtered Product Count Meta */}
        <div className="flex items-center justify-between mb-8 text-xs text-neutral-muted font-mono tracking-wider uppercase">
          <span>
            Displaying {filteredProducts.length} of {PRODUCTS_CATALOG.length} Fragrances
          </span>
          {hasActiveFilters && (
            <span className="text-gold-champagne">Filters Active</span>
          )}
        </div>

        {/* Section 4: Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="my-16">
            <EmptyState
              heading="No Fragrances Found"
              description="No formulations in our catalogue match your selected search or filter parameters. Try broadening your accord criteria."
              actionLabel="Reset All Filters"
              onAction={clearAllFilters}
            />
          </div>
        )}

        {/* Section 5: Editorial Promotional Banner */}
        <div className="relative p-10 sm:p-16 border border-border-subtle bg-gradient-to-r from-brand-rich via-brand-espresso to-brand-deep rounded-xs overflow-hidden my-12 text-center sm:text-left shadow-luxury-card">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-luxury opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
              <Crown size={12} strokeWidth={1.5} className="text-gold-primary" />
              <span>BESPOKE SAMPLING</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory">
              Discover Before You Commit
            </h3>
            <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
              Every 100ml flacon order includes an exterior matching 2ml skin-test vial. Experience the sillage on your skin before unwrapping the presentation cellophane.
            </p>
            <div className="pt-2">
              <Link href="/scent-finder">
                <Button variant="primary" size="sm">
                  Take Scent Finder Diagnostic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
