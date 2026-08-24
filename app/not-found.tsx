import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>That page moved or never existed.</h1>
        <p>
          You may have followed an old link. Try the menu, or head back home
          to find your way around.
        </p>
      </section>
      <section className="event-cta">
        <div>
          <p className="eyebrow">Where to next?</p>
          <h2>Get back on track.</h2>
        </div>
        <div>
          <p>
            Rosey Baby is on South Jackson Street, walking distance from Main
            Street with room for large parties.
          </p>
          <div className="action-row">
            <Link className="button button-primary" href="/">
              Back home →
            </Link>
            <Link className="button" href="/menu">
              See the menu →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
