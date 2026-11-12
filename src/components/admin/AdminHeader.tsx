"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Clock,
  ExternalLink,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { AdminRole } from "@/lib/admin/types";
import { ROLE_LABELS } from "@/lib/admin/rbac";
import { AdminNotificationDrawer } from "./AdminNotificationDrawer";

export interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const { adminUser, role, switchRoleForTesting, unreadNotificationCount } = useAdminAuth();
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles: AdminRole[] = [
    "super_admin",
    "product_manager",
    "inventory_manager",
    "order_manager",
    "customer_support",
    "marketing_manager",
    "content_manager",
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-brand-deep/95 backdrop-blur-md border-b border-border-subtle py-3 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-neutral-muted hover:text-neutral-ivory lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>

          {/* Clock */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-neutral-muted bg-brand-espresso px-3 py-1.5 border border-border-subtle rounded-xs">
            <Clock size={13} className="text-gold-primary" />
            <span>Paris Atelier: {currentTime || "12:00:00"} CET</span>
          </div>
        </div>

        {/* Right: Role Switcher, Notifications, Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Role Preview Switcher for Testing (Essential for verifying all 7 roles) */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-brand-espresso border border-gold-primary/30 text-gold-champagne hover:border-gold-primary rounded-xs text-[11px] font-mono transition-colors"
              title="Switch RBAC Role to test permissions"
            >
              <Shield size={12} className="text-gold-primary" />
              <span className="hidden md:inline uppercase tracking-wider">
                {role ? ROLE_LABELS[role] : "Role"}
              </span>
              <ChevronDown size={12} />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-brand-rich border border-gold-primary/50 shadow-2xl rounded-xs py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 border-b border-border-subtle text-[10px] uppercase font-mono tracking-wider text-neutral-muted">
                  Test Role Permissions
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRoleForTesting(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                      role === r
                        ? "bg-brand-espresso text-gold-champagne font-medium"
                        : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep"
                    }`}
                  >
                    <span>{ROLE_LABELS[r]}</span>
                    {role === r && <span className="text-[10px] text-gold-primary">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Storefront Link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-border-subtle text-neutral-muted hover:text-neutral-ivory hover:border-gold-primary text-xs uppercase tracking-wider rounded-xs transition-colors"
          >
            <span>Storefront</span>
            <ExternalLink size={12} />
          </Link>

          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationDrawerOpen(true)}
            className="relative p-2 text-neutral-muted hover:text-neutral-ivory transition-colors"
            aria-label="Open notifications"
          >
            <Bell size={18} />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-primary text-brand-deep text-[9px] font-mono font-bold flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Admin User Chip */}
          <div className="flex items-center space-x-2 pl-2 border-l border-border-subtle">
            <div className="w-7 h-7 rounded-full bg-gold-primary/20 border border-gold-primary/40 flex items-center justify-center text-gold-champagne text-xs font-serif font-bold">
              {adminUser?.fullName?.charAt(0) || "A"}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <span className="block font-serif text-neutral-ivory truncate max-w-[130px]">
                {adminUser?.fullName || "Administrator"}
              </span>
              <span className="text-[9px] font-mono text-neutral-muted block">
                Session: {adminUser?.lastLoginAt ? new Date(adminUser.lastLoginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Active"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Slide-Over */}
      <AdminNotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </>
  );
}
