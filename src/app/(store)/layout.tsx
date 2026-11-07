import Link from "next/link";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.2em] uppercase font-light">
            Fragology
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm tracking-wider uppercase font-light text-stone-700">
            <Link href="/shop" className="hover:text-stone-950 transition">Shop</Link>
            <Link href="/collections" className="hover:text-stone-950 transition">Collections</Link>
            <Link href="/scent-finder" className="hover:text-stone-950 transition">Scent Finder</Link>
            <Link href="/journal" className="hover:text-stone-950 transition">Journal</Link>
            <Link href="/about" className="hover:text-stone-950 transition">About</Link>
          </nav>
          <div className="flex items-center space-x-6 text-sm tracking-wider uppercase">
            <Link href="/wishlist" className="hover:text-stone-950 transition hidden sm:inline">Wishlist</Link>
            <Link href="/my-account" className="hover:text-stone-950 transition">Account</Link>
            <Link href="/cart" className="hover:text-stone-950 transition font-medium">Cart (0)</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-stone-200 bg-stone-100 text-stone-600 text-sm py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg tracking-widest uppercase text-stone-900 mb-4">Fragology</h4>
            <p className="text-xs leading-relaxed text-stone-500">
              The study and art of olfactory perfection. Crafted with rare botanicals and master distillation.
            </p>
          </div>
          <div>
            <h5 className="font-medium text-stone-900 uppercase tracking-wider text-xs mb-3">Explore</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop" className="hover:text-stone-900">All Fragrances</Link></li>
              <li><Link href="/collections" className="hover:text-stone-900">Curated Collections</Link></li>
              <li><Link href="/scent-finder" className="hover:text-stone-900">Scent Finder</Link></li>
              <li><Link href="/journal" className="hover:text-stone-900">Fragrance Journal</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-stone-900 uppercase tracking-wider text-xs mb-3">Customer Care</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/order-tracking" className="hover:text-stone-900">Track Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-stone-900">Shipping Policy</Link></li>
              <li><Link href="/returns-refunds" className="hover:text-stone-900">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-stone-900">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-stone-900">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-stone-900 uppercase tracking-wider text-xs mb-3">Legal</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy-policy" className="hover:text-stone-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-stone-900">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-stone-200 text-xs text-stone-400 flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Fragology. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-light">Elegance bottled in perfection.</p>
        </div>
      </footer>
    </div>
  );
}
