/** Central motion constants — no magic numbers in components. */

/** Framer Motion cubic-bezier — the one easing curve of the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** GSAP equivalent of EASE. */
export const GSAP_EASE = "power3.out";

/** Durations in seconds. */
export const DUR = {
  micro: 0.3,
  standard: 0.7,
  hero: 1.2,
} as const;

/** Default stagger between sibling reveals, seconds. */
export const STAGGER = 0.08;
