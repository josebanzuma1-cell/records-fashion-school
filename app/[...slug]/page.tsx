import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRoutes, getRouteEntry } from "@/lib/navigation";

/**
 * Stub renderer for every route in the IA (lib/navigation.ts is the source
 * of truth). Each page will graduate to its own real route as content lands.
 */

type Params = { slug: string[] };

/** Routes that have graduated to real dedicated pages under app/. */
const DEDICATED = new Set(["/the-school/about-us", "/contact"]);

export function generateStaticParams(): Params[] {
  return allRoutes()
    .filter((route) => !DEDICATED.has(route.href))
    .map((route) => ({
      slug: route.href.slice(1).split("/"),
    }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getRouteEntry(`/${slug.join("/")}`);
  return { title: entry?.label ?? "Records Fashion School" };
}

export default async function StubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getRouteEntry(`/${slug.join("/")}`);
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-content px-6 pb-[16vh] pt-48 lg:px-12">
      <p className="eyebrow">
        — {entry.section ? `${entry.section}` : "Records Fashion School"}
      </p>
      <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.25rem,6vw,5.5rem)] uppercase leading-[0.95] tracking-[0.02em]">
        {entry.label}
      </h1>
      <p className="mt-10 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
        {/* TODO: replace with real content */}
        This page is being tailored. Content for “{entry.label}” arrives with
        the next fitting.
      </p>
      <Link
        href="/"
        className="mt-12 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
      >
        ← Back to home
      </Link>
    </div>
  );
}
