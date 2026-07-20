"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, utilityNav } from "@/lib/navigation";
import { school } from "@/lib/school";
import { EASE, DUR } from "@/lib/motion";

type MobileMenuProps = {
  onClose: () => void;
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.micro, ease: EASE }}
      className="fixed inset-0 z-40 overflow-y-auto bg-paper pb-16 pt-36 text-ink xl:hidden"
      data-cursor-theme="light"
      data-lenis-prevent
    >
      <nav aria-label="Mobile" className="px-6">
        <ul className="divide-y divide-ink/[0.12] border-y hairline">
          {primaryNav.map((section) =>
            section.children ? (
              <li key={section.label}>
                <button
                  type="button"
                  aria-expanded={openSection === section.label}
                  onClick={() =>
                    setOpenSection(
                      openSection === section.label ? null : section.label,
                    )
                  }
                  className="flex w-full items-center justify-between py-4 font-mono text-sm uppercase tracking-[0.15em]"
                >
                  {section.label}
                  <span
                    aria-hidden
                    className={`text-smoke transition-transform duration-300 ${
                      openSection === section.label ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openSection === section.label && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DUR.micro, ease: EASE }}
                      className="overflow-hidden"
                    >
                      {section.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-2 pl-4 font-mono text-xs uppercase tracking-[0.1em] text-ink/70 transition-colors hover:text-magenta"
                          >
                            {child.label}
                          </Link>
                          {child.children && (
                            <ul>
                              {child.children.map((grandchild) => (
                                <li key={grandchild.href}>
                                  <Link
                                    href={grandchild.href}
                                    onClick={onClose}
                                    className="block py-2 pl-8 font-mono text-xs uppercase tracking-[0.1em] text-smoke transition-colors hover:text-magenta"
                                  >
                                    {grandchild.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li aria-hidden className="pb-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={section.label}>
                <Link
                  href={section.href!}
                  onClick={onClose}
                  className="block py-4 font-mono text-sm uppercase tracking-[0.15em] transition-colors hover:text-magenta"
                >
                  {section.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="mt-8 flex flex-wrap gap-6">
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] leading-relaxed text-smoke">
          {school.email}
          <br />
          {school.phones.join(" · ")}
        </p>
      </nav>
    </motion.div>
  );
}
