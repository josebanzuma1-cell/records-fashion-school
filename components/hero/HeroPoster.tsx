"use client";

import { heroConfig } from "./heroConfig";

type HeroPosterProps = {
  /** Fades out once the 3D canvas is live. */
  hidden: boolean;
  /** Subtle Ken-Burns drift — only for the no-3D fallback (mobile/reduced-motion). */
  drift: boolean;
};

/**
 * Static hero still. Serves as: mobile hero, reduced-motion hero,
 * no-WebGL hero, and loading state while the canvas warms up.
 */
export default function HeroPoster({ hidden, drift }: HeroPosterProps) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative backdrop; real copy lives in the DOM above it.
          TODO: replace with real atelier photograph poster. */}
      <img
        src={heroConfig.posterSrc}
        alt=""
        width={1600}
        height={1000}
        className={`h-full w-full object-cover ${drift ? "kenburns" : ""}`}
      />
    </div>
  );
}
