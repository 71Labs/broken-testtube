import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't infer it from a parent lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Allow HD quality on prominent imagery (default is 75, which softens photos).
    qualities: [75, 88, 92],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
