import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import HeroImage from "@/components/HeroImage";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The family story behind Rosey Baby, serving Cajun food and Louisiana crawfish on the railroad tracks in Starkville since 1995.",
  alternates: { canonical: "/our-story" },
};

export default function StoryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="detail-hero story-detail-hero">
        <HeroImage src="/rosey-originals/deck.jpg" alt="Rosey Baby on the railroad tracks" priority />
        <div>
          <p className="eyebrow">Family owned · On the tracks since 1995</p>
          <h1>
            A Florida beginning. <em>A Starkville original.</em>
          </h1>
          <p>
            Rosey Baby grew from Curt Crissey’s family, football years, Cajun
            cooking, and a belief that Starkville was ready for something it had
            never tasted.
          </p>
        </div>
      </section>
      <section className="story-origin">
        <div>
          <p className="eyebrow">Where the name began</p>
          <h2>Roselyn’s “Rosey Baby”</h2>
        </div>
        <div className="prose">
          <figure className="story-portrait">
            <Image
              src="/rosey-originals/curt.jpg"
              alt="Curt Crissey carrying a fresh tray of crawfish outside Rosey Baby"
              width={609}
              height={406}
              sizes="(max-width: 800px) 92vw, 40vw"
            />
            <figcaption>Curt Crissey</figcaption>
          </figure>
          <p>
            Curt grew up in Homestead, Florida. His mother was named Roselyn,
            and Curt was her “Rosey Baby.” The family nickname eventually became
            the name above the door.
          </p>
          <p>
            He moved to Starkville in 1980 to play offensive line at Mississippi
            State. While later working on an oil rig, Curt met Louisiana
            crawfish farmers and saw an opportunity to bring live Louisiana
            crawfish to Starkville.
          </p>
        </div>
      </section>
      <section className="timeline">
        <article>
          <strong>1980</strong>
          <h3>Curt comes to Starkville</h3>
          <p>
            The Homestead native arrives to play offensive line for Mississippi
            State.
          </p>
        </article>
        <article>
          <strong>1995</strong>
          <h3>Rosey Baby comes alive</h3>
          <p>
            Curt opens the restaurant himself in Starkville’s former train
            depot.
          </p>
        </article>
        <article>
          <strong>2018</strong>
          <h3>The next generation</h3>
          <p>
            Curt’s daughter Ashley Ray and son-in-law Justin Ray take over the
            family business.
          </p>
        </article>
        <article>
          <strong>Today</strong>
          <h3>The originals remain</h3>
          <p>
            Crawfish, étouffée, gumbo, and creole sauce still connect today’s
            menu to Curt’s Cajun foundation. Curt remains involved, while Justin
            leads the current menu.
          </p>
        </article>
      </section>
      <section className="family-stores">
        <div className="family-stores-intro">
          <p className="eyebrow">A Starkville family of businesses</p>
          <h2>The Crissey Family of Stores</h2>
          <p>
            Rosey Baby is one part of a larger family story built across
            Starkville. The Crissey family’s local businesses have served
            generations of residents, students, and visitors in different
            corners of town.
          </p>
        </div>
        <div className="family-store-grid">
          <a
            href="https://www.facebook.com/DownHatchStark/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Down the Hatch on Facebook"
          >
            <Image
              src="/family-stores/down-the-hatch.jpg"
              alt="Down the Hatch storefront in Starkville"
              width={1200}
              height={900}
              sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, 23vw"
            />
            <div className="family-store-copy">
              <span>01</span>
              <h3>Down the Hatch</h3>
              <p>
                A neighborhood deli and convenience stop at 405 Russell Street,
                known for burgers, sub sandwiches, and easy carryout.
              </p>
              <strong>
                Visit on Facebook <i aria-hidden="true">↗</i>
              </strong>
            </div>
          </a>
          <a
            href="https://www.facebook.com/100082996309644/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Coconuts on Facebook"
          >
            <Image
              src="/family-stores/coconuts.jpg"
              alt="Coconuts storefront in Starkville’s Cotton District"
              width={1200}
              height={900}
              sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, 23vw"
            />
            <div className="family-store-copy">
              <span>02</span>
              <h3>Coconuts</h3>
              <p>
                A longtime craft-beer and convenience store in the heart of the
                Cotton District at 601 University Drive.
              </p>
              <strong>
                Visit on Facebook <i aria-hidden="true">↗</i>
              </strong>
            </div>
          </a>
          <a
            href="https://www.facebook.com/brewskisstark/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Brewski’s on Facebook"
          >
            <Image
              src="/family-stores/brewskis.jpg"
              alt="The beer selection inside Brewski’s in Starkville"
              width={1200}
              height={900}
              sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, 23vw"
            />
            <div className="family-store-copy">
              <span>03</span>
              <h3>Brewski’s</h3>
              <p>
                Beer, convenience, and casual food on Highway 12 in Starkville.
              </p>
              <strong>
                Visit on Facebook <i aria-hidden="true">↗</i>
              </strong>
            </div>
          </a>
          <a
            href="https://www.facebook.com/bulldogpackage/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Bulldog Package Store on Facebook"
          >
            <Image
              src="/family-stores/bulldog-package-store.jpg"
              alt="Bulldog Package Store in Starkville"
              width={1200}
              height={900}
              sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, 23vw"
            />
            <div className="family-store-copy">
              <span>04</span>
              <h3>Bulldog Package Store</h3>
              <p>Bulldog Package Store and Wine Collection on Highway 12.</p>
              <strong>
                Visit on Facebook <i aria-hidden="true">↗</i>
              </strong>
            </div>
          </a>
        </div>
      </section>
      <section className="detail-cta">
        <p className="eyebrow">Still on the railroad tracks</p>
        <h2>Come taste the story.</h2>
        <Link className="button" href="/menu">
          See the menu →
        </Link>
      </section>
    </main>
  );
}
