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
          deep: "#080706",
          rich: "#0D0B09",
          espresso: "#17110C",
          chocolate: "#21160E",
        },
        gold: {
          primary: "#C8A45D",
          champagne: "#E2C78D",
          soft: "#AE8847",
          muted: "#80633B",
        },
        neutral: {
          ivory: "#F4EFE5",
          soft: "#EAE4D9",
          muted: "#AFA497",
        },
        surface: {
          subtle: "rgba(200, 164, 93, 0.05)",
          card: "#0D0B09",
          elevated: "#17110C",
        },
        border: {
          subtle: "rgba(200, 164, 93, 0.22)",
          gold: "rgba(200, 164, 93, 0.45)",
          muted: "rgba(175, 164, 151, 0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.25em",
        epic: "0.35em",
      },
      boxShadow: {
        "gold-subtle": "0 4px 20px -2px rgba(200, 164, 93, 0.12)",
        "gold-glow": "0 0 30px rgba(200, 164, 93, 0.2)",
        "luxury-card": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E2C78D 0%, #C8A45D 50%, #AE8847 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(200, 164, 93, 0.15), transparent)",
        "dark-radial": "radial-gradient(circle at 50% 20%, #17110C 0%, #080706 70%)",
        "card-ambient": "radial-gradient(ellipse at top, rgba(200, 164, 93, 0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
