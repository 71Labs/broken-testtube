import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't infer it from a parent lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Allowed `quality` values (Next 16 rejects any not listed → 400).
    qualities: [75, 80, 82, 88, 90, 92],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
