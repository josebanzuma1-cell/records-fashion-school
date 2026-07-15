"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { GSAP_EASE, DUR, STAGGER } from "@/lib/motion";
import { heroConfig } from "./heroConfig";
import HeroPoster from "./HeroPoster";
import PillLink from "@/components/ui/PillLink";
import Magnetic from "@/components/ui/Magnetic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/** Word split for the staggered reveal; keeps markup semantic via aria-label on the h1.
 *  Copy from the school's flyer: “Unlock your creativity…” */
const HEADLINE_LINES: { words: string[]; accent?: boolean }[] = [
  { words: ["Unlock", "your"] },
  { words: ["Creativity."], accent: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [inView, setInView] = useState(true);

  // 3D only on desktop pointers, without reduced-motion, with WebGL available.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (reduced || small) return;
    const probe = document.createElement("canvas");
    if (probe.getContext("webgl2") || probe.getContext("webgl")) setShow3D(true);
  }, []);

  // Idle the WebGL loop once the hero scrolls out of view — it otherwise
  // keeps burning GPU behind later sections and drags the whole page.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(section);
    return () => observer.disconnect();
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
      className="relative min-h-[100svh] overflow-hidden bg-navy text-paper"
    >
      {/* Visual layers: poster under canvas; poster stays for fallback modes */}
      <HeroPoster hidden={show3D && canvasReady} drift={!show3D} />
      {show3D && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            canvasReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroCanvas active={inView} onReady={() => setCanvasReady(true)} />
        </div>
      )}

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
              <PillLink href="/guidance/admission" variant="solid">
                Enroll Now
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href="/guidance/open-day">Book an Open Day</PillLink>
            </Magnetic>
          </div>
        </div>
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
