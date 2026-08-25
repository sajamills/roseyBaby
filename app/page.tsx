import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Image from "next/image";
import BusinessStatus from "@/components/BusinessStatus";
import HeroImage from "@/components/HeroImage";

const actions = [
  {
    label: "Reserve a table",
    href: "https://www.opentable.com/r/rosey-baby-starkville",
  },
  { label: "Plan catering", href: "/catering" },
  { label: "Call to order", href: "tel:+16623241949" },
];

const features = [
  {
    eyebrow: "January–June",
    title: "Louisiana crawfish season",
    body: "Live Louisiana crawfish, boils, and seasonal updates from the tracks.",
    href: "/crawfish",
    image: "/rosey-originals/oysters.jpg",
  },
  {
    eyebrow: "Local + independent",
    title: "The beer wall",
    body: "A rotating lineup of local beer, IPAs, sours, stouts, and more.",
    href: "/beer-wall",
    image: "/rosey-originals/drink.jpg",
  },
  {
    eyebrow: "Full service",
    title: "Catering for every crowd",
    body: "Weddings, MSU events, crawfish boils, fish fries, and private parties.",
    href: "/catering",
    image: "/rosey-originals/catering.jpg",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Family owned in Starkville since 1995</p>
          <h1>
            Cajun flavor.
            <br />
            Cold beer.
            <br />
            <em>Right on the tracks.</em>
          </h1>
          <p className="hero-intro">
            Elevated Cajun roots, seasonal live Louisiana crawfish, and a tap
            wall built for Starkville. Come hungry. Bring the whole crew.
          </p>
          <div className="action-row">
            {actions.map((action, index) => (
              <Link
                className={index === 0 ? "button button-primary" : "button"}
                href={action.href}
                key={action.label}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hero-art">
          <HeroImage
            src="/rosey-originals/header.jpg"
            alt="Boiled shrimp, corn, and potatoes with a branded Rosey Baby cup"
            priority
          />
          <div className="track-lines" />
        </div>
      </section>

      <section className="status-bar" aria-label="Restaurant status">
        <BusinessStatus />
        <p>11 AM–10 PM</p>
        <Link href="tel:+16623241949">662-324-1949</Link>
        <Link href="https://www.google.com/maps/dir/?api=1&destination=300%20S%20Jackson%20St%2C%20Starkville%2C%20MS%2039759">
          Get directions ↗
        </Link>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">More than dinner</p>
          <h2>Starkville gathers here.</h2>
          <p>
            From wing night to wedding weekends, Rosey Baby has a seat—and a
            plate—for every kind of occasion.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <Link
              className="feature-card"
              href={feature.href}
              key={feature.title}
            >
              <div className="card-photo">
                <Image
                  src={feature.image}
                  alt={`${feature.title} at Rosey Baby`}
                  fill
                  sizes="(max-width: 900px) 92vw, 30vw"
                  quality={70}
                />
                <i aria-hidden="true" />
              </div>
              <span className="card-number">0{index + 1}</span>
              <p className="eyebrow">{feature.eyebrow}</p>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <span className="card-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="story-band">
        <p className="eyebrow">The Rosey Baby story</p>
        <blockquote>“Curt was Roselyn’s Rosey baby.”</blockquote>
        <p>
          Curt Crissey came to Starkville from Homestead, Florida, in 1980 to
          play college football. A connection with Louisiana crawfish farmers
          eventually brought live crawfish to Starkville—and a family restaurant
          was born. Today, Curt’s daughter Ashley Ray and son-in-law Justin Ray
          carry that Cajun cooking forward, still leaning on his original
          recipes alongside a full bar and a rotating beer wall.
        </p>
        <Link className="text-link" href="/our-story">
          Read our story →
        </Link>
      </section>

      <div className="mobile-actions" aria-label="Quick actions">
        <Link href="/menu">Menu</Link>
        <Link href="tel:+16623241949">Call</Link>
        <Link href="https://www.opentable.com/r/rosey-baby-starkville">
          Reserve
        </Link>
      </div>
    </main>
  );
}
