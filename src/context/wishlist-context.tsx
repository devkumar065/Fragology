"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { PRODUCTS } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY_WISHLIST = "fragology_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WISHLIST);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const resolved = ids
          .map((id) => PRODUCTS.find((p) => p.id === id || p.slug === id))
          .filter(Boolean) as Product[];
        setItems(resolved);
      } else {
        // Pre-populate with two representative favorite flacons for elegant first-time experience
        const initial = [PRODUCTS[0], PRODUCTS[1]].filter(Boolean);
        setItems(initial);
      }
    } catch {
      // Ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const ids = items.map((p) => p.id);
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(ids));
    } catch {
      // Ignore
    }
  }, [items, isInitialized]);

  const isInWishlist = (productId: string) => {
    return items.some((p) => p.id === productId || p.slug === productId);
  };

  const toggleWishlist = (product: Product): boolean => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setItems((prev) => prev.filter((p) => p.id !== product.id && p.slug !== product.id));
      return false;
    } else {
      setItems((prev) => [product, ...prev]);
      return true;
    }
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId && p.slug !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount: items.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
