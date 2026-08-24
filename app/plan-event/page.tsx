import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Plan Your Event",
  description:
    "Start your Rosey Baby event inquiry — general catering, an on-site crawfish boil, or bartending service.",
  alternates: { canonical: "/plan-event" },
};

export default function PlanEventPage() {
  const typeformUrl = process.env.NEXT_PUBLIC_CATERING_TYPEFORM_URL;
  const crawfishFormUrl = process.env.NEXT_PUBLIC_CRAWFISH_TYPEFORM_URL;
  const bartendingFormUrl = process.env.NEXT_PUBLIC_BARTENDING_TYPEFORM_URL;

  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Let&rsquo;s plan it</p>
        <h1>What are you planning?</h1>
        <p>
          Pick the option closest to what you need and we&rsquo;ll send you
          straight to the right form. Ashley reviews every inquiry and
          responds within 48 hours.
        </p>
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
      <section className="detail-cta">
        <p className="eyebrow">Not sure which one?</p>
        <h2>Call and we&rsquo;ll point you the right way.</h2>
        <a className="button" href="tel:+16623241949">
          662-324-1949
        </a>
      </section>
    </main>
  );
}
