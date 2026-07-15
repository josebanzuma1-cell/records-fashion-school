/**
 * Single source of truth for the site's information architecture.
 * Consumed by: header mega-menu, mobile accordion, footer columns,
 * and the stub-route generator in app/[...slug]/page.tsx.
 *
 * // TODO: trim or rename sections that don't apply to Records Fashion
 * // School — this mirrors the reference site's full IA; confirm which
 * // sections actually exist before writing final copy.
 */

export type NavLink = {
  label: string;
  href: string;
  /** One level of nesting only (e.g. People → Professors, Alumni). */
  children?: NavLink[];
};

export type NavSection = {
  label: string;
  /** Present only on direct links (sections without children). */
  href?: string;
  children?: NavLink[];
};

export const primaryNav: NavSection[] = [
  {
    label: "The School",
    children: [
      { label: "About Us", href: "/the-school/about-us" },
      {
        label: "Why Records Fashion School",
        href: "/the-school/why-records-fashion-school",
      },
      {
        label: "International Relations",
        href: "/the-school/international-relations",
      },
      { label: "Student Experience", href: "/the-school/student-experience" },
      {
        label: "Companies and Partners",
        href: "/the-school/companies-and-partners",
      },
      {
        label: "People",
        href: "/the-school/people",
        children: [
          { label: "Professors", href: "/the-school/people/professors" },
          { label: "Alumni", href: "/the-school/people/alumni" },
        ],
      },
      {
        label: "Governance, Transparency and Regulation",
        href: "/the-school/governance-transparency-and-regulation",
      },
      {
        label: "Certifications and Recognitions",
        href: "/the-school/certifications-and-recognitions",
      },
      {
        label: "The Sustainability Manifesto",
        href: "/the-school/the-sustainability-manifesto",
      },
    ],
  },
  {
    label: "Educational Offer",
    children: [
      { label: "Foundation Course", href: "/educational-offer/foundation-course" },
      { label: "Undergraduate", href: "/educational-offer/undergraduate" },
      { label: "Postgraduate", href: "/educational-offer/postgraduate" },
      {
        label: "Professional Courses",
        href: "/educational-offer/professional-courses",
      },
      { label: "Startup Incubator", href: "/educational-offer/startup-incubator" },
      { label: "Short Courses", href: "/educational-offer/short-courses" },
      { label: "Summer Courses", href: "/educational-offer/summer-courses" },
    ],
  },
  {
    label: "Guidance",
    children: [
      { label: "Open Day", href: "/guidance/open-day" },
      { label: "Creative Experience", href: "/guidance/creative-experience" },
      { label: "Open Lectures", href: "/guidance/open-lectures" },
      { label: "Admission", href: "/guidance/admission" },
      {
        label: "Financial Aid and Scholarships",
        href: "/guidance/financial-aid-and-scholarships",
      },
      {
        label: "Fees and Contributions",
        href: "/guidance/fees-and-contributions",
      },
    ],
  },
  {
    label: "Student Services",
    children: [
      { label: "Academic Calendar", href: "/student-services/academic-calendar" },
      { label: "Library", href: "/student-services/library" },
      { label: "Career Service", href: "/student-services/career-service" },
      { label: "Student Support", href: "/student-services/student-support" },
      {
        label: "International Students",
        href: "/student-services/international-students",
      },
      { label: "Language Courses", href: "/student-services/language-courses" },
    ],
  },
  {
    label: "Research and Third Mission",
    href: "/research-and-third-mission",
  },
  {
    label: "Magazine",
    children: [
      { label: "News and Events", href: "/magazine/news-and-events" },
      { label: "Projects", href: "/magazine/projects" },
      { label: "Publications", href: "/magazine/publications" },
    ],
  },
  {
    label: "Work with Us",
    href: "/work-with-us",
  },
];

/** Top utility bar, above the primary nav. */
export const utilityNav: NavLink[] = [
  { label: "Open Day", href: "/guidance/open-day" },
  { label: "Contact Us", href: "/contact" },
];

/** Routes that exist outside the primary nav tree. */
const standaloneRoutes: NavLink[] = [{ label: "Contact Us", href: "/contact" }];

export type RouteEntry = {
  href: string;
  label: string;
  /** Breadcrumb-ish context, e.g. "The School / People". */
  section: string;
};

/** Every routable page in the IA, flattened (excluding "/"). */
export function allRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];

  const walk = (links: NavLink[], trail: string[]) => {
    for (const link of links) {
      routes.push({
        href: link.href,
        label: link.label,
        section: trail.join(" / "),
      });
      if (link.children) walk(link.children, [...trail, link.label]);
    }
  };

  for (const section of primaryNav) {
    if (section.children) {
      walk(section.children, [section.label]);
    } else if (section.href) {
      routes.push({ href: section.href, label: section.label, section: "" });
    }
  }

  for (const route of standaloneRoutes) {
    routes.push({ href: route.href, label: route.label, section: "" });
  }

  // De-dupe (Open Day appears in both utility + Guidance, etc.)
  const seen = new Set<string>();
  return routes.filter((r) =>
    seen.has(r.href) ? false : (seen.add(r.href), true),
  );
}

export function getRouteEntry(pathname: string): RouteEntry | undefined {
  return allRoutes().find((r) => r.href === pathname);
}
