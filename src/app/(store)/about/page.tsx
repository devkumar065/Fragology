import React from "react";
import Link from "next/link";
import { Gem, Compass, Feather, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

export default function AboutPage() {
  const values = [
    {
      title: "Individuality",
      desc: "Fragrance should never feel like a uniform. Our creations are balanced to interact uniquely with your skin chemistry, projecting personal character rather than a manufactured crowd-pleaser.",
      icon: <Gem size={20} className="text-gold-primary" strokeWidth={1.25} />,
    },
    {
      title: "Thoughtful Composition",
      desc: "Every formulation begins with disciplined restraint. We layer rare extracts, noble barks, and ethereal florals to achieve mathematical harmony between top, heart, and base chords.",
      icon: <Compass size={20} className="text-gold-primary" />,
    },
    {
      title: "Distinctive Expression",
      desc: "An uncompromising commitment to distinctive olfactory signatures. We curate accords that provoke emotion, invite curiosity, and leave an indelible sensory presence.",
      icon: <Feather size={20} className="text-gold-primary" />,
    },
    {
      title: "Timeless Elegance",
      desc: "True luxury transcends seasonal hype and synthetic fads. We craft architectural fragrances intended to remain modern, evocative, and admired across decades.",
      icon: <Clock size={20} className="text-gold-primary" />,
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="default">
        {/* Section 1 & 2: About Hero & Brand Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 space-y-6">
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium">
            MAISON ESSENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-neutral-ivory tracking-wide leading-tight">
            THE ART OF INDIVIDUAL EXPRESSION
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted font-light leading-relaxed">
            Fragology represents a world where fragrance becomes an expression of identity, emotion, and personal style.
          </p>
        </div>

        {/* Decorative Visual Divider */}
        <div className="relative aspect-[16/7] w-full rounded-xs border border-gold-primary/30 bg-gradient-to-b from-brand-espresso via-brand-chocolate to-brand-deep p-8 flex items-center justify-center overflow-hidden mb-20 shadow-luxury-card select-none">
          <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none" />
          <div className="relative z-10 text-center space-y-3">
            <div className="h-16 w-16 mx-auto rounded-full border border-gold-primary/40 bg-brand-deep/80 flex items-center justify-center shadow-gold-subtle">
              <span className="font-serif text-2xl font-light text-gold-primary">F</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl font-light text-neutral-ivory italic max-w-md">
              “Bottled emotion. Distilled character.”
            </p>
          </div>
        </div>

        {/* Section 3: Our Philosophy - Editorial Warm Ivory Plate */}
        <section className="mb-20 max-w-4xl mx-auto p-8 sm:p-14 bg-brand-ivory border border-border-subtle rounded-xs shadow-luxury-card space-y-6 text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#F7F2EB] to-transparent rounded-full blur-2xl pointer-events-none opacity-60" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-muted block font-semibold relative z-10">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark leading-tight relative z-10">
            Beyond the Accessory: Scent as a Living Signature
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-brand-rich font-normal leading-relaxed relative z-10">
            <p>
              We believe a fragrance is more than an accessory. It is a personal signature, an invisible expression of character, and a memory waiting to be created.
            </p>
            <p className="text-brand-chocolate">
              While visual design speaks to the conscious eye, scent communicates directly with the limbic system—evoking memories, altering mood, and leaving an impression that lingers long after a room has cleared.
            </p>
          </div>
        </section>

        <Divider variant="gold" className="my-16" />

        {/* Section 4: Our Approach to Fragrance */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne block">
              OUR CRAFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory leading-tight">
              Architectural Formulations
            </h2>
            <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
              We approach each creation through the lens of architectural design: balancing volatile top chords that awaken the air with deeply grounding resins that linger closely on the skin for hours.
            </p>
            <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
              By formulating our extraits with high natural oil concentrations, we allow the perfume to breathe and evolve throughout your day, revealing nuanced facet after facet.
            </p>
          </div>

          <div className="p-8 border border-border-subtle bg-brand-rich/60 rounded-xs space-y-4">
            <h3 className="font-serif text-xl text-neutral-ivory font-light border-b border-border-subtle pb-3">
              Maison Standards
            </h3>
            <ul className="space-y-3 text-xs text-neutral-muted font-light">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-primary" />
                <span>Extrait de parfum concentration (25% to 32% pure oil)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-primary" />
                <span>Extended micro-batch maceration for harmonic settling</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-primary" />
                <span>100% cruelty-free and ethically synthesized fauna replicas</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-primary" />
                <span>Complimentary skin-test vial with every presentation flacon</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Brand Values */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="PILLARS OF CREATION"
            heading="Our Guiding Values"
            description="The four principles that shape every formulation, flacon design, and client interaction."
            className="mb-12 text-center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-8 border border-border-subtle bg-brand-rich/40 rounded-xs space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-deep">
                    {val.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-neutral-ivory">
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 & 7: Closing Statement & Explore CTA */}
        <div className="p-10 sm:p-16 border border-gold-primary/40 bg-gradient-to-r from-brand-rich via-brand-espresso to-brand-deep rounded-xs text-center space-y-6 shadow-luxury-card max-w-3xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-champagne">
            YOUR OLFACTIVE JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-ivory leading-tight">
            Discover Your Signature Character
          </h2>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed max-w-lg mx-auto">
            Experience the complete anthology of Fragology extraits, or explore our personalized scent finder diagnostic.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button variant="primary" size="md">
                Explore Fragrances
              </Button>
            </Link>
            <Link href="/scent-finder">
              <Button variant="secondary" size="md">
                Take Scent Finder Quiz
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
