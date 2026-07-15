"use client";

import { useEffect, useMemo } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";
import { heroConfig } from "./heroConfig";

/** Deterministic PRNG so the bokeh field is stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BOKEH_COLORS = [
  heroConfig.palette.brass,
  heroConfig.palette.cream,
  heroConfig.palette.keyLight,
  "#E8A25C",
];

/**
 * The warm atelier behind the subject: a gradient wall of amber light and
 * a field of small emissive spheres that the depth-of-field pass melts
 * into bokeh, matching the reference photograph.
 */
export default function AtelierBackdrop() {
  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = heroConfig.palette.navyDeep;
    ctx.fillRect(0, 0, 512, 512);

    // Amber key glow, upper right — the window light of the atelier
    let glow = ctx.createRadialGradient(360, 150, 20, 360, 150, 330);
    glow.addColorStop(0, "rgba(192, 138, 62, 0.55)");
    glow.addColorStop(0.5, "rgba(138, 90, 46, 0.22)");
    glow.addColorStop(1, "rgba(16, 24, 43, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 512, 512);

    // Faint mahogany warmth, lower left
    glow = ctx.createRadialGradient(110, 420, 10, 110, 420, 260);
    glow.addColorStop(0, "rgba(110, 61, 37, 0.30)");
    glow.addColorStop(1, "rgba(16, 24, 43, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);

  const bokeh = useMemo(() => {
    const rand = mulberry32(20260715);
    return Array.from({ length: 26 }, () => ({
      position: [
        (rand() - 0.5) * 9,
        0.4 + rand() * 3.4,
        -3.2 - rand() * 3.4,
      ] as [number, number, number],
      size: 0.03 + rand() * 0.06,
      color: BOKEH_COLORS[Math.floor(rand() * BOKEH_COLORS.length)],
      opacity: 0.35 + rand() * 0.5,
    }));
  }, []);

  useEffect(() => {
    return () => wallTexture.dispose();
  }, [wallTexture]);

  return (
    <group>
      <mesh position={[0, 3, -7.5]}>
        <planeGeometry args={[26, 15]} />
        <meshBasicMaterial map={wallTexture} toneMapped={false} />
      </mesh>

      {bokeh.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[dot.size, 12, 12]} />
          <meshBasicMaterial
            color={dot.color}
            transparent
            opacity={dot.opacity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
