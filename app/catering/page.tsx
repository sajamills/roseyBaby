import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import HeroImage from "@/components/HeroImage";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Full-service Rosey Baby catering for Starkville weddings, MSU events, crawfish boils, fish fries, and private parties.",
  alternates: { canonical: "/catering" },
};

export default function CateringPage() {
  const typeformUrl = process.env.NEXT_PUBLIC_CATERING_TYPEFORM_URL;
  const crawfishFormUrl = process.env.NEXT_PUBLIC_CRAWFISH_TYPEFORM_URL;
  const bartendingFormUrl = process.env.NEXT_PUBLIC_BARTENDING_TYPEFORM_URL;
  const services = [
    "Weddings & bridal events",
    "Mississippi State events",
    "Sororities & fraternities",
    "Crawfish boils",
    "Fish fries",
    "Corporate & private parties",
  ];
  const venues = [
    {
      name: "Dodson Farm",
      detail:
        "Weddings, receptions, Greek functions, fundraisers, and celebrations.",
      href: "https://www.dodsonfarm.com/",
    },
    {
      name: "The Mill",
      detail:
        "Historic Starkville setting for weddings, conferences, and large events.",
      href: "https://www.starkville.org/listing/the-mill-at-msu/",
    },
    {
      name: "MSU Spaces",
      detail:
        "Campus gatherings, organization events, tailgates, and university celebrations.",
      href: "https://www.union.msstate.edu/plan-event/event-resources",
    },
    {
      name: "Your Venue",
      detail:
        "Homes, farms, offices, and event spaces within roughly 30–45 minutes of Starkville.",
      href: "#start-planning",
    },
  ];
  return (
    <main>
      <SiteHeader />
      <section className="catering-hero">
        <HeroImage src="/rosey-originals/header.jpg" alt="Rosey Baby full-service catering" priority />
        <div>
          <p className="eyebrow">Full-service catering</p>
          <h1>
            Feed the whole
            <br />
            <em>celebration.</em>
          </h1>
          <p>
            From weddings at Dodson Farms and bridal weekends to MSU events,
            crawfish boils, fish fries, and Greek life parties.
          </p>
          {typeformUrl ? (
            <a
              className="button button-primary catering-cta"
              href={typeformUrl}
            >
              Fill out our catering form →
            </a>
          ) : (
            <span className="button catering-cta pending-cta">
              Typeform URL needed
            </span>
          )}
        </div>
      </section>
      <section className="catering-services">
        <div>
          <p className="eyebrow">Built for your event</p>
          <h2>Tell us what you’re planning. We’ll handle the rest.</h2>
          <p className="section-copy">
            Rosey Baby typically serves groups of 25–60 or more within roughly
            30–45 minutes of Starkville. Please allow at least one week of lead
            time.
          </p>
        </div>
        <div className="service-list">
          {services.map((service, i) => (
            <div key={service}>
              <span>0{i + 1}</span>
              <h3>{service}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="venue-showcase">
        <HeroImage src="/rosey-originals/deck.jpg" alt="A Starkville event setting" />
        <div className="venue-intro">
          <p className="eyebrow">Your place. Our full service.</p>
          <h2>We know how to feed Starkville’s biggest moments.</h2>
          <p>
            From landmark venues and Mississippi State spaces to private farms
            and backyard boils, Rosey Baby brings the food, bar, staff, setup,
            and cleanup to you.
          </p>
        </div>
        <div className="venue-cards">
          {venues.map((venue, index) => (
            <a
              href={venue.href}
              key={venue.name}
              target={venue.href.startsWith("http") ? "_blank" : undefined}
              rel={venue.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span>0{index + 1}</span>
              <h3>{venue.name}</h3>
              <p>{venue.detail}</p>
              <strong>
                {venue.href.startsWith("http")
                  ? "View venue ↗"
                  : "Plan your event ↓"}
              </strong>
            </a>
          ))}
        </div>
        <p className="venue-note">
          Also available for events at Upstairs at Tyler, The Hill and Moor, and
          other venues throughout the area. Venue availability and
          outside-caterer policies are determined by each venue.
        </p>
      </section>
      <section className="catering-capabilities">
        <div>
          <p className="eyebrow">One team, full service</p>
          <h2>More than a food drop.</h2>
        </div>
        <div className="prose">
          <p>
            Choose delivery and on-site setup, a staffed bar, full-service
            catering, or a live crawfish boil prepared at your venue.
          </p>
          <p>
            The team can coordinate bartenders, alcohol service, rentals,
            linens, serving staff, and cleanup based on your event’s needs.
          </p>
        </div>
      </section>
      <section className="inquiry-paths">
        <div>
          <p className="eyebrow">Choose your inquiry</p>
          <h2>Start with the form built for your event.</h2>
        </div>
        <div className="inquiry-grid">
          <a href={typeformUrl}>
            <span>01</span>
            <h3>General catering</h3>
            <p>
              Weddings, MSU events, Greek life, fish fries, corporate events,
              and private parties.
            </p>
            <strong>Plan catering →</strong>
          </a>
          <a href={crawfishFormUrl}>
            <span>02</span>
            <h3>Crawfish boils</h3>
            <p>
              Guest count, platters or all-you-can-eat, sides, site access, and
              on-site cooking.
            </p>
            <strong>Plan a boil →</strong>
          </a>
          <a href={bartendingFormUrl}>
            <span>03</span>
            <h3>Bartending</h3>
            <p>
              Bar style, service hours, alcohol arrangements, equipment, and
              staffing.
            </p>
            <strong>Plan bar service →</strong>
          </a>
        </div>
      </section>
      <section className="catering-final" id="start-planning">
        <p className="eyebrow">Start planning</p>
        <h2>Ready to bring Rosey Baby to your event?</h2>
        {typeformUrl ? (
          <a className="button" href={typeformUrl}>
            Complete the Typeform →
          </a>
        ) : (
          <p>The catering inquiry form is being connected now.</p>
        )}
      </section>
    </main>
  );
}
