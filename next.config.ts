import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Every image is resized once at build time (scripts/build-images.mjs) and served as a
    // static file from the CDN, so visitors never wait for on-demand resizing.
    // These widths must match WIDTHS in that script.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/_img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },  async redirects() {
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
