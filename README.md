# FRAGOLOGY — Luxury Perfume E-Commerce Platform

> **Haute Parfumerie & Olfactive Architecture**  
> Technical Foundation, Architectural Scaffold, Luxury Design System & Complete Storefront (Phases 1, 2 & 3 Complete)

---

## 1. Project Overview

**FRAGOLOGY** is an international luxury e-commerce platform dedicated to artisanal perfumery, rare botanical extraits, and bespoke olfactive journeys. 

- **Phase 1**: Architectural foundation, centralized design tokens, typography scale, 11 reusable UI components, and App Router structure.
- **Phase 2**: Complete homepage with 8 content sections, Announcement Bar, sticky Header, mobile drawer, and global Footer.
- **Phase 3**: Complete customer-facing storefront comprising all 14 primary routes, dynamic product pages, dynamic collection templates, dynamic editorial articles, client-side catalogue search/filter/sort, interactive Scent Finder diagnostic, and policy documents.

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

## 3. Customer-Facing Routes (Phase 3)

| # | Route | Template & Scope | Status |
|---|---|---|---|
| 1 | `/shop` | Catalogue with search, multi-filter (family, concentration, price, stock), and sorting | Completed |
| 2 | `/products/[slug]` | Dynamic product template with gallery, 30/50/100ml variants, notes pyramid, story, specs | Completed |
| 3 | `/collections` | Curated anthology listing all 6 maison collections | Completed |
| 4 | `/collections/[slug]` | Dynamic collection detail template displaying only associated flacons with sorting | Completed |
| 5 | `/about` | Editorial brand manifesto, philosophy, maison standards, and values | Completed |
| 6 | `/contact` | Concierge inquiries with client-side field validation and demonstration feedback | Completed |
| 7 | `/faq` | Interactive accessible accordions covering 6 client care categories | Completed |
| 8 | `/journal` | Editorial gazette with category filtering and featured essay presentation | Completed |
| 9 | `/journal/[slug]` | Dynamic editorial article template with blockquotes, lead paragraphs, and related essays | Completed |
| 10 | `/scent-finder` | 5-step diagnostic quiz with deterministic client-side recommendation engine | Completed |
| 11 | `/privacy-policy` | Structured data governance template with table of contents and back-to-top | Completed |
| 12 | `/terms` | Terms of service template with commercial disclaimers | Completed |
| 13 | `/shipping-policy` | Climate-insulated delivery standards and international shipping guidance | Completed |
| 14 | `/returns-refunds` | 30-day return policy and exterior skin-test vial guarantee terms | Completed |

---

## 4. Getting Started

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

Visit `http://localhost:3000` to explore the complete Fragology storefront.

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

## 5. Verification Status

- [x] All 14 customer-facing storefront routes fully functional.
- [x] Dynamic product routes (`/products/[slug]`) and collection routes (`/collections/[slug]`) tested.
- [x] Client-side catalogue search, multi-filtering, and price sorting verified.
- [x] 5-step Scent Finder recommendation algorithm verified deterministically.
- [x] Zero-asset compliance maintained with CSS flacons, ambient lighting, and placeholder containers.
- [x] Strict TypeScript compilation verified (0 errors).
- [x] ESLint rules passing (0 errors, 0 warnings).
- [x] Production build confirmed (35/35 routes).
