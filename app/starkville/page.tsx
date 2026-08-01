import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getEvents } from "@/lib/editorial";
import { starkvilleGuides } from "@/lib/starkville-guides";
import { safeJsonLd, siteUrl } from "@/lib/seo";
import HeroImage from "@/components/HeroImage";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "What to Do in Starkville, MS: A Local’s Guide",
  description:
    "A current local guide to Starkville events, Mississippi State game days, downtown, family activities, crawfish season, dining, and weekend itineraries.",
  alternates: { canonical: "/starkville" },
  openGraph: {
    title: "What to Do in Starkville, MS: A Local’s Guide",
    description:
      "Current events and practical local itineraries from Rosey Baby on the railroad tracks.",
    images: ["/rosey-originals/deck.jpg"],
  },
};

export default async function StarkvillePage() {
  const events = (await getEvents()).slice(0, 5);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "What to Do in Starkville, MS: A Local’s Guide",
    url: `${siteUrl}/starkville`,
    dateModified: "2026-07-31",
    publisher: { "@id": `${siteUrl}/#restaurant` },
    hasPart: starkvilleGuides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      url: `${siteUrl}/starkville/${guide.slug}`,
    })),
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SiteHeader />
      <section className="guide-hero">
        <HeroImage src="/rosey-originals/deck.jpg" alt="Starkville from the railroad tracks" priority />
        <p className="eyebrow">
          A local guide from the tracks · Updated July 31, 2026
        </p>
        <h1>
          What to do in <em>Starkville, Mississippi.</em>
        </h1>
        <p>
          Start with what is happening now, then build a day around Mississippi
          State, downtown, local food, art, shopping, and the outdoors. Rosey
          Baby publishes this guide and clearly links to the official sources
          visitors should confirm before leaving home.
        </p>
      </section>
      <section className="guide-answer">
        <h2>The short answer</h2>
        <p>
          For a first Starkville visit, tour Mississippi State, walk downtown
          and the Cotton District, check the official events calendar, and make
          time for a local meal. Sports weekends need advance reservations;
          quieter weekends are ideal for the Community Market, public art,
          campus walks, and the Noxubee refuge.
        </p>
      </section>
      <section className="guide-events">
        <div>
          <p className="eyebrow">Coming up</p>
          <h2>What’s happening next.</h2>
        </div>
        <div>
          {events.map((event) => (
            <Link href={`/events/${event.slug}`} key={event.slug}>
              <span>
                {event.startsAt
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      timeZone: "America/Chicago",
                    }).format(new Date(event.startsAt))
                  : "TBD"}
              </span>
              <strong>{event.title}</strong>
            </Link>
          ))}
          <Link href="/events">See the full calendar →</Link>
        </div>
      </section>
      <section className="guide-grid">
        {starkvilleGuides.map((guide, index) => (
          <Link href={`/starkville/${guide.slug}`} key={guide.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <strong>Read local guide →</strong>
          </Link>
        ))}
      </section>
      <section className="guide-disclosure">
        <h2>How this guide is made</h2>
        <p>
          Rosey Baby is a family-owned Starkville restaurant, so this is not an
          anonymous travel-ranking site. Recommendations include Rosey Baby
          where relevant and also point visitors to independent businesses,
          Mississippi State, the City of Starkville, and official event
          organizers. Dates, hours, and admission can change.
        </p>
      </section>
    </main>
  );
}
