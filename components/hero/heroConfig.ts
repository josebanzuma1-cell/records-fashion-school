/**
 * Hero image-loop tunables — the ONLY place hero content/timing is
 * configured. Five slides crossfade in this exact order on a timer;
 * hovering the hero pauses the cycle, and the dots let a visitor jump
 * straight to one or step through manually.
 *
 * Real garment photography, sourced from the school's own Instagram
 * archive. To reorder, add, or remove slides, edit this array only.
 */

export type HeroSlide = {
  src: string;
  /** Read by screen readers via the matching pagination dot, not the image itself. */
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/hero/hero-01.jpg",
    alt: "Tailor's dress form in navy pinstripe wool, wrapped in a cream measuring tape",
  },
  {
    src: "/hero/hero-02.jpg",
    alt: "Sculptural orange shell headpiece and gown",
  },
  {
    src: "/hero/hero-03.jpg",
    alt: "Maroon checkerboard coat with a draped silver fringe panel",
  },
  {
    src: "/hero/hero-04.jpg",
    alt: "Sculptural grey and black caged silhouette with wing shoulders, back view",
  },
  {
    src: "/hero/hero-05.jpg",
    alt: "Sculptural grey and black caged silhouette with wing shoulders, front view",
  },
];

/** Milliseconds each slide holds before crossfading to the next. */
export const heroIntervalMs = 5200;

/** Crossfade duration — keep in sync with the duration-[…] class on the img layer. */
export const heroTransitionMs = 1400;
