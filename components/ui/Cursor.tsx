"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a small dot that
 *  - follows the surface theme for visibility — navy over light sections,
 *    magenta (the Contact Us pill color) over dark ones. Surfaces opt in via
 *    data-cursor-theme="dark" | "light"; anything untagged counts as light.
 *  - scales up over links/buttons,
 *  - expands into a magenta "View" badge over [data-cursor="view"] targets.
 * Mounted only on fine pointers without prefers-reduced-motion; the native
 * cursor is hidden via html.has-custom-cursor while active.
 */
export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduced) setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const wrap = wrapRef.current!;
    const dot = dotRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.3, ease: "power3.out" });
    const scaleTo = gsap.quickTo(dot, "scale", {
      duration: 0.35,
      ease: "power3.out",
    });

    let mode: "" | "link" | "view" = "";
    let lastX = -100;
    let lastY = -100;
    let scrollRaf = 0;
    const restScale = () => (mode === "view" ? 7.2 : mode === "link" ? 2.4 : 1);

    const applyTheme = (el: Element | null) => {
      const themed = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      wrap.dataset.theme = themed?.dataset.cursorTheme ?? "light";
    };

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest('[data-cursor="view"]')) mode = "view";
      else if (target?.closest("a, button, [role='button']")) mode = "link";
      else mode = "";
      wrap.dataset.mode = mode;
      applyTheme(target);
      scaleTo(restScale());
    };
    // Content can scroll beneath a stationary pointer — re-check the surface.
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() =>
        applyTheme(document.elementFromPoint(lastX, lastY)),
      );
    };
    const onDown = () => scaleTo(mode === "view" ? 6.4 : 0.8);
    const onUp = () => scaleTo(restScale());
    const onLeave = () => gsap.to(wrap, { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to(wrap, { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={wrapRef} className="cursor-wrap" data-theme="light" aria-hidden>
      <div ref={dotRef} className="cursor-dot" />
      <span className="cursor-label font-mono">View</span>
    </div>
  );
}
