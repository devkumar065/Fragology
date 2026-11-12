import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#17110C",        // Main background (75% warm dark brown)
          rich: "#241A12",        // Alternate sections
          espresso: "#17110C",    // Main background alias
          chocolate: "#33251A",   // Product cards / elevated surface
          card: "#33251A",        // Product cards
          alternate: "#241A12",   // Alternate sections
          ivory: "#EDE3D4",       // Warm ivory for editorial sections (20%)
          dark: "#17110C",        // Dark brown typography for ivory
        },
        gold: {
          primary: "#C6A467",     // Gold accents (5%)
          champagne: "#E0C99A",   // Champagne gold
          soft: "#AC8B50",        // Soft antique gold
          muted: "#80633B",       // Muted gold
        },
        neutral: {
          ivory: "#F1E8DA",       // Main headings
          soft: "#EDE3D4",        // Warm ivory / soft cream
          muted: "#CBBDAA",       // Paragraph text
        },
        surface: {
          subtle: "rgba(198, 164, 103, 0.06)",
          card: "#33251A",        // Product cards
          elevated: "#33251A",
          ivory: "#EDE3D4",       // Warm ivory editorial surface
        },
        border: {
          subtle: "#57432B",      // Borders
          gold: "#C6A467",        // Gold border
          muted: "rgba(87, 67, 43, 0.6)",
        },
      },
      fontFamily: {
        serif: ["'CleanNumbers'", "var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["'CleanNumbers'", "var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        numbers: ["'CleanNumbers'", "var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        script: ["'Snell Roundhand'", "'Great Vibes'", "'Alex Brush'", "cursive"],
      },
      letterSpacing: {
        luxury: "0.25em",
        epic: "0.35em",
      },
      boxShadow: {
        "gold-subtle": "0 4px 20px -2px rgba(198, 164, 103, 0.15)",
        "gold-glow": "0 0 30px rgba(198, 164, 103, 0.25)",
        "luxury-card": "0 10px 30px -10px rgba(23, 17, 12, 0.8)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E0C99A 0%, #C6A467 50%, #AC8B50 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(198, 164, 103, 0.18), transparent)",
        "dark-radial": "radial-gradient(circle at 50% 20%, #241A12 0%, #17110C 70%)",
        "card-ambient": "radial-gradient(ellipse at top, rgba(198, 164, 103, 0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
