import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
    ];

    const studioHeaders = securityHeaders.filter(
      (header) => header.key !== "X-Frame-Options",
    );

    return [
      { source: "/studio", headers: studioHeaders },
      { source: "/studio/:path*", headers: studioHeaders },
      { source: "/((?!studio).*)", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
