"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NavSection } from "@/lib/navigation";
import { EASE, DUR } from "@/lib/motion";

type MegaMenuProps = {
  section: NavSection;
  onClose: () => void;
};

/** Panel wipes open top-to-bottom, then links cascade in. */
const panelVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: { duration: DUR.micro, ease: EASE },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/**
 * Desktop mega-menu. Compact by design: three link columns from lg up so
 * every section — including The School's nine children — fits in view
 * without scrolling. (A max-height guard covers very short windows.)
 */
export default function MegaMenu({ section, onClose }: MegaMenuProps) {
  return (
    <motion.div
      id={`mega-${section.label.replace(/\s+/g, "-").toLowerCase()}`}
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute inset-x-0 top-full max-h-[calc(100dvh-96px)] overflow-y-auto border-b border-t bg-paper text-ink hairline"
      data-lenis-prevent
    >
      <div className="mx-auto grid max-w-content grid-cols-12 gap-8 px-6 pb-10 pt-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          className="col-span-3"
        >
          <p className="eyebrow">— Menu</p>
          <p className="mt-3 font-display text-xl uppercase leading-[0.95] tracking-[0.02em]">
            {section.label}
          </p>
        </motion.div>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="col-span-9 grid grid-cols-2 content-start gap-x-10 gap-y-1.5 lg:grid-cols-3"
        >
          {section.children?.map((child, i) => (
            <motion.li key={child.href} variants={itemVariants}>
              <Link
                href={child.href}
                onClick={onClose}
                className="group flex items-baseline gap-3 py-1.5"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors duration-300 group-hover:text-magenta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.08em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-magenta">
                  {child.label}
                </span>
              </Link>
              {child.children && (
                <ul className="mb-1 ml-8 space-y-0.5">
                  {child.children.map((grandchild) => (
                    <li key={grandchild.href}>
                      <Link
                        href={grandchild.href}
                        onClick={onClose}
                        className="inline-block font-mono text-xs uppercase tracking-[0.08em] text-smoke transition-all duration-300 hover:translate-x-1 hover:text-magenta"
                      >
                        {grandchild.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
