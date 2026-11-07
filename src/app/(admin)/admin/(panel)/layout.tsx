"use client";

import React, { useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/context/admin-auth-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import Link from "next/link";
import { Lock } from "lucide-react";

function AdminPanelContent({ children }: { children: React.ReactNode }) {
  const { adminUser, isLoading } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center text-xs text-neutral-muted">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-mono uppercase tracking-[0.2em] text-[10px] text-gold-champagne">
            Authenticating Atelier Clearance...
          </span>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-brand-deep flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-brand-rich border border-border-subtle p-8 rounded-xs space-y-4 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-champagne">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-2xl font-light text-neutral-ivory">
            Authentication Required
          </h2>
          <p className="text-xs text-neutral-muted leading-relaxed font-light">
            You must be an authorized Fragology administrative staff member with active credentials to access the atelier operations platform.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-block px-8 py-3 bg-gold-primary text-brand-deep text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
            >
              Authenticate at Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-brand-deep text-neutral-ivory overflow-hidden">
      {/* Desktop / Mobile Protected Sidebar */}
      <AdminSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-8 bg-brand-deep">{children}</main>
      </div>
    </div>
  );
}

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminPanelContent>{children}</AdminPanelContent>
    </AdminAuthProvider>
  );
}
