import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // 75 stays the default for every <Image> that doesn't set `quality`; 70
    // is opt-in for large photos where Lighthouse flagged excess bytes at 75
    // with no visible difference (hero photos, homepage feature cards).
    qualities: [70, 75],
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

    // No inline-script nonce: a nonce requires reading headers() per request,
    // which would opt every page out of static generation/ISR. The site has
    // no user-submitted HTML rendering (JSON-LD is escaped via safeJsonLd;
    // forms are external Typeform links), so 'unsafe-inline' script-src is an
    // acceptable trade here.
    // React's dev-mode overlay needs eval(); it never uses eval() in
    // production, so this only loosens the policy for `next dev`.
    const scriptSrc =
      process.env.NODE_ENV === "development"
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
        : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";
    const siteCsp = [
      "default-src 'self'",
      scriptSrc,
      // Next's <Image fill> (used by every hero image) positions itself via
      // an inline style attribute; without 'unsafe-inline' here the browser
      // silently drops that inline style, so background images render as
      // normal static-flow content and blow out flex/grid hero layouts.
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io",
      "font-src 'self'",
      "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-src 'self' https://www.google.com",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    // The embedded Sanity Studio bundle needs a materially more permissive
    // policy (CSS-in-JS runtime styles, the Sanity API/CDN, realtime
    // websockets, blob workers for asset processing).
    const studioScriptSrc =
      process.env.NODE_ENV === "development"
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'";
    const studioCsp = [
      "default-src 'self'",
      studioScriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io",
      "worker-src 'self' blob:",
      "child-src 'self' blob:",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    const studioHeaders = [
      ...securityHeaders.filter((header) => header.key !== "X-Frame-Options"),
      { key: "Content-Security-Policy", value: studioCsp },
    ];
    const siteHeaders = [
      ...securityHeaders,
      { key: "Content-Security-Policy", value: siteCsp },
      // Only on the main site, not /studio: Sanity Studio's login uses a
      // window.opener-based OAuth popup, which same-origin COOP would sever.
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];

    return [
      { source: "/studio", headers: studioHeaders },
      { source: "/studio/:path*", headers: studioHeaders },
      { source: "/((?!studio).*)", headers: siteHeaders },
    ];
  },
};

export default nextConfig;
