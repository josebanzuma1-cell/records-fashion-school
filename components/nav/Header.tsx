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
          ? openMenu
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
        <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-4 lg:px-12">
          {/* Wordmark — crest + set type, so the name stays legible at header
              scale even though the illustrated crest doesn't (it's full of
              fine linework meant for print size). */}
          <Link href="/" className="group flex shrink-0 items-center gap-3 leading-none">
            <img
              src="/logo.png"
              alt=""
              width={88}
              height={101}
              className="h-10 w-auto shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] lg:h-11"
            />
            <span>
              <span className="block font-display text-xl uppercase tracking-[0.02em]">
                Records
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.35em] text-smoke transition-colors duration-300 group-hover:text-magenta">
                Fashion School
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-4 xl:gap-6">
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
                      className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-magenta xl:text-[11px] ${
                        openMenu === section.label ? "text-magenta" : ""
                      }`}
                    >
                      {section.label}
                    </button>
                  ) : (
                    <Link
                      href={section.href!}
                      className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-magenta xl:text-[11px]"
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
