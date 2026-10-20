import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files, so keep a separate export target alongside
  // the existing Vinext/Sites build.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: "tsconfig.github.json",
  },
};

export default nextConfig;
