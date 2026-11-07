# FRAGOLOGY — Luxury Perfume E-Commerce Platform

> **Haute Parfumerie & Olfactive Architecture**  
> Technical Foundation, Architectural Scaffold & Luxury Design System (Phase 1 & 2 Complete)

---

## 1. Project Overview

**FRAGOLOGY** is an international luxury e-commerce platform dedicated to artisanal perfumery, rare botanical extraits, and bespoke olfactive journeys. 

- **Phase 1**: Architectural foundation, centralized design tokens, typography scale, 11 reusable UI components, and App Router structure.
- **Phase 2**: Full luxury perfume storefront homepage with 8 content sections, global Announcement Bar, sticky Header, responsive Mobile Navigation Drawer, reusable Product Cards, Scent Family Cards, and complete Global Footer.

---

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with centralized CSS custom properties
- **Typography**: Google Fonts via `next/font/google` (`Cormorant Garamond` & `Manrope`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation Ready**: [Framer Motion](https://www.framer.com/motion/)
- **Class Utilities**: `clsx`, `tailwind-merge`
- **Backend Ready**: [Supabase](https://supabase.com/) SSR Client & Edge Functions architecture prepared

---

## 3. Brand Identity & Design System

FRAGOLOGY adheres to a disciplined nightfall aesthetic: deep black canvas surfaces, rich espresso undertones, refined metallic golds, and champagne highlights.

### Centralized Color Palette

| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| **Deep Black** | `#080706` | Main Canvas Background |
| **Rich Black** | `#0D0B09` | Elevated Card Surfaces |
| **Dark Espresso** | `#17110C` | Accent Surfaces & Skeletons |
| **Chocolate Black** | `#21160E` | Deep Contrast Sections |
| **Primary Gold** | `#C8A45D` | Brand Accents, Primary CTA |
| **Champagne Gold** | `#E2C78D` | Highlights, Eyebrow Text |
| **Soft Gold** | `#AE8847` | Secondary Gold Borders |
| **Muted Gold** | `#80633B` | Subtle Subtitles & Accents |
| **Warm Ivory** | `#F4EFE5` | Primary High-Legibility Text |
| **Soft White** | `#EAE4D9` | Secondary Headings & Labels |
| **Muted Text** | `#AFA497` | Supporting Descriptions |
| **Subtle Border** | `rgba(200, 164, 93, 0.22)` | Elegant Gold Divider Lines |

---

## 4. Homepage Sections (Phase 2)

1. **Announcement Bar**: Slim promotional strip at the top with configurable text and subtle gold dots.
2. **Global Navigation & Mobile Drawer**: Sticky header with brand wordmark (`FRAGOLOGY`), desktop links with smooth anchor scrolling, action icon buttons (with informative phase notices), and accessible mobile drawer menu.
3. **Hero Section**: Cinematic headline *"THE ESSENCE OF NATURE, BOTTLED."*, luxury perfume flacon presentation, and smooth anchor navigation.
4. **Brand Benefits Strip**: Three brand pillars (Carefully Composed Fragrances, Distinctive Scent Profiles, Crafted for Lasting Impressions) with subtle gold dividers.
5. **Featured Fragrances**: Four luxury flacons in a responsive grid (*Golden Reverie*, *Velvet Essence*, *Amber Dusk*, *Midnight Bloom*) with interactive Quick View modal and Wishlist toggle.
6. **Shop by Fragrance Family**: Four olfactive families (*Floral*, *Woody*, *Oriental*, *Fresh*) with ambient color glows.
7. **Brand Story / Manifesto**: Editorial split-screen composition *"MORE THAN A SCENT. AN EXPRESSION OF YOU."*
8. **Signature Collection Banner**: Full-width promotional banner with ambient gold lighting.
9. **Craftsmanship & Brand Values**: Three core principles (*Thoughtful Composition*, *Distinctive Character*, *Timeless Expression*).
10. **Newsletter Subscription**: Accessible input with client-side format validation, error handling, and demonstration feedback.
11. **Global Footer**: Four structured columns, back-to-top button with smooth scroll, and reserved payment encryption badges.

---

## 5. Getting Started

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd fragology

# Install dependencies
npm install
```

### Local Development
```bash
# Start the local development server
npm run dev
```

Visit `http://localhost:3000` to explore the Fragology Storefront.

### Quality Verification
```bash
# TypeScript compilation check
npx tsc --noEmit

# ESLint validation
npm run lint

# Production build check
npm run build
```

---

## 6. Verification Status

- [x] Next.js App Router & React 19 architecture verified.
- [x] Deep Black & Metallic Gold design tokens centralized.
- [x] Typography system configured with `Cormorant Garamond` and `Manrope`.
- [x] 11 reusable UI components tested with zero console warnings.
- [x] All 8 homepage sections and shared layout components built and verified.
- [x] Zero-image development compliance fulfilled with CSS lighting and flacon silhouettes.
- [x] TypeScript strict compilation verified with 0 errors.
- [x] ESLint rules passing with 0 warnings.
- [x] Production build confirmed (35/35 static/dynamic pages).
