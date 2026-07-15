"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenisStore";

/**
 * Site-wide Lenis inertia scroll, synced to GSAP ScrollTrigger.
 * Skipped entirely under prefers-reduced-motion (native scroll instead).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 0.1 glides too long and reads as scroll delay; 0.16 stays smooth
    // but tracks the wheel much more closely.
    const lenis = new Lenis({ lerp: 0.16 });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
