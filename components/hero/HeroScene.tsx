"use client";

import { useRef } from "react";
import type { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { heroConfig } from "./heroConfig";
import HeroSubject from "./HeroSubject";
import AtelierBackdrop from "./AtelierBackdrop";

/**
 * Composes the atelier: lighting, backdrop, the swappable subject,
 * its contact shadow, auto-rotation and mouse parallax.
 * Subject-agnostic — nothing in here knows what the subject is.
 */
export default function HeroScene() {
  const parallaxRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += heroConfig.rotationSpeed * delta;
    }
    if (parallaxRef.current && heroConfig.mouseParallax > 0) {
      const targetY = state.pointer.x * heroConfig.mouseParallax;
      const targetX = -state.pointer.y * heroConfig.mouseParallax * 0.6;
      parallaxRef.current.rotation.y +=
        (targetY - parallaxRef.current.rotation.y) * 0.04;
      parallaxRef.current.rotation.x +=
        (targetX - parallaxRef.current.rotation.x) * 0.04;
    }
  });

  const { navyDeep, keyLight, fillLight, rimLight } = heroConfig.palette;

  return (
    <>
      <color attach="background" args={[navyDeep]} />
      <fog attach="fog" args={[navyDeep, 7, 15]} />

      {/* Warm amber key, cool fill, warm rim — the atelier light rig */}
      <ambientLight intensity={0.5} color="#42506B" />
      <spotLight
        position={[2.6, 3.4, 2.2]}
        angle={0.55}
        penumbra={0.9}
        decay={0}
        intensity={2.1}
        color={keyLight}
      />
      <directionalLight
        position={[-3, 2.2, 1.6]}
        intensity={0.4}
        color={fillLight}
      />
      <pointLight
        position={[-1.8, 2.5, -2.6]}
        decay={0}
        intensity={0.9}
        color={rimLight}
      />

      <group ref={parallaxRef}>
        <AtelierBackdrop />

        {/* Subject sits right-of-center; copy owns the left of the frame */}
        <group position={[0.55, 0, 0]}>
          <group ref={spinRef}>
            <HeroSubject />
          </group>
          <ContactShadows
            position={[0, 0.001, 0]}
            opacity={0.55}
            scale={4.5}
            blur={2.6}
            far={2.2}
            color="#05070C"
            frames={1}
          />
        </group>
      </group>
    </>
  );
}
