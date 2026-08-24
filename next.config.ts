import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old WordPress site structure, still indexed by Google post-migration.
      { source: "/menu/:path+", destination: "/menu", permanent: true },
      { source: "/contact", destination: "/visit", permanent: true },
      { source: "/entrees", destination: "/menu", permanent: true },
      { source: "/apps", destination: "/menu", permanent: true },
      { source: "/appetizers", destination: "/menu", permanent: true },
      { source: "/drinks", destination: "/menu", permanent: true },
      { source: "/dessert", destination: "/menu", permanent: true },
      { source: "/desserts", destination: "/menu", permanent: true },
      { source: "/cajun-specialties", destination: "/menu", permanent: true },
    ];
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
