"use client";

import Link from "next/link";

type UtilityBarProps = {
  /** True while the header sits over the dark hero (paper text). */
  dark: boolean;
  /** Collapses away once the page is scrolled. */
  collapsed: boolean;
};

/**
 * Top utility strip — Open Day (outline) + Contact Us (magenta pill) + EN,
 * mirroring the reference site's header chips.
 */
export default function UtilityBar({ dark, collapsed }: UtilityBarProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        collapsed ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
      }`}
    >
      <div className={`border-b ${dark ? "border-paper/15" : "hairline"}`}>
        <div className="mx-auto flex max-w-content items-center justify-end gap-3 px-6 py-2 lg:px-12">
          <Link
            href="/guidance/open-day"
            className="border border-current px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-magenta"
          >
            Open Day
          </Link>
          <Link
            href="/contact"
            className="bg-magenta px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-ink"
          >
            Contact Us
          </Link>
          {/* TODO: confirm whether a second language is needed — EN-only for now */}
          <button
            type="button"
            aria-label="Change language (English only for now)"
            className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-magenta"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
