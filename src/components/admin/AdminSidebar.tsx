"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Gem,
  Boxes,
  ShoppingCart,
  Users,
  Ticket,
  Star,
  FileText,
  Megaphone,
  Settings,
  LogOut,
  ShieldCheck,
  X,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { AdminModule } from "@/lib/admin/types";
import { ROLE_LABELS } from "@/lib/admin/rbac";

export interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  module: AdminModule;
  icon: React.ReactNode;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { adminUser, logout, canAccess } = useAdminAuth();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", module: "dashboard", icon: <LayoutDashboard size={16} /> },
    { label: "Products", href: "/admin/products", module: "products", icon: <Package size={16} /> },
    { label: "Categories", href: "/admin/categories", module: "categories", icon: <Tags size={16} /> },
    { label: "Collections", href: "/admin/collections", module: "collections", icon: <Gem size={16} strokeWidth={1.5} /> },
    { label: "Inventory", href: "/admin/inventory", module: "inventory", icon: <Boxes size={16} /> },
    { label: "Orders", href: "/admin/orders", module: "orders", icon: <ShoppingCart size={16} /> },
    { label: "Customers", href: "/admin/customers", module: "customers", icon: <Users size={16} /> },
    { label: "Coupons", href: "/admin/coupons", module: "coupons", icon: <Ticket size={16} /> },
    { label: "Reviews", href: "/admin/reviews", module: "reviews", icon: <Star size={16} /> },
    { label: "Content CMS", href: "/admin/content", module: "content", icon: <FileText size={16} /> },
    { label: "Marketing", href: "/admin/marketing", module: "marketing", icon: <Megaphone size={16} /> },
    { label: "Settings", href: "/admin/settings", module: "settings", icon: <Settings size={16} /> },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const authorizedNavItems = navItems.filter((item) => canAccess(item.module));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-brand-deep/80 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-brand-espresso border-r border-border-subtle flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-border-subtle/70 bg-brand-deep flex items-center justify-between">
          <Link href="/admin" onClick={onClose} className="group">
            <span className="font-serif text-xl tracking-[0.25em] font-light uppercase text-neutral-ivory group-hover:text-gold-champagne transition-colors">
              FRAGOLOGY
            </span>
            <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-gold-primary block mt-0.5">
              Atelier Operations Control
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-neutral-muted hover:text-neutral-ivory lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Staff Role Banner */}
        <div className="px-6 py-3 bg-brand-chocolate/40 border-b border-border-subtle text-[11px] flex items-center space-x-2">
          <ShieldCheck size={14} className="text-gold-primary shrink-0" />
          <div className="min-w-0">
            <span className="text-neutral-ivory truncate block font-serif text-xs">
              {adminUser?.fullName || "Staff Admin"}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gold-muted block truncate font-mono">
              {adminUser ? ROLE_LABELS[adminUser.role] : "Admin"}
            </span>
            {adminUser?.lastLoginAt && (
              <span className="text-[8px] font-mono text-neutral-muted block truncate">
                Auth: {new Date(adminUser.lastLoginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {authorizedNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xs text-xs font-sans uppercase tracking-[0.15em] transition-all ${
                  active
                    ? "bg-brand-deep text-gold-champagne border-l-2 border-gold-primary shadow-gold-subtle font-medium"
                    : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep/50"
                }`}
              >
                <span className={active ? "text-gold-primary" : "text-neutral-muted"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer with Storefront Link and Logout */}
        <div className="p-4 border-t border-border-subtle/60 bg-brand-deep space-y-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-[11px] text-neutral-muted hover:text-gold-champagne rounded-xs hover:bg-brand-espresso transition-colors"
          >
            <span className="uppercase tracking-wider">Live Storefront</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-[11px] uppercase tracking-wider text-neutral-muted hover:text-red-400 rounded-xs hover:bg-brand-espresso transition-colors text-left"
          >
            <LogOut size={13} />
            <span>End Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
