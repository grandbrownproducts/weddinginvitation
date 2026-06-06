import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable server-side image optimisation cache in development
    // so swapping photos in /public always shows instantly.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
