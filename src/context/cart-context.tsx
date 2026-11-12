"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CartItem } from "@/types/cart";
import { Coupon } from "@/types/coupon";
import { Product, ProductVariant } from "@/types/product";
import { validateCoupon } from "@/data/coupons";

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  coupon: Coupon | null;
  couponCode: string;
  couponMessage: string | null;
  shipping: number;
  estimatedTax: number;
  total: number;
  isCartOpen: boolean;
  
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY_CART = "fragology_cart_v1";
const STORAGE_KEY_COUPON = "fragology_active_coupon_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY_CART);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      const storedCoupon = localStorage.getItem(STORAGE_KEY_COUPON);
      if (storedCoupon) {
        const parsedCoupon: Coupon = JSON.parse(storedCoupon);
        setCoupon(parsedCoupon);
        setCouponCode(parsedCoupon.code);
      }
    } catch {
      // Ignore parse error
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to LocalStorage on item changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
    } catch {
      // LocalStorage error
    }
  }, [items, isInitialized]);

  // Sync active coupon to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (coupon) {
        localStorage.setItem(STORAGE_KEY_COUPON, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(STORAGE_KEY_COUPON);
      }
    } catch {
      // Ignore
    }
  }, [coupon, isInitialized]);

  // Calculations
  const cartCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    const raw = items.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);
    return Math.round(raw * 100) / 100;
  }, [items]);

  // Re-validate coupon when subtotal changes
  const discount = useMemo(() => {
    if (!coupon || subtotal === 0) return 0;
    const res = validateCoupon(coupon.code, subtotal);
    if (!res.valid) return 0;
    return res.discountAmount;
  }, [coupon, subtotal]);

  // Luxury shipping policy: Free insured white-glove shipping on orders over ₹1,999
  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 1999 ? 0 : 99;
  }, [subtotal]);

  // Standard luxury excise / tax calculation (approx 8%)
  const estimatedTax = useMemo(() => {
    if (subtotal === 0) return 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    return Math.round(taxableAmount * 0.08 * 100) / 100;
  }, [subtotal, discount]);

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    const raw = subtotal - discount + shipping + estimatedTax;
    return Math.round(Math.max(0, raw) * 100) / 100;
  }, [subtotal, discount, shipping, estimatedTax]);

  const addItem = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1
  ) => {
    const chosenVariant =
      variant ||
      product.variants[product.variants.length - 1] || {
        size: "100ml",
        volumeDisplay: "100ml Architectural Flacon",
        priceNum: product.priceNum,
        price: product.price,
      };

    const lineId = `${product.id}-${chosenVariant.size}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === lineId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: lineId,
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          productSubtitle: product.subtitle,
          variantSize: chosenVariant.size,
          volumeDisplay: chosenVariant.volumeDisplay,
          concentration: product.concentration,
          priceNum: chosenVariant.priceNum,
          unitPrice: chosenVariant.priceNum,
          priceDisplay: chosenVariant.price,
          quantity,
          image: product.images?.[0] || "/images/products/fragology-flacon.png",
          accentColor: product.accentColor,
        };
        return [...prevItems, newItem];
      }
    });

    // Auto open drawer for immediate luxury sensory feedback
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setCouponCode("");
    setCouponMessage(null);
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    if (!code.trim()) {
      return { success: false, message: "Please provide a valid privilege code." };
    }
    const res = validateCoupon(code, subtotal);
    if (res.valid && res.coupon) {
      setCoupon(res.coupon);
      setCouponCode(res.coupon.code);
      setCouponMessage(res.message);
      return { success: true, message: res.message };
    } else {
      setCouponMessage(res.message);
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setCouponMessage(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
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
        isCartOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
