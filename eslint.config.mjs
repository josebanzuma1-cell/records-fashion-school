import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // This site ships as a static export to plain file hosting (see
      // CLAUDE.md §2 / next.config.ts), so next/image's optimisation
      // pipeline isn't available and raw <img> is the deliberate choice
      // throughout. The rule would flag every image on every build.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
