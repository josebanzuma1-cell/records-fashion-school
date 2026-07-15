"use client";

import { useEffect, useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  RepeatWrapping,
  SRGBColorSpace,
  Vector2,
} from "three";
import { heroConfig } from "../heroConfig";

/**
 * Hero subject v1 — tailor's dress form.
 * Fully procedural: lathe-turned bust draped in navy pinstripe suiting,
 * a cream measuring tape spiralling around the waist, mahogany stand.
 * Bounding contract: fits ~1.1 × 2.2 × 1.1, pivot on the floor at origin.
 */

/** Torso silhouette — (radius, height) pairs, floor-up. Shared by the lathe and the tape spiral. */
const PROFILE: [number, number][] = [
  [0.005, 0.86],
  [0.29, 0.87],
  [0.335, 0.98],
  [0.33, 1.12],
  [0.265, 1.34],
  [0.32, 1.52],
  [0.385, 1.66],
  [0.35, 1.78],
  [0.23, 1.92],
  [0.1, 2.0],
  [0.095, 2.1],
  [0.005, 2.11],
];

/** Interpolated torso radius at a given height. */
function radiusAt(y: number): number {
  if (y <= PROFILE[0][1]) return PROFILE[0][0];
  for (let i = 1; i < PROFILE.length; i++) {
    const [r0, y0] = PROFILE[i - 1];
    const [r1, y1] = PROFILE[i];
    if (y <= y1) return r0 + ((r1 - r0) * (y - y0)) / (y1 - y0);
  }
  return PROFILE[PROFILE.length - 1][0];
}

function makePinstripeTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#1A2742";
  ctx.fillRect(0, 0, 512, 512);

  // Faint horizontal weave
  ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
  for (let y = 0; y < 512; y += 3) ctx.fillRect(0, y, 512, 1);

  // Cream pinstripes
  ctx.fillStyle = "rgba(226, 216, 196, 0.30)";
  for (let x = 8; x < 512; x += 32) ctx.fillRect(x, 0, 1.4, 512);

  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 2);
  texture.anisotropy = 8;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function makeTapeTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = heroConfig.palette.cream;
  ctx.fillRect(0, 0, 256, 32);

  // Tick marks along both edges, taller every fourth
  ctx.fillStyle = "#3B3226";
  for (let x = 0; x < 256; x += 8) {
    const tall = x % 32 === 0;
    ctx.fillRect(x, 0, 1, tall ? 10 : 5);
    ctx.fillRect(x, tall ? 22 : 27, 1, tall ? 10 : 5);
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Flat ribbon spiralling around the torso, hugging the lathe profile. */
function makeTapeGeometry(): BufferGeometry {
  const turns = 2.15;
  const yStart = 1.18;
  const yEnd = 1.84;
  const steps = 260;
  const width = 0.05;
  const clearance = 0.03;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const y = yStart + (yEnd - yStart) * t;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const yTop = y + width / 2;
    const yBot = y - width / 2;
    const rTop = radiusAt(yTop) + clearance;
    const rBot = radiusAt(yBot) + clearance;

    positions.push(cos * rTop, yTop, sin * rTop, cos * rBot, yBot, sin * rBot);
    normals.push(cos, 0, sin, cos, 0, sin);
    const u = t * turns * 7; // texture repeats per turn
    uvs.push(u, 1, u, 0);

    if (i < steps) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normals), 3));
  geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);
  return geometry;
}

export default function DressForm() {
  const lathePoints = useMemo(
    () => PROFILE.map(([r, y]) => new Vector2(r, y)),
    [],
  );
  const pinstripe = useMemo(makePinstripeTexture, []);
  const tapeTexture = useMemo(makeTapeTexture, []);
  const tapeGeometry = useMemo(makeTapeGeometry, []);

  useEffect(() => {
    return () => {
      pinstripe.dispose();
      tapeTexture.dispose();
      tapeGeometry.dispose();
    };
  }, [pinstripe, tapeTexture, tapeGeometry]);

  const { mahogany, brass } = heroConfig.palette;

  return (
    <group>
      {/* Torso — navy pinstripe suiting over the bust */}
      <mesh>
        <latheGeometry args={[lathePoints, 72]} />
        <meshPhysicalMaterial
          map={pinstripe}
          roughness={0.74}
          metalness={0}
          sheen={0.5}
          sheenRoughness={0.8}
          sheenColor="#2C3A5C"
        />
      </mesh>

      {/* Cream measuring tape, spiralling */}
      <mesh geometry={tapeGeometry}>
        <meshStandardMaterial
          map={tapeTexture}
          roughness={0.9}
          metalness={0}
          side={DoubleSide}
        />
      </mesh>

      {/* Neck cap + brass finial */}
      <mesh position={[0, 2.135, 0]}>
        <cylinderGeometry args={[0.055, 0.065, 0.05, 32]} />
        <meshStandardMaterial color={mahogany} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.185, 0]}>
        <sphereGeometry args={[0.032, 24, 24]} />
        <meshStandardMaterial color={brass} roughness={0.25} metalness={1} />
      </mesh>

      {/* Stand: pole + turned wooden base */}
      <mesh position={[0, 0.475, 0]}>
        <cylinderGeometry args={[0.021, 0.025, 0.79, 20]} />
        <meshStandardMaterial color="#3A2A1E" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 0.07, 28]} />
        <meshStandardMaterial color={mahogany} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.4, 0.42, 0.05, 48]} />
        <meshStandardMaterial color="#4A2A19" roughness={0.55} />
      </mesh>
    </group>
  );
}
