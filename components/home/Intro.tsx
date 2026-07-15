"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";
import { GSAP_EASE, DUR } from "@/lib/motion";
import { useSectionReveal } from "@/lib/useSectionReveal";

/** Index rows under the intro — mirrors the reference site's arrow list. */
const INDEX_LINKS = [
  { label: "About Us", href: "/the-school/about-us" },
  { label: "Student Experience", href: "/the-school/student-experience" },
  { label: "Companies and Partners", href: "/the-school/companies-and-partners" },
  { label: "International Students", href: "/student-services/international-students" },
];

/**
 * Homepage intro: large Bodoni statement revealed line by line on scroll,
 * followed by a two-column index of arrow links.
 */
export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  useSectionReveal(sectionRef);

  useLayoutEffect(() => {
    let split: SplitText | null = null;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Split after fonts settle so line breaks are final.
        document.fonts.ready.then(() => {
          if (cancelled || !copyRef.current) return;
          split = new SplitText(copyRef.current, {
            type: "lines",
            mask: "lines",
          });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: DUR.hero,
            ease: GSAP_EASE,
            stagger: 0.09,
            scrollTrigger: {
              trigger: copyRef.current,
              start: "top 85%",
            },
          });
        });
      });
    }, sectionRef);

    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-content px-6 py-[16vh] lg:px-12">
      <p data-reveal className="eyebrow">
        — 01 / The School
      </p>

      <p
        ref={copyRef}
        className="mt-10 max-w-5xl font-serif text-[clamp(1.5rem,3.1vw,2.8rem)] leading-[1.35] text-ink"
      >
        Records Fashion School nurtures passionate people into professional
        fashion designers — artistry and mastery, taught in the heart of
        Kampala, to meet the evolving demands of the design market.{" "}
        <em className="italic text-magenta">Skills for life.</em>
      </p>

      <ul className="mt-[10vh] grid gap-x-16 lg:grid-cols-2">
        {INDEX_LINKS.map((link) => (
          <li key={link.href} data-reveal className="border-t hairline">
            <Link
              href={link.href}
              className="group flex items-center justify-between py-6"
            >
              <span className="font-serif text-xl transition-colors duration-300 group-hover:text-magenta lg:text-2xl">
                {link.label}
              </span>
              <span
                aria-hidden
                className="font-mono text-lg text-smoke transition-all duration-300 group-hover:translate-x-2 group-hover:text-magenta"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
