import Link from "next/link";
import React from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Products", href: "/admin/products" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Collections", href: "/admin/collections" },
    { label: "Inventory", href: "/admin/inventory" },
    { label: "Orders", href: "/admin/orders" },
    { label: "Customers", href: "/admin/customers" },
    { label: "Coupons", href: "/admin/coupons" },
    { label: "Reviews", href: "/admin/reviews" },
    { label: "Content", href: "/admin/content" },
    { label: "Marketing", href: "/admin/marketing" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100 text-stone-900">
      <aside className="w-64 bg-stone-900 text-stone-200 flex flex-col p-6 space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400">Fragology</span>
          <h2 className="text-xl font-serif text-white mt-1">Management</h2>
        </div>
        <nav className="flex-1 space-y-1 text-xs uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500">
          Admin Logged In
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
