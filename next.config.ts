import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // WebP only: AVIF is noticeably slower to generate the first time each size is requested,
    // which visitors see as images arriving late. The photographs never change, so resized
    // versions are cached for 31 days instead of being rechecked every minute.
    formats: ["image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      {
        source: "/treatments/emergency-dental-care/",
        destination: "/contact/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
