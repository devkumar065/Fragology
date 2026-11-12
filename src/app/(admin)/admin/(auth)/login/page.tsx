"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  AlertCircle,
  Crown,
  Package,
  Boxes,
  Truck,
  UserCheck,
  Megaphone,
  Feather,
  RefreshCw,
  Lock,
  Mail,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/context/admin-auth-context";
import { AdminRole } from "@/lib/admin/types";

interface DemoAccount {
  role: AdminRole;
  title: string;
  name: string;
  email: string;
  password: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "super_admin",
    title: "Super Administrator",
    name: "Dev Kumar",
    email: "admin@fragology.com",
    password: "haute-admin-2026",
    icon: Crown,
  },
  {
    role: "product_manager",
    title: "Product Manager",
    name: "Genevieve Vane",
    email: "products@fragology.com",
    password: "haute-admin-2026",
    icon: Package,
  },
  {
    role: "inventory_manager",
    title: "Inventory Manager",
    name: "Marcus Vance",
    email: "inventory@fragology.com",
    password: "haute-admin-2026",
    icon: Boxes,
  },
  {
    role: "order_manager",
    title: "Order Manager",
    name: "Claire Delacroix",
    email: "orders@fragology.com",
    password: "haute-admin-2026",
    icon: Truck,
  },
  {
    role: "customer_support",
    title: "Customer Support",
    name: "Sophie Laurent",
    email: "concierge@fragology.com",
    password: "haute-admin-2026",
    icon: UserCheck,
  },
  {
    role: "marketing_manager",
    title: "Marketing Director",
    name: "Julian Thorne",
    email: "marketing@fragology.com",
    password: "haute-admin-2026",
    icon: Megaphone,
  },
  {
    role: "content_manager",
    title: "Content Manager",
    name: "Eleanor Rousseau",
    email: "editorial@fragology.com",
    password: "haute-admin-2026",
    icon: Feather,
  },
];

function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [selectedRole, setSelectedRole] = useState<AdminRole>("super_admin");
  const [email, setEmail] = useState("admin@fragology.com");
  const [password, setPassword] = useState("haute-admin-2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = (acc: DemoAccount) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-deep flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-serif text-2xl tracking-[0.3em] text-neutral-ivory uppercase">
            Fragology
          </span>
          <p className="text-xs text-neutral-muted mt-1 tracking-widest uppercase font-sans">
            Admin Panel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Role Selection */}
          <div className="space-y-3">
            <p className="text-xs text-neutral-muted font-sans mb-4">
              Select your role to continue — credentials will fill automatically.
            </p>

            {DEMO_ACCOUNTS.map((acc) => {
              const isSelected = selectedRole === acc.role;
              const Icon = acc.icon;
              return (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleSelectRole(acc)}
                  className={`w-full flex items-center space-x-3 p-3.5 border text-left transition-all duration-150 ${
                    isSelected
                      ? "border-gold-primary bg-brand-rich text-neutral-ivory"
                      : "border-border-subtle bg-brand-espresso/60 text-neutral-muted hover:border-gold-primary/50 hover:text-neutral-ivory"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "text-gold-champagne"
                        : "text-neutral-muted"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-sans font-medium truncate">
                      {acc.title}
                    </span>
                    <span className="block text-[11px] text-neutral-muted truncate">
                      {acc.name} · {acc.email}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="ml-auto shrink-0 w-2 h-2 rounded-full bg-gold-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Login Form */}
          <div className="bg-brand-rich border border-border-subtle p-7 space-y-5">
            <div>
              <h2 className="text-xl font-sans font-semibold text-neutral-ivory">
                Sign In
              </h2>
              <p className="text-xs text-neutral-muted mt-0.5">
                Logged in as:{" "}
                <span className="text-gold-champagne">
                  {DEMO_ACCOUNTS.find((a) => a.role === selectedRole)?.title}
                </span>
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 flex items-center space-x-2 text-xs text-red-200">
                <AlertCircle size={14} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-muted mb-1.5 font-sans">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-2.5 pl-9 text-sm text-neutral-ivory font-sans focus:outline-none focus:border-gold-primary transition-colors"
                  />
                  <Mail size={14} className="absolute left-3 top-3.5 text-neutral-muted" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-muted mb-1.5 font-sans">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-2.5 pl-9 text-sm text-neutral-ivory font-sans focus:outline-none focus:border-gold-primary transition-colors"
                  />
                  <Lock size={14} className="absolute left-3 top-3.5 text-neutral-muted" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold-primary text-brand-deep font-sans text-sm font-semibold hover:bg-gold-champagne disabled:opacity-50 transition-colors flex items-center justify-center space-x-2 mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-neutral-muted/60 text-center font-sans pt-2">
              Demo password: haute-admin-2026
            </p>
          </div>
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
