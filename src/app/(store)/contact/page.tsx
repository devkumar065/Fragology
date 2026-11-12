"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, HelpCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form-label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "A valid email address is required.";
    }
    if (!formData.subject.trim()) {
      errs.subject = "Subject is required.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Client-side simulation
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="default">
        {/* Section 1 & 2: Contact Hero & Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            CONNECT WITH THE MAISON
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
            Our fragrance advisors are at your disposal for scent profiling consultations, order guidance, and bespoke inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section 3: Contact Form */}
          <div className="lg:col-span-8 p-8 sm:p-12 border border-border-subtle bg-brand-rich/60 rounded-xs shadow-luxury-card">
            {isSubmitted ? (
              <div className="p-8 border border-gold-primary/40 bg-brand-espresso/80 rounded-xs text-center space-y-4 animate-in fade-in duration-300">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-primary/20 text-gold-champagne">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-serif text-2xl text-neutral-ivory font-light">
                  Concierge Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light max-w-md mx-auto">
                  Thank you, <span className="text-gold-champagne">{formData.name}</span>. Your inquiry regarding <span className="text-gold-champagne font-mono">&ldquo;{formData.subject}&rdquo;</span> has been transmitted to our client liaison.
                </p>
                <div className="p-3 bg-brand-deep/80 border border-border-subtle text-[11px] text-neutral-muted max-w-md mx-auto">
                  <span className="text-gold-primary font-medium">Private Concierge:</span> All client inquiries are reviewed within 24 business hours by our Paris &amp; Grasse ateliers.
                </div>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <FormLabel htmlFor="contact-name" required>
                    Full Name
                  </FormLabel>
                  <Input
                    id="contact-name"
                    placeholder="Lord Byron"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="contact-email" required>
                    Email Address
                  </FormLabel>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="patron@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="contact-subject" required>
                    Subject
                  </FormLabel>
                  <Input
                    id="contact-subject"
                    placeholder="Fragrance Consultation / Bespoke Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    error={errors.subject}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="contact-message" required>
                    Message
                  </FormLabel>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="How may our fragrance concierge assist your olfactory journey?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-brand-deep border px-4 py-3 text-xs md:text-sm font-sans tracking-wide text-neutral-ivory placeholder:text-neutral-muted/50 rounded-xs outline-none transition-colors ${
                      errors.message
                        ? "border-rose-700/80 focus:border-rose-500"
                        : "border-border-subtle focus:border-gold-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 font-sans tracking-wide mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    className="w-full sm:w-auto"
                  >
                    Submit Concierge Inquiry
                  </Button>
                  <div className="flex items-center space-x-1.5 text-[10px] text-neutral-muted/70">
                    <ShieldCheck size={12} className="text-gold-primary" />
                    <span>Private Concierge Encryption Active &bull; Monitored 24/7</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Section 4 & 5: Contact Information & FAQ CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* Information Card */}
            <div className="p-6 sm:p-8 border border-border-subtle bg-brand-rich/60 rounded-xs space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne block">
                OFFICIAL CONCIERGE DESK
              </span>
              <h3 className="font-serif text-xl text-neutral-ivory font-light">
                Digital Atelier
              </h3>
              <p className="text-xs text-neutral-muted leading-relaxed font-light">
                Our advisors respond to inquiries Monday through Friday, 9:00 AM – 6:00 PM CET.
              </p>
              <div className="pt-2 border-t border-border-subtle/50 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-neutral-ivory">
                  <Mail size={14} className="text-gold-primary" />
                  <span className="font-mono text-[11px]">concierge@fragology.com</span>
                </div>
              </div>
            </div>

            {/* FAQ CTA Card */}
            <div className="p-6 sm:p-8 border border-border-subtle bg-brand-espresso/60 rounded-xs space-y-4">
              <div className="flex items-center space-x-2 text-gold-primary">
                <HelpCircle size={16} />
                <span className="text-xs uppercase tracking-wider font-medium font-sans">
                  Quick Answers
                </span>
              </div>
              <h4 className="font-serif text-lg text-neutral-ivory font-light">
                Frequently Asked Questions
              </h4>
              <p className="text-xs text-neutral-muted leading-relaxed font-light">
                Find answers regarding formula concentrations, international delivery, and sample vial policies.
              </p>
              <div className="pt-2">
                <Link
                  href="/faq"
                  className="text-xs uppercase tracking-widest text-gold-champagne hover:underline inline-block font-sans"
                >
                  Visit Client FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
