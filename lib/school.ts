/**
 * Brand + contact facts — single source of truth, extracted verbatim from the
 * school's official brochures (July 2026). Update here, never inline.
 */
export const school = {
  name: "Records Fashion School",
  tagline: "Skills for Life",
  city: "Kampala, Uganda",
  addressLines: [
    "Lower Katwe, along Muteesa I Road",
    "Tezira House, Second Floor",
    "Kampala, Uganda",
  ],
  phones: ["+256 (0) 701 316 907", "+256 (0) 784 005 899"],
  email: "info@recordsfashionschool.com",
  website: "https://www.recordsfashionschool.com",
  /** // TODO: get the exact handle/URL for each social account. */
  socials: ["Facebook", "X (Twitter)", "Instagram", "TikTok", "YouTube"],

  /** Brand statements — the school's own words (brochure "Brief"). */
  mission:
    "To nurture and develop passionate people into professional fashion designers, with an artistic perspective that meets the evolving demands of the design market.",
  vision:
    "To become recognised and ranked the best fashion and design university in Africa.",
  promise:
    "To impart entrepreneurial skills and attitude to enhance the productivity and competitiveness of the youth in the fashion and design industry.",
  positioning:
    "We re-imagine the world based on artistry and mastery as essential tools for success in quality design to shape the future.",

  /** Flyer headline + enrollment banner. */
  flyerHeadline: "Unlock your creativity. Learn from the best. Kickstart your career.",
  enrollmentBanner: "Fashion Design — Enrollment Open",
} as const;
