"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { GSAP_EASE, DUR, STAGGER } from "@/lib/motion";
import { heroSlides, heroIntervalMs } from "./heroConfig";
import PillLink from "@/components/ui/PillLink";
import Magnetic from "@/components/ui/Magnetic";

/** Word split for the staggered reveal; keeps markup semantic via aria-label on the h1.
 *  Copy from the school's flyer: “Unlock your creativity…” */
const HEADLINE_LINES: { words: string[]; accent?: boolean }[] = [
  { words: ["Unlock", "your"] },
  { words: ["Creativity."], accent: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const pausedRef = useRef(false);

  // Advance through the garment photography on a timer. Skipped entirely
  // under prefers-reduced-motion (first slide just holds); hovering the
  // hero pauses the cycle so a visitor can linger on one photo.
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setSlide((i) => (i + 1) % heroSlides.length);
    }, heroIntervalMs);
    return () => clearInterval(id);
  }, []);

  // Headline word reveal — rise + fade; accent word eases in a beat later.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-word]:not([data-hero-accent])", {
          yPercent: 110,
          duration: DUR.hero,
          ease: GSAP_EASE,
          stagger: STAGGER,
          delay: 0.2,
        });
        gsap.from("[data-hero-accent]", {
          opacity: 0,
          yPercent: 60,
          rotate: -2,
          duration: DUR.hero,
          ease: GSAP_EASE,
          delay: 0.2 + STAGGER * 4,
        });
        gsap.from("[data-hero-fade]", {
          opacity: 0,
          y: 24,
          duration: DUR.standard,
          ease: GSAP_EASE,
          stagger: STAGGER,
          delay: 0.9,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      className="relative min-h-[100svh] overflow-hidden bg-navy text-paper"
    >
      {/* Slide stack — all five pre-rendered, crossfaded via opacity only
          (no layout, no WebGL, pure GPU compositing). Decorative: the
          meaningful copy lives in the text layer below; each slide's
          content is still exposed via the matching dot's aria-label. */}
      <div className="absolute inset-0" aria-hidden>
        {heroSlides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority={i === 0 ? "high" : undefined}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
      </div>

      {/* Copy — bottom-left, editorial */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-content flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-24">
        <p
          data-hero-fade
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/70"
        >
          — Records Fashion School · Skills for Life · Kampala
        </p>

        <h1
          aria-label="Unlock your Creativity"
          className="max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] uppercase leading-[0.95] tracking-[0.02em]"
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
              {line.words.map((word, j) => (
                <span
                  key={j}
                  className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <span
                    data-hero-word
                    data-hero-accent={line.accent ? "" : undefined}
                    className={`inline-block ${
                      line.accent
                        ? "font-serif normal-case italic tracking-normal"
                        : ""
                    }`}
                  >
                    {word}
                  </span>
                  {j < line.words.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div data-hero-fade className="max-w-md">
            <p className="inline-flex items-center gap-3 border border-cream/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/90">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
              Fashion Design — Enrollment Open
            </p>
            <p className="mt-5 font-mono text-sm leading-relaxed text-cream/80">
              Learn from the best. Kickstart your career. An atelier-born
              school at Tezira House, Kampala — where craft is taught the way
              it is worn: precisely.
            </p>
          </div>
          <div data-hero-fade className="flex shrink-0 gap-4">
            <Magnetic>
              <PillLink href="/apply" variant="solid">
                Enroll Now
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href="/guidance/open-day">Book an Open Day</PillLink>
            </Magnetic>
          </div>
        </div>

        {/* Slide navigation */}
        {heroSlides.length > 1 && (
          <div
            data-hero-fade
            role="group"
            aria-label="Hero photo selector"
            className="mt-10 flex items-center gap-2"
          >
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Show photo ${i + 1} of ${heroSlides.length}: ${s.alt}`}
                aria-current={i === slide}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === slide
                    ? "w-8 bg-magenta"
                    : "w-1.5 bg-paper/40 hover:bg-paper/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        aria-hidden
        className="absolute bottom-24 right-6 z-10 hidden flex-col items-center gap-3 lg:right-12 xl:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-16 w-px bg-cream/30" />
      </div>
    </section>
  );
}
