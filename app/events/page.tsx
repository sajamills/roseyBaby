import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getEvents } from "@/lib/editorial";
import { siteUrl } from "@/lib/seo";
import HeroImage from "@/components/HeroImage";
import EventsFilter from "@/components/EventsFilter";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Starkville & MSU Events Calendar",
  description:
    "Upcoming Mississippi State football games, baseball, Bulldog Bash, Super Bulldog Weekend, downtown Starkville events, and more.",
  alternates: { canonical: "/events" },
};
export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getEvents();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": events
      .filter((e) => e.startsAt)
      .map((e) => ({
        "@type": "Event",
        name: e.title,
        startDate: e.startsAt,
        ...(e.endsAt ? { endDate: e.endsAt } : {}),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: e.location,
          ...(e.streetAddress
            ? {
                address: {
                  "@type": "PostalAddress",
                  streetAddress: e.streetAddress,
                  addressLocality: e.city || "Starkville",
                  addressRegion: e.region || "MS",
                  postalCode: e.postalCode,
                },
              }
            : {}),
        },
        organizer: {
          "@type": "Organization",
          name: e.organizer || "Event organizer",
          ...(e.organizerUrl ? { url: e.organizerUrl } : {}),
        },
        ...(e.imageUrl ? { image: [e.imageUrl] } : {}),
        ...(e.ticketUrl
          ? {
              offers: {
                "@type": "Offer",
                url: e.ticketUrl,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
        url: `${siteUrl}/events/${e.slug}`,
      })),
  };
  return (
    <main id="main-content">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <section className="events-hero">
        <HeroImage src="/rosey-originals/deck.jpg" alt="The Rosey Baby deck in Starkville" priority />
        <div>
          <p className="eyebrow">What’s happening in Starkville</p>
          <h1>
            Games, traditions &<br />
            <em>big weekends.</em>
          </h1>
          <p>
            Track MSU home games, campus traditions, and downtown Starkville
            events worth planning a trip around.
          </p>
          <div className="event-source-links">
            <a href="https://hailstate.com/calendar">
              MSU athletics calendar ↗
            </a>
            <a href="https://starkville.org/events/">Starkville calendar ↗</a>
          </div>
        </div>
      </section>
      <section className="event-list">
        <div className="event-list-heading">
          <p className="eyebrow">Upcoming</p>
          <h2>Mark your calendar.</h2>
          <p>
            Times and dates link back to official sources. “Date pending” means
            the organizer has not announced the current year’s date yet.
          </p>
        </div>
        <EventsFilter events={events} />
      </section>
      <section className="event-cta">
        <div>
          <p className="eyebrow">Before or after the event</p>
          <h2>Bring the whole crew.</h2>
        </div>
        <div>
          <p>
            Rosey Baby is on South Jackson Street, walking distance from Main
            Street with room for large parties.
          </p>
          <Link
            className="button button-primary"
            href="https://www.opentable.com/r/rosey-baby-starkville"
          >
            Reserve a table →
          </Link>
        </div>
      </section>
    </main>
  );
}
