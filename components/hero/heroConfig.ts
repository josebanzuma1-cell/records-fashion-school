/**
 * Hero image-loop tunables — the ONLY place hero content/timing is
 * configured. Five slides crossfade in this exact order on a timer;
 * hovering the hero pauses the cycle, and the dots let a visitor jump
 * straight to one or step through manually.
 *
 * // TODO: swap each placeholder SVG below for the matching garment
 * // photograph, keeping the exact filename (hero-01.svg … hero-05.svg
 * // under public/hero/, or update the src here) — no code changes
 * // needed beyond the file itself. See each placeholder's caption for
 * // which real photo belongs in that slot.
 */

export type HeroSlide = {
  src: string;
  /** Read by screen readers via the matching pagination dot, not the image itself. */
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/hero/hero-01.svg",
    alt: "Tailor's dress form in navy pinstripe wool, wrapped in a cream measuring tape",
  },
  {
    src: "/hero/hero-02.svg",
    alt: "Sculptural orange shell headpiece and gown",
  },
  {
    src: "/hero/hero-03.svg",
    alt: "Maroon checkerboard coat with a draped silver fringe panel",
  },
  {
    src: "/hero/hero-04.svg",
    alt: "Sculptural grey and black caged silhouette with wing shoulders, back view",
  },
  {
    src: "/hero/hero-05.svg",
    alt: "Sculptural grey and black caged silhouette with wing shoulders, front view",
  },
];

/** Milliseconds each slide holds before crossfading to the next. */
export const heroIntervalMs = 5200;

/** Crossfade duration — keep in sync with the duration-[…] class on the img layer. */
export const heroTransitionMs = 1400;
