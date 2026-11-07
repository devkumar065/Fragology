"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    const res = await signUp(email, password, fullName);
    setLoading(false);

    if (res.success) {
      router.push("/my-account");
    } else {
      setError(res.error || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 bg-radial-dark">
      <Container size="tight">
        <div className="w-full max-w-md mx-auto bg-brand-rich border border-border-subtle p-8 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
              Private Client Register
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory tracking-wide">
              Create Your Account
            </h1>
            <p className="text-xs text-neutral-muted font-light leading-relaxed">
              Join our private olfactory circle for bespoke fragrance consultations, limited harvests, and private events.
            </p>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-red-950/40 border border-red-500/40 text-red-200 text-xs text-center rounded-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                Full Title & Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lady Genevieve Vane"
                  className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                Password (min. 8 characters)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 pl-10 text-xs text-neutral-ivory placeholder-neutral-muted/50 focus:outline-hidden focus:border-gold-primary transition-colors"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-neutral-muted" />
              </div>
            </div>

            {/* Newsletter opt-in */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 accent-gold-primary bg-brand-espresso border border-border-subtle rounded-xs"
                />
                <span className="text-[11px] text-neutral-muted leading-tight">
                  Receive private invitations, seasonal distillation announcements, and member-only privileges.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors duration-200 mt-6"
            >
              <span>{loading ? "Registering Client Profile..." : "Register Membership"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-muted">
            Already have a client account?{" "}
            <Link
              href="/auth/login"
              className="text-gold-champagne hover:underline font-normal uppercase tracking-wider ml-1"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8 pt-4 border-t border-border-subtle/30 flex items-center justify-center space-x-2 text-[10px] text-neutral-muted/70">
            <ShieldCheck size={13} className="text-gold-muted" />
            <span>Strict Client Confidentiality &bull; ISO 27001 Compliant</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
