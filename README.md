# FRAGOLOGY — Luxury Perfume E-Commerce Platform

> **Haute Parfumerie & Olfactive Architecture**  
> Technical Foundation, Architectural Scaffold & Luxury Design System (Phase 1)

---

## 1. Project Overview

**FRAGOLOGY** is an international luxury e-commerce platform dedicated to artisanal perfumery, rare botanical extraits, and bespoke olfactive journeys. 

Phase 1 establishes the production-grade architecture, typography scale, centralized design tokens, reusable UI component library, and responsive foundations necessary to power the complete customer boutique and administrative management suite without structural refactoring in subsequent phases.

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

## 4. Typography Scale

- **Headings & Display**: `Cormorant Garamond` (`var(--font-serif)`)
- **Body & Controls**: `Manrope` (`var(--font-sans)`)
- **Wordmark**: `FRAGOLOGY` in uppercase serif with tracking `0.28em`

---

## 5. Global Reusable UI Components (`src/components/ui/`)

1. **`Button`**: Primary Gold, Secondary Outlined, Minimal Text, Disabled & Loading states.
2. **`Container`**: Responsive max-width wrappers (`narrow`, `default`, `wide`, `full`).
3. **`SectionHeading`**: Eyebrow label, serif heading, optional body description, and alignment.
4. **`IconButton`**: Accessible button with optional notification/cart count badge.
5. **`Badge`**: Status indicators (`new`, `bestseller`, `limited-edition`, `outline`, `gold`).
6. **`Divider`**: Subtle gold line with optional rotated diamond emblem or label.
7. **`Input`**: Form inputs with focus glow, validation errors, and dark luxury surfaces.
8. **`FormLabel`**: Consistent uppercase typography with accessible `htmlFor` and required markers.
9. **`Skeleton`**: Shimmer loading placeholder with espresso gradient sweep.
10. **`EmptyState`**: Curated fallback state with icon, title, description, and action button.
11. **`ImagePlaceholder`**: Image-free placeholder with pure CSS ambient lighting and gold monograms.

---

## 6. Directory Structure

```
fragology/
├── public/
│   ├── images/ (hero, products, collections, journal, banners)
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (store)/                 # 20 Customer-facing boutique routes
│   │   ├── (admin)/admin/           # 12 Admin panel modules
│   │   ├── layout.tsx               # Root layout & font orchestration
│   │   ├── globals.css              # Central design tokens & CSS variables
│   │   ├── loading.tsx              # Global luxury spinner
│   │   ├── error.tsx                # Error boundary handler
│   │   ├── not-found.tsx            # 404 handler
│   │   ├── sitemap.ts               # Dynamic sitemap configuration
│   │   └── robots.ts                # SEO crawler directives
│   ├── components/
│   │   ├── ui/                      # 11 reusable design system components
│   │   └── layout/                  # Luxury Header & Footer
│   ├── lib/
│   │   ├── supabase/                # Browser and Server clients
│   │   ├── utils.ts                 # Class merging & formatters
│   │   ├── constants.ts             # Brand constants
│   │   └── validations.ts           # Zod schemas
│   ├── types/                       # Shared TypeScript definitions
│   └── config/                      # Site configuration
├── supabase/
│   ├── migrations/                  # Database migration scaffolds
│   └── functions/                   # 4 Edge function scaffolds
├── .env.example
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

---

## 7. Getting Started

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

Visit `http://localhost:3000` to explore the Phase 1 Foundation & Luxury Design System.

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

## 8. Phase 1 Verification Status

- [x] Next.js App Router & React 19 architecture verified.
- [x] Deep Black & Metallic Gold design tokens centralized in `globals.css` and `tailwind.config.ts`.
- [x] Typography system configured with `Cormorant Garamond` and `Manrope`.
- [x] 11 reusable UI components tested with zero console warnings.
- [x] Responsive layout with desktop navigation and mobile drawer menu.
- [x] Zero-image development compliance fulfilled with CSS lighting and fallback placeholders.
- [x] TypeScript strict compilation verified with 0 errors.
- [x] ESLint rules passing.
- [x] Production build confirmed.
