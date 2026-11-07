"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Compass, ArrowRight, Layers } from "lucide-react";
import {
  Button,
  Container,
  SectionHeading,
  Badge,
  Divider,
  Input,
  FormLabel,
  Skeleton,
  EmptyState,
  ImagePlaceholder,
} from "@/components/ui";

export default function Phase1FoundationPage() {
  const [testInput, setTestInput] = useState("");
  const [inputError, setInputError] = useState("");

  const handleValidate = () => {
    if (!testInput) {
      setInputError("Please enter an email address to verify error state styling.");
    } else {
      setInputError("");
    }
  };

  return (
    <div className="relative overflow-hidden bg-brand-deep">
      {/* Ambient Radial Luxury Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-gold-primary/10 via-brand-espresso/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. Hero Foundation Introduction */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-28 border-b border-border-subtle">
        <Container size="narrow" className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold-primary/40 rounded-full bg-brand-espresso/50">
            <Sparkles size={12} className="text-gold-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-champagne">
              Phase 1 • Architectural Foundation
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-neutral-ivory tracking-wide leading-[1.08]">
            The Architecture of Scent
          </h1>

          <p className="text-sm sm:text-base text-neutral-muted max-w-xl mx-auto leading-relaxed font-light">
            Welcome to the technical foundation and luxury design system of <strong className="text-neutral-ivory font-normal">FRAGOLOGY</strong>. 
            Crafted for pure aesthetic restraint, deep espresso surfaces, metallic gold accents, and editorial typography.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button variant="primary" size="md">
                Explore Shop Architecture
              </Button>
            </Link>
            <a href="#design-system">
              <Button variant="secondary" size="md">
                Inspect Design System
              </Button>
            </a>
          </div>
        </Container>
      </section>

      {/* 2. Color Palette Swatches */}
      <section id="design-system" className="py-20 border-b border-border-subtle bg-brand-rich/40">
        <Container size="wide">
          <SectionHeading
            eyebrow="Color Architecture"
            heading="Centralized Design Tokens"
            description="A disciplined, low-contrast palette calibrated for nightfall aesthetics: deep espresso tones and refined metallic golds."
            className="mb-14"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Deep Black", hex: "#080706", bg: "bg-[#080706]", border: "border-border-subtle" },
              { name: "Rich Black", hex: "#0D0B09", bg: "bg-[#0D0B09]", border: "border-border-subtle" },
              { name: "Dark Espresso", hex: "#17110C", bg: "bg-[#17110C]", border: "border-border-subtle" },
              { name: "Chocolate Black", hex: "#21160E", bg: "bg-[#21160E]", border: "border-border-subtle" },
              { name: "Primary Gold", hex: "#C8A45D", bg: "bg-[#C8A45D]", textColor: "text-brand-deep" },
              { name: "Champagne", hex: "#E2C78D", bg: "bg-[#E2C78D]", textColor: "text-brand-deep" },
              { name: "Soft Gold", hex: "#AE8847", bg: "bg-[#AE8847]", textColor: "text-brand-deep" },
              { name: "Warm Ivory", hex: "#F4EFE5", bg: "bg-[#F4EFE5]", textColor: "text-brand-deep" },
            ].map((token) => (
              <div
                key={token.name}
                className="border border-border-subtle/60 p-3 bg-brand-deep rounded-xs space-y-3"
              >
                <div
                  className={`h-16 w-full rounded-xs flex items-center justify-center ${token.bg} ${token.border || ""}`}
                >
                  <span className={`text-[10px] font-mono font-medium ${token.textColor || "text-neutral-ivory"}`}>
                    {token.hex}
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] font-medium text-neutral-ivory truncate">{token.name}</h4>
                  <p className="text-[10px] font-mono text-neutral-muted">{token.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Typography Hierarchy */}
      <section className="py-20 border-b border-border-subtle">
        <Container size="default">
          <SectionHeading
            eyebrow="Typography Hierarchy"
            heading="Editorial Serif & Geometric Sans"
            description="Pairing Cormorant Garamond for evocative, timeless headlines with Manrope for crystal-clear legibility."
            className="mb-14"
          />

          <div className="space-y-10 border border-border-subtle p-8 sm:p-12 bg-brand-rich/20 rounded-xs">
            <div className="border-b border-border-subtle/50 pb-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Display Hero / Editorial</span>
              <p className="font-serif text-4xl sm:text-5xl font-light text-neutral-ivory">
                The Intangible Chemistry of Memory
              </p>
            </div>

            <div className="border-b border-border-subtle/50 pb-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Heading 1 & 2 (Cormorant Garamond)</span>
              <p className="font-serif text-2xl sm:text-3xl font-light text-neutral-ivory">
                Rare Harvest Botanical Extracts & Absolute Distillations
              </p>
            </div>

            <div className="border-b border-border-subtle/50 pb-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Body Regular (Manrope)</span>
              <p className="text-sm sm:text-base text-neutral-muted font-light leading-relaxed max-w-3xl">
                Every olfactive formulation is crafted with disciplined restraint. High oil extraits mature in small climate-regulated vessels to achieve harmony between fleeting top accords, opulent hearts, and enduring resonant bases.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Labels & Meta (Uppercase Tracked)</span>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-champagne font-medium">
                EXTRAIT DE PARFUM • 100ML / 3.4 FL. OZ. • BATCH NO. 048-A
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Global UI Component Library Preview */}
      <section className="py-20 border-b border-border-subtle bg-brand-rich/40">
        <Container size="wide">
          <SectionHeading
            eyebrow="UI Components"
            heading="Reusable Foundation Library"
            description="The 10 foundational interface components engineered for accessible states, typed props, and luxury consistency."
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Buttons & Badges */}
            <div className="border border-border-subtle p-8 bg-brand-deep rounded-xs space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Buttons & Status Badges</span>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md">
                  Primary Gold
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Outlined
                </Button>
                <Button variant="minimal" size="md">
                  Minimal Text
                </Button>
                <Button variant="primary" size="sm" isLoading>
                  Loading State
                </Button>
                <Button variant="secondary" size="sm" disabled>
                  Disabled
                </Button>
              </div>

              <Divider variant="subtle" />

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted block">Badges</span>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="bestseller">Bestseller</Badge>
                  <Badge variant="new">New Flacon</Badge>
                  <Badge variant="limited-edition">Limited Edition</Badge>
                  <Badge variant="gold">Numbered Batch</Badge>
                  <Badge variant="outline">Extrait</Badge>
                </div>
              </div>
            </div>

            {/* Inputs & Form Labels */}
            <div className="border border-border-subtle p-8 bg-brand-deep rounded-xs space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Form Inputs & States</span>
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="test-email" required>
                    Maison Newsletter Dispatch
                  </FormLabel>
                  <Input
                    id="test-email"
                    type="email"
                    placeholder="concierge@fragology.com"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    error={inputError}
                    helperText={!inputError ? "Receive private previews of limited seasonal extraits." : undefined}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" onClick={handleValidate}>
                    Test Error State
                  </Button>
                  <Button variant="minimal" size="sm" onClick={() => { setTestInput("test@domain.com"); setInputError(""); }}>
                    Reset Valid
                  </Button>
                </div>
              </div>
            </div>

            {/* Skeleton Shimmer Loading Placeholder */}
            <div className="border border-border-subtle p-8 bg-brand-deep rounded-xs space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted">Skeleton Shimmer Placeholder</span>
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-2 flex gap-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>

            {/* Empty State Component */}
            <div className="border border-border-subtle p-6 bg-brand-deep rounded-xs">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-muted mb-4 block">Empty State Component</span>
              <EmptyState
                icon={<Compass size={22} />}
                heading="No Olfactive Matches"
                description="Your scent finder criteria yielded no exact flacon. Adjust your accord filters to explore related compositions."
                actionLabel="Reset Quiz Diagnostic"
                onAction={() => {}}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Image-Free Architecture Showcase */}
      <section className="py-20 border-b border-border-subtle">
        <Container size="wide">
          <SectionHeading
            eyebrow="Zero-Asset Architecture"
            heading="Image-Free Placeholder System"
            description="Strictly complies with Phase 1 development rules: pure CSS lighting, ambient radial textures, and gold monogram frames without requiring photography."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImagePlaceholder
              aspectRatio="portrait"
              category="Woody & Leathery"
              label="Santal Mirage"
              sublabel="Cardamom, Papyrus, Sandalwood"
            />
            <ImagePlaceholder
              aspectRatio="portrait"
              category="Oriental & Amber"
              label="Velvet Amber"
              sublabel="Bourbon Vanilla, Labdanum, Cedar"
            />
            <ImagePlaceholder
              aspectRatio="portrait"
              category="Fresh & Aquatic"
              label="Bergamot Nocturne"
              sublabel="Calabrian Bergamot, Black Tea, Fig"
            />
            <ImagePlaceholder
              aspectRatio="portrait"
              category="Limited Harvest"
              label="Oud Impérial"
              sublabel="Assam Oud, Taif Rose, Saffron"
            />
          </div>
        </Container>
      </section>

      {/* 6. Architecture Status & Quality Gates */}
      <section className="py-20 bg-brand-deep">
        <Container size="narrow" className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-subtle rounded-full bg-brand-espresso/40">
            <ShieldCheck size={14} className="text-gold-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-soft">
              Phase 1 Deliverables Verified
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory">
            Production-Ready Architecture Established
          </h3>

          <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light max-w-lg mx-auto">
            Design tokens, typography scales, responsive layout scaffolds, Supabase clients, and UI component libraries are compiled with zero TypeScript or ESLint errors.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-champagne hover:underline">
              Inspect Store Scaffolds <ArrowRight size={14} />
            </Link>
            <span className="text-neutral-muted/40">•</span>
            <Link href="/admin/login" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-champagne hover:underline">
              Admin Portal Foundation <Layers size={14} />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
