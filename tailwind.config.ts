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
        fragrance: {
          dark: "#1A1918",
          gold: "#D4AF37",
          cream: "#FAF8F5",
          sand: "#EFECE6",
          charcoal: "#2E2D2B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
