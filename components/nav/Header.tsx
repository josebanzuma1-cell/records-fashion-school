"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { primaryNav } from "@/lib/navigation";
import UtilityBar from "./UtilityBar";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import PillLink from "@/components/ui/PillLink";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Fixed header: transparent (paper text) over the dark home hero,
 * solid paper + ink everywhere else and once scrolled.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || openMenu !== null || mobileOpen || !isHome;
  const dark = !solid;
  const activeSection = primaryNav.find((s) => s.label === openMenu);

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      data-cursor-theme={dark ? "dark" : "light"}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        dark ? "text-paper" : "text-ink"
      } ${
        solid
          ? // No backdrop-blur while an overlay is open: backdrop-filter makes
            // the header a containing block, which would trap the fixed
            // mobile menu at header height (breaking its scroll).
            openMenu || mobileOpen
            ? "bg-paper"
            : "bg-paper/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <UtilityBar dark={dark} collapsed={scrolled} />

      <div
        className={`border-b transition-colors duration-500 ${
          solid ? "hairline" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-4 lg:px-12">
          {/* Wordmark — crest + set type on a maroon brand plate (deep
              gown-shadow tone from the crest itself), so the lockup reads
              identically over the dark hero and the solid paper header. */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 bg-maroon px-3 py-2 leading-none transition-colors duration-300 hover:bg-ink sm:px-4"
          >
            <img
              src="/logo.png"
              alt=""
              width={88}
              height={101}
              className="h-9 w-auto shrink-0"
            />
            <span>
              <span className="block font-display text-lg uppercase tracking-[0.02em] text-paper lg:text-xl">
                Records
              </span>
              <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.3em] text-cream/70 transition-colors duration-300 group-hover:text-cream lg:text-[9px]">
                Fashion School
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-3.5 2xl:gap-6">
              {primaryNav.map((section) => (
                <li
                  key={section.label}
                  onMouseEnter={() =>
                    setOpenMenu(section.children ? section.label : null)
                  }
                >
                  {section.children ? (
                    <button
                      type="button"
                      aria-expanded={openMenu === section.label}
                      aria-controls={`mega-${section.label
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      onClick={() =>
                        setOpenMenu(
                          openMenu === section.label ? null : section.label,
                        )
                      }
                      className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-magenta 2xl:text-[11px] 2xl:tracking-[0.15em] ${
                        openMenu === section.label ? "text-magenta" : ""
                      }`}
                    >
                      {section.label}
                    </button>
                  ) : (
                    <Link
                      href={section.href!}
                      className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-magenta 2xl:text-[11px] 2xl:tracking-[0.15em]"
                    >
                      {section.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 xl:block">
            <Magnetic strength={0.25}>
              <PillLink href="/apply">Enroll Now</PillLink>
            </Magnetic>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Desktop mega-menu panel */}
      <AnimatePresence>
        {activeSection?.children && (
          <MegaMenu
            section={activeSection}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
