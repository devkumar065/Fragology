"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/data/faq";
import { FAQCategory } from "@/types/faq";

const CATEGORIES: FAQCategory[] = [
  "Products & Fragrances",
  "Orders",
  "Shipping",
  "Returns & Refunds",
  "Payments",
  "General Questions",
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "prod-1": true, // First question open by default
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const displayedFAQs = FAQ_DATA.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="default">
        {/* Section 1: FAQ Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            CLIENT ASSISTANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-xl mx-auto">
            Review answers regarding our extrait concentrations, climate-insulated delivery, and sample vial policies.
          </p>
        </div>

        {/* Section 2: FAQ Category Navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 border-b border-border-subtle/60 gap-2 sm:gap-3 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-gold-primary text-brand-deep font-medium shadow-gold-subtle"
                : "bg-brand-rich text-neutral-soft hover:text-gold-champagne border border-border-subtle/50"
            }`}
          >
            All Questions
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-gold-primary text-brand-deep font-medium shadow-gold-subtle"
                  : "bg-brand-rich text-neutral-soft hover:text-gold-champagne border border-border-subtle/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section 3: Accordion Questions */}
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          {displayedFAQs.map((faq) => {
            const isOpen = Boolean(openIds[faq.id]);
            return (
              <div
                key={faq.id}
                className={`border rounded-xs transition-colors overflow-hidden ${
                  isOpen
                    ? "border-gold-primary/50 bg-brand-rich/90"
                    : "border-border-subtle bg-brand-rich/40 hover:border-gold-primary/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-primary"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-champagne/80 block">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-light text-neutral-ivory">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gold-primary transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-muted leading-relaxed font-light border-t border-border-subtle/30">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Section 4: Contact Support CTA */}
        <div className="p-8 sm:p-12 border border-border-subtle bg-brand-espresso/50 rounded-xs text-center max-w-2xl mx-auto space-y-4 shadow-luxury-card">
          <MessageSquare size={20} className="text-gold-primary mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory">
            Require Bespoke Assistance?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-md mx-auto">
            If your inquiry is not answered above, our fragrance concierge team is delighted to provide tailored advice.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contact Concierge Desk
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
