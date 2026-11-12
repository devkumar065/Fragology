"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Crown, Eye, EyeOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/my-account");
    } else {
      setError(res.error || "Authentication failed. Please verify your credentials.");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("client@fragology.com");
    setPassword("haute-parfum-2026");
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 bg-radial-dark">
      <Container size="tight">
        <div className="w-full max-w-md mx-auto bg-brand-rich border border-border-subtle p-8 sm:p-10 shadow-2xl relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
              Private Client Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory tracking-wide">
              Sign In to Fragology
            </h1>
            <p className="text-xs text-neutral-muted font-light leading-relaxed">
              Access your bespoke fragrance wardrobe, commission history, and private concierge privileges.
            </p>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-500/40 text-red-200 text-xs text-center rounded-xs">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@fragology.com"
                  className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] text-gold-champagne hover:underline font-light"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 pr-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-neutral-muted hover:text-neutral-ivory transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors duration-200 mt-6"
            >
              <span>{loading ? "Authenticating..." : "Enter Maison Portal"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-6 border-t border-border-subtle/50 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2.5 px-4 bg-brand-deep border border-gold-primary/30 text-gold-champagne hover:border-gold-primary text-[11px] uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
            >
              <Crown size={14} strokeWidth={1.5} className="text-gold-primary" />
              <span>Use Demo Client Credentials</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="mt-6 text-center text-xs text-neutral-muted">
            New to Fragology?{" "}
            <Link
              href="/auth/signup"
              className="text-gold-champagne hover:underline font-normal uppercase tracking-wider ml-1"
            >
              Request Membership
            </Link>
          </div>

        </div>
      </Container>
    </div>
  );
}
