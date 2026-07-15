"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import HeroScene from "./HeroScene";

type HeroCanvasProps = {
  /** False once the hero leaves the viewport — pauses the render loop. */
  active?: boolean;
  /** Fired once WebGL is live, so the poster can crossfade away. */
  onReady?: () => void;
};

/**
 * R3F canvas shell: camera, DPR cap, and the single post-fx pass
 * (depth of field for the blurred-atelier bokeh look).
 * Perf notes: MSAA is off because the composer resolves its own buffer;
 * the DoF pass runs at reduced internal resolution; frameloop drops to
 * on-demand while the hero is off screen.
 * Only ever loaded via next/dynamic with ssr: false — see Hero.tsx.
 */
export default function HeroCanvas({ active = true, onReady }: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0.35, 1.62, 3.6], fov: 34 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onCreated={({ camera }) => {
        camera.lookAt(0.45, 1.38, 0);
        onReady?.();
      }}
    >
      <Suspense fallback={null}>
        <HeroScene />
        {/* One post pass max (perf budget): DoF focused on the subject */}
        <EffectComposer multisampling={0}>
          <DepthOfField
            target={[0.55, 1.4, 0]}
            focalLength={0.045}
            bokehScale={3}
            height={480}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
