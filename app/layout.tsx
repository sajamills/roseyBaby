import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { restaurantJsonLd, safeJsonLd } from "@/lib/seo";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://roseybaby.com"),
  title: {
    default: "Rosey Baby | Cajun Restaurant & Crawfish in Starkville, MS",
    template: "%s | Rosey Baby",
  },
  description: "Family-owned Cajun restaurant in Starkville serving live Louisiana crawfish, elevated Southern favorites, and a wall of craft beer since 1995.",
  alternates: { canonical: "/" },
  icons: { icon: "/rosey-baby-logo-reference.png", shortcut: "/rosey-baby-logo-reference.png", apple: "/rosey-baby-logo-reference.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "Rosey Baby", title: "Rosey Baby | Cajun Restaurant & Crawfish in Starkville, MS", description: "Family-owned Cajun restaurant, live Louisiana crawfish, craft beer, catering, and Starkville guides from the railroad tracks.", images: [{ url: "/rosey-originals/header.jpg", width: 2000, height: 1333, alt: "Rosey Baby in Starkville, Mississippi" }] },
  twitter: { card: "summary_large_image", title: "Rosey Baby | Starkville, Mississippi", description: "Cajun food, crawfish, craft beer, catering, and a local guide to Starkville.", images: ["/rosey-originals/header.jpg"] },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(restaurantJsonLd) }} />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
