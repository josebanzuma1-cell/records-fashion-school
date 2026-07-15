import type { Config } from "tailwindcss";

/**
 * Design tokens — single source of truth for color + type.
 * Mirrored as CSS vars in app/globals.css for non-Tailwind consumers
 * (e.g. the 3D hero palette in components/hero/heroConfig.ts).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2F0EB",
        ink: "#14161A",
        navy: "#1B2A4A",
        mahogany: "#6E3D25",
        brass: "#C08A3E",
        cream: "#E9E1D0",
        smoke: "#8A8A86",
        // Real brand accent from the school's logo/brochure (July 2026):
        // magenta is now the PRIMARY UI accent; brass stays as the warm
        // support tone carried by imagery and the 3D atelier light.
        magenta: "#C01D63",
        // Logo support color — reserved, use sparingly (one accent at a time).
        teal: "#1F6F6D",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
