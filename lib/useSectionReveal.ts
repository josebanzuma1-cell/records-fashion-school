"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { GSAP_EASE, DUR, STAGGER } from "@/lib/motion";

/**
 * Standard section entrance: children tagged [data-reveal] fade + rise
 * (24px) with stagger once the section reaches ~85% of the viewport.
 * No-ops under prefers-reduced-motion (content just shows).
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 24,
          duration: DUR.standard,
          ease: GSAP_EASE,
          stagger: STAGGER,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
