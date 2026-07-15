/**
 * Hero tunables — the ONLY place hero behavior is configured.
 * The central 3D subject is a swappable slot: change `subject` to any key
 * registered in HeroSubject.tsx and nothing else needs touching.
 */

export type HeroSubjectId = "dressForm";

export const heroConfig = {
  /** Active subject — see the registry in components/hero/HeroSubject.tsx. */
  subject: "dressForm" as HeroSubjectId,

  /** Auto-rotation of the subject, radians per second. */
  rotationSpeed: 0.16,

  /** Max scene tilt toward the cursor, radians. 0 disables parallax. */
  mouseParallax: 0.05,

  /**
   * Poster still: shown on mobile, under prefers-reduced-motion, when WebGL
   * is unavailable, and while the canvas warms up.
   * // TODO: replace with real atelier photograph from the client.
   */
  posterSrc: "/hero-poster.svg",

  /** Hero palette — mirrors the tailwind tokens (see tailwind.config.ts). */
  palette: {
    navy: "#1B2A4A",
    navyDeep: "#10182B",
    mahogany: "#6E3D25",
    brass: "#C08A3E",
    cream: "#E9E1D0",
    keyLight: "#FFD9A3",
    fillLight: "#A9BCD8",
    rimLight: "#F4C98A",
  },
} as const;
