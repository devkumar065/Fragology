"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form-label";
import { MotionFadeIn } from "@/components/ui/motion-reveal";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Please provide an email address.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please provide a valid email format (e.g., patron@fragology.com).");
      return;
    }

    setIsLoading(true);

    // Simulate brief client-side validation without calling backend
    setTimeout(() => {
      setIsLoading(false);
      setIsDemoSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter Inquiries"
      className="py-20 sm:py-28 bg-brand-rich border-b border-border-subtle relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center max-w-xl">
        <MotionFadeIn direction="up" className="space-y-6">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-gold-champagne font-medium">
            STAY CLOSE TO FRAGOLOGY
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-ivory tracking-wide">
            DISCOVER WHAT’S NEXT.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-md mx-auto">
            Receive fragrance inspiration, brand stories, and updates from Fragology.
          </p>

        {isDemoSubmitted ? (
          <div className="p-6 border border-gold-primary/40 bg-brand-deep/90 rounded-xs space-y-2 text-center animate-in fade-in duration-300">
            <div className="flex justify-center text-gold-primary mb-2">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="font-serif text-lg text-neutral-ivory font-light">
              Maison Subscription Confirmed
            </h4>
            <p className="text-xs text-neutral-muted font-light leading-relaxed">
              Welcome to the Maison circle. Your subscription for <span className="text-gold-champagne font-mono">{email}</span> has been confirmed. You will receive private previews and seasonal monographs.
            </p>
            <button
              onClick={() => {
                setIsDemoSubmitted(false);
                setEmail("");
              }}
              className="mt-3 text-[10px] font-sans uppercase tracking-[0.2em] text-gold-primary hover:underline"
            >
              Enter another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-2 text-left">
            <div>
              <FormLabel htmlFor="newsletter-email" required>
                Email Address
              </FormLabel>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="patron@fragology.com"
                  error={error || undefined}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full sm:w-auto"
                >
                  SUBSCRIBE
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-neutral-muted/70 pt-1">
              <AlertCircle size={12} className="text-gold-muted flex-shrink-0" />
              <span>
                Exclusive Maison monographs only. Unsubscribe anytime via private link.
              </span>
            </div>
          </form>
        )}
        </MotionFadeIn>
      </Container>
    </section>
  );
}

export default NewsletterSection;
