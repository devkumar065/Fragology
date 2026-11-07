"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/context/admin-auth-context";

function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("admin@fragology.com");
  const [password, setPassword] = useState("haute-admin-2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Authentication failed. Invalid staff credentials.");
    }
  };

  const setTestRole = (targetEmail: string) => {
    setEmail(targetEmail);
    setPassword("haute-admin-2026");
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-brand-deep relative">
      {/* Ambient background lighting */}
      <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none" />

      <div className="w-full max-w-md bg-brand-rich border border-gold-primary/40 p-8 sm:p-10 rounded-xs text-neutral-ivory shadow-2xl relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

        {/* Brand Header */}
        <div className="text-center mb-8 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-gold-primary block">
            Executive Control Plane
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-neutral-ivory tracking-wider mt-1">
            FRAGOLOGY
          </h1>
          <p className="text-xs text-neutral-muted font-light">
            Haute Parfumerie Business Operations
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/40 rounded-xs flex items-center space-x-2 text-xs text-red-200">
            <AlertCircle size={14} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@fragology.com"
                className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
              Encrypted Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors flex items-center justify-center space-x-2 mt-6 shadow-gold-subtle"
          >
            <span>{loading ? "Verifying Clearance..." : "Enter Operations Center"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Rapid Role Testing Selector */}
        <div className="mt-8 pt-6 border-t border-border-subtle/50 space-y-2 text-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gold-muted block">
            Rapid Role Testing Credentials:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setTestRole("admin@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-gold-champagne rounded-xs text-left truncate"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => setTestRole("products@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-neutral-soft rounded-xs text-left truncate"
            >
              Product Manager
            </button>
            <button
              type="button"
              onClick={() => setTestRole("inventory@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-neutral-soft rounded-xs text-left truncate"
            >
              Inventory Manager
            </button>
            <button
              type="button"
              onClick={() => setTestRole("orders@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-neutral-soft rounded-xs text-left truncate"
            >
              Order Manager
            </button>
            <button
              type="button"
              onClick={() => setTestRole("concierge@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-neutral-soft rounded-xs text-left truncate"
            >
              Customer Support
            </button>
            <button
              type="button"
              onClick={() => setTestRole("marketing@fragology.com")}
              className="px-2 py-1.5 bg-brand-espresso border border-border-subtle hover:border-gold-primary text-neutral-soft rounded-xs text-left truncate"
            >
              Marketing Director
            </button>
          </div>
        </div>

        {/* Security Warning */}
        <div className="mt-6 pt-4 border-t border-border-subtle/30 text-center">
          <p className="text-[10px] text-neutral-muted leading-relaxed font-light">
            Public administrative signup is permanently disabled. Access is provisioned strictly through Super Admin invitation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <AdminAuthProvider>
      <AdminLoginForm />
    </AdminAuthProvider>
  );
}
