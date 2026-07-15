"use client";

import type { ComponentType } from "react";
import { heroConfig, type HeroSubjectId } from "./heroConfig";
import DressForm from "./subjects/DressForm";

/**
 * Subject registry — the hero's centerpiece is config-driven.
 *
 * To swap the subject later (garment, fabric drape, scanned GLB…):
 *   1. add components/hero/subjects/<Name>.tsx
 *   2. register it here
 *   3. point heroConfig.subject at the new key
 * No changes to the scene, camera, lights, or motion.
 *
 * Contract: every subject fits a ~1.1 × 2.2 × 1.1 bounding box with its
 * pivot on the floor at the origin (y = 0), so framing, the contact shadow,
 * and depth-of-field focus stay correct for any subject.
 */
const registry: Record<HeroSubjectId, ComponentType> = {
  dressForm: DressForm,
};

export default function HeroSubject() {
  const Subject = registry[heroConfig.subject];
  return <Subject />;
}
