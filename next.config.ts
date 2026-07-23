import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Hostinger (or any plain file host): the whole site is
  // pre-rendered HTML/CSS/JS with no API routes, middleware, server actions,
  // or next/image usage, so it needs no Node.js server to run. `next build`
  // now writes the deployable folder straight to `out/`.
  // Vercel still deploys this fine — it serves exported output natively.
  output: "export",
  // Emit `route/index.html` (not `route.html`) so clean URLs like /apply
  // keep working via a static host's directory-index resolution.
  trailingSlash: true,
};

export default nextConfig;
