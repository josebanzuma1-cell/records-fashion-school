import type Lenis from "lenis";

/** Shared handle to the active Lenis instance (null under reduced motion). */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}
