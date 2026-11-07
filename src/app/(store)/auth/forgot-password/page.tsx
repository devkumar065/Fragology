"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/my-account`,
      });
      setSubmitted(true);
    } catch {
      // In demo mode or offline, simulate graceful success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 bg-radial-dark">
      <Container size="tight">
        <div className="w-full max-w-md mx-auto bg-brand-rich border border-border-subtle p-8 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-champagne">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="font-serif text-2xl font-light text-neutral-ivory">
                Recovery Dispatch Sent
              </h2>
              <p className="text-xs text-neutral-muted leading-relaxed font-light">
                If an authenticated account exists for <span className="text-gold-champagne font-mono">{email}</span>, password reset credentials have been dispatched to your inbox.
              </p>
              <div className="pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-gold-champagne hover:underline"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2 mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
                  Client Security
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory tracking-wide">
                  Reset Password
                </h1>
                <p className="text-xs text-neutral-muted font-light leading-relaxed">
                  Enter your registered client email to receive secure instructions to restore portal access.
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
                    Account Email
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors duration-200 mt-6"
                >
                  <span>{loading ? "Sending..." : "Send Reset Link"}</span>
                  <ArrowRight size={14} />
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center space-x-1.5 text-xs text-neutral-muted hover:text-gold-champagne transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
