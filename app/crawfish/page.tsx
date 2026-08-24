import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import HeroImage from "@/components/HeroImage";

export const metadata: Metadata = {
  title: "Crawfish in Starkville",
  description:
    "Fresh Louisiana crawfish in Starkville six days a week during season, served as platters or all-you-can-eat with corn, sausage, and potatoes.",
  alternates: { canonical: "/crawfish" },
};

export default function CrawfishPage() {
  const crawfishFormUrl =
    process.env.NEXT_PUBLIC_CRAWFISH_TYPEFORM_URL || "/catering";
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="detail-hero crawfish-detail-hero">
        <HeroImage src="/rosey-originals/oysters.jpg" alt="Fresh Louisiana seafood at Rosey Baby" priority />
        <div>
          <p className="eyebrow">Louisiana crawfish · January–June</p>
          <h1>
            Fresh from the farm. <em>Worth the soak.</em>
          </h1>
          <p>
            Live crawfish arrive from Louisiana farms four times a week during
            season. Rosey Baby serves them six days a week as generous platters
            or all-you-can-eat—with corn, sausage, and potatoes.
          </p>
          <div className="action-row">
            <Link
              className="button button-primary"
              href="https://www.opentable.com/r/rosey-baby-starkville"
            >
              Reserve a table
            </Link>
            <Link className="button detail-light-button" href="tel:+16623241949">
              Call to order
            </Link>
          </div>
        </div>
      </section>
      <section className="detail-split">
        <div>
          <p className="eyebrow">The Rosey Baby way</p>
          <h2>Seasoned right. Soaked just long enough.</h2>
        </div>
        <div className="prose">
          <p>
            The difference is in a secret seasoning blend, the right soaking
            time, and crawfish that have not spent a week in transit. Multiple
            deliveries from Louisiana each week keep the product fresh from the
            farm.
          </p>
          <p>
            Prices follow the catch and are listed at market price. Season and
            availability vary based on weather and supply, so check Facebook
            or call before making a crawfish-only trip.
          </p>
        </div>
      </section>
      <section className="fact-grid">
        <article>
          <span>01</span>
          <h3>All you can eat</h3>
          <p>Come hungry for seasonal all-you-can-eat crawfish.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Platters</h3>
          <p>Crawfish with corn, sausage, and potatoes.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Private boils</h3>
          <p>
            On-site crawfish boils for parties, weddings, Greek life, and
            company events.
          </p>
        </article>
      </section>
      <section className="detail-cta">
        <p className="eyebrow">Planning for a crowd?</p>
        <h2>We’ll bring the boil to you.</h2>
        <a className="button" href={crawfishFormUrl}>
          Plan your crawfish boil →
        </a>
      </section>
    </main>
  );
}
