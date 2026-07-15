export type NewsPost = {
  date: string; // ISO
  category: "News" | "Events" | "Projects";
  title: string;
  image: string;
  href: string;
};

/**
 * Placeholder magazine posts. // TODO: replace with real content.
 */
export const newsPosts: NewsPost[] = [
  {
    date: "2026-07-10",
    category: "News",
    title: "Fashion Design enrollment opens for the new intake",
    image: "/news/news-01.svg",
    href: "/magazine/news-and-events",
  },
  {
    date: "2026-06-28",
    category: "Events",
    title: "Open Day: inside the Tezira House atelier",
    image: "/news/news-02.svg",
    href: "/magazine/news-and-events",
  },
  {
    date: "2026-06-12",
    category: "Projects",
    title: "Student capsule: re-imagining the kitenge silhouette",
    image: "/news/news-03.svg",
    href: "/magazine/projects",
  },
];

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, "/");
}
