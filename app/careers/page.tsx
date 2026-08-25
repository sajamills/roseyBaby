import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroImage from "@/components/HeroImage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Rosey Baby team in Starkville, Mississippi — servers, bartenders, cooks, and more. Apply online.",
  alternates: { canonical: "/careers" },
};

const positions = [
  "Server",
  "Bartender",
  "Host / Hostess",
  "Line cook",
  "Kitchen prep",
  "Dishwasher / Busser",
];

export default function CareersPage() {
  const typeformUrl = process.env.NEXT_PUBLIC_CAREERS_TYPEFORM_URL;
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="detail-hero careers-detail-hero">
        <HeroImage src="/rosey-originals/deck.jpg" alt="The Rosey Baby deck in Starkville" priority />
        <div>
          <p className="eyebrow">Join the team</p>
          <h1>
            Work where Starkville <em>gathers.</em>
          </h1>
          <p>
            Rosey Baby is hiring servers, bartenders, cooks, and hosts in
            Starkville. Flexible scheduling for MSU students, a busy floor,
            and a crew that works Tuesday wing nights together.
          </p>
          {typeformUrl && (
            <a className="button button-primary" href={typeformUrl}>
              Apply now →
            </a>
          )}
        </div>
      </section>
      <section className="catering-services">
        <div>
          <p className="eyebrow">Open roles</p>
          <h2>Positions we&rsquo;re hiring for.</h2>
          <p className="section-copy">
            Don&rsquo;t see your exact role listed? Apply anyway and note what
            you&rsquo;re looking for — we review every application.
          </p>
        </div>
        <div className="service-list">
          {positions.map((position, i) => (
            <div key={position}>
              <span>0{i + 1}</span>
              <h3>{position}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="detail-cta">
        <p className="eyebrow">Ready when you are</p>
        <h2>Ready to join the crew?</h2>
        {typeformUrl && (
          <a className="button" href={typeformUrl}>
            Apply now →
          </a>
        )}
      </section>
    </main>
  );
}
