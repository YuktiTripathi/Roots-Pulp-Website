import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
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
