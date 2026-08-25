import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getBeerMenu } from "@/lib/beer";
import HeroImage from "@/components/HeroImage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Craft Beer Wall in Starkville",
  description:
    "Explore Rosey Baby’s rotating craft beer wall in Starkville, including local beer, IPAs, sours, stouts, lagers, and seasonal releases.",
  alternates: { canonical: "/beer-wall" },
};

const styles = [
  {
    name: "Local & regional",
    copy: "Mississippi breweries and Southern favorites whenever the right keg comes through.",
  },
  {
    name: "IPAs",
    copy: "Hazy, West Coast, double, and rotating hop-forward pours.",
  },
  {
    name: "Sours",
    copy: "Bright, tart, fruited, and seasonal releases for something outside the usual pint.",
  },
  {
    name: "Stouts & dark beer",
    copy: "Roasty stouts, porters, and richer seasonal pours.",
  },
  {
    name: "Crisp & easy",
    copy: "Lagers, pilsners, wheat beers, and approachable game-day favorites.",
  },
  {
    name: "Something new",
    copy: "Limited releases and new discoveries keep the wall moving.",
  },
];

export default async function BeerWallPage() {
  const sections = await getBeerMenu();
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="beer-hero">
        <HeroImage src="/rosey-originals/drink.jpg" alt="A drink at Rosey Baby’s beer wall" priority />
        <div>
          <p className="eyebrow">Rotating craft beer in Starkville</p>
          <h1>
            A wall that never <em>stands still.</em>
          </h1>
          <p>
            Local beer, IPAs, sours, stouts, lagers, and whatever catches our
            attention next. The selection rotates as kegs kick, so there is
            always a reason to look again.
          </p>
          <div className="action-row">
            <a
              className="button button-primary"
              href="https://untappd.com/v/rosey-baby/18903"
            >
              Follow on Untappd ↗
            </a>
            <Link className="button detail-light-button" href="/visit">
              Visit the beer wall
            </Link>
          </div>
        </div>
      </section>
      {sections.length ? (
        <section className="tap-menu">
          <div className="tap-heading">
            <p className="eyebrow">Live from Untappd</p>
            <h2>What’s pouring now.</h2>
            <p>
              Tap information refreshes automatically. Availability can change
              before the page updates.
            </p>
          </div>
          {sections.map((section) => (
            <div className="tap-section" key={section.name}>
              <h3>{section.name}</h3>
              <div>
                {section.beers.map((beer, index) => (
                  <article key={`${beer.name}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{beer.name}</h4>
                      <p>
                        {[beer.brewery, beer.style].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <p>
                      {[
                        beer.abv && `${beer.abv}% ABV`,
                        beer.ibu && `${beer.ibu} IBU`,
                        beer.serving,
                        beer.price,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="beer-styles">
          <div>
            <p className="eyebrow">Always rotating</p>
            <h2>There’s a pour for every plate.</h2>
            <p>
              The live tap list will appear here when Rosey Baby’s Untappd for
              Business feed is connected. Until then, follow Untappd for the
              latest check-ins and availability.
            </p>
          </div>
          <div className="beer-style-grid">
            {styles.map((style, index) => (
              <article key={style.name}>
                <span>0{index + 1}</span>
                <h3>{style.name}</h3>
                <p>{style.copy}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="beer-pairing">
        <div>
          <p className="eyebrow">Beer meets Cajun</p>
          <h2>Cold pours. Bold food.</h2>
        </div>
        <div>
          <p>
            A crisp lager alongside boiled crawfish. A bright IPA with a po-boy.
            A dark stout after gumbo. Ask the team what is fresh and what pairs
            best with your order.
          </p>
          <div className="action-row">
            <Link className="button" href="/menu">
              Explore the food menu →
            </Link>
            <Link className="button" href="/starkville/downtown-starkville-bars">
              Downtown Starkville bars →
            </Link>
            <Link className="button" href="/starkville/where-to-watch-msu-games">
              Game day bars guide →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
