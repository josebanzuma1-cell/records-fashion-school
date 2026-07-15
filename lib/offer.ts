import { primaryNav } from "./navigation";

export type Course = {
  label: string;
  href: string;
  image: string;
};

/**
 * Course cards for the Educational Offer section — derived from the nav IA
 * so the two can never drift. Images are placeholders.
 * // TODO: replace with real course photography.
 */
export const courses: Course[] = (
  primaryNav.find((s) => s.label === "Educational Offer")?.children ?? []
).map((child) => ({
  label: child.label,
  href: child.href,
  image: `/courses/${child.href.split("/").pop()}.svg`,
}));
