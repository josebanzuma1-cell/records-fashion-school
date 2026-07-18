"use client";

import Link from "next/link";
import { primaryNav } from "@/lib/navigation";
import { school } from "@/lib/school";
import { getLenis } from "@/lib/lenisStore";
import Magnetic from "@/components/ui/Magnetic";

const COLUMN_LABELS = [
  "The School",
  "Educational Offer",
  "Guidance",
  "Student Services",
];

const DIRECT_LINKS = [
  { label: "Research and Third Mission", href: "/research-and-third-mission" },
  { label: "Magazine", href: "/magazine/news-and-events" },
  { label: "Work with Us", href: "/work-with-us" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const columns = primaryNav.filter((s) => COLUMN_LABELS.includes(s.label));

  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t hairline bg-paper">
      <div className="mx-auto max-w-content px-6 pb-10 pt-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl uppercase tracking-[0.02em]">
              Records
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.35em] text-smoke">
              Fashion School
            </p>
            <p className="mt-4 font-serif text-xl italic text-magenta">
              {school.tagline}.
            </p>

            <address className="mt-8 font-mono text-xs not-italic leading-relaxed text-ink/70">
              {school.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 font-mono text-xs leading-relaxed text-ink/70">
              {school.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="block transition-colors hover:text-magenta"
                >
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${school.email}`}
                className="mt-1 block transition-colors hover:text-magenta"
              >
                {school.email}
              </a>
            </p>

            {/* TODO: TikTok + YouTube handles, Facebook page URL —
                those render as inert labels until confirmed. */}
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {school.socials.map((social) => (
                <li
                  key={social.name}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke"
                >
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-magenta"
                    >
                      {social.name}
                    </a>
                  ) : (
                    social.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns — same source of truth as the header */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 lg:col-span-8 lg:grid-cols-4"
          >
            {columns.map((section) => (
              <div key={section.label}>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  {section.label}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {section.children?.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="font-mono text-xs text-ink/70 transition-colors duration-300 hover:text-magenta"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Direct links + back to top */}
        <div className="mt-16 flex flex-col gap-6 border-t hairline pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {DIRECT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:text-magenta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Magnetic>
            <button
              type="button"
              onClick={backToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full border hairline font-mono text-sm transition-colors duration-300 hover:border-magenta hover:text-magenta"
              aria-label="Back to top"
            >
              ↑
            </button>
          </Magnetic>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            © 2026 {school.name} — Est. {school.foundedYear} — {school.city}
          </p>
          <a
            href={school.website}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
          >
            www.recordsfashionschool.com
          </a>
        </div>
      </div>
    </footer>
  );
}
