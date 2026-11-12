import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fragology | Luxury Fragrances & Artisanal Perfumery",
    template: "%s | Fragology",
  },
  description:
    "Discover refined fragrances crafted for individuality, elegance, and timeless expression. A luxury olfactive house.",
  keywords: [
    "luxury perfume",
    "fragology",
    "niche fragrance",
    "extrait de parfum",
    "artisanal scent",
    "bespoke perfumery",
  ],
  authors: [{ name: "Fragology Maison" }],
  creator: "Fragology",
  publisher: "Fragology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fragology.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Fragology",
    title: "Fragology | Luxury Fragrances & Artisanal Perfumery",
    description:
      "Discover refined fragrances crafted for individuality, elegance, and timeless expression.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fragology | Luxury Fragrances",
    description:
      "Discover refined fragrances crafted for individuality, elegance, and timeless expression.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#17110C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-brand-deep text-neutral-ivory font-sans antialiased selection:bg-gold-primary/20 selection:text-neutral-ivory">
        {children}
      </body>
    </html>
  );
}
