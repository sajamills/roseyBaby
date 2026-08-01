import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const address = "300 S Jackson St, Starkville, MS 39759";
const query = encodeURIComponent(address);

export const metadata: Metadata = { title: "Visit Rosey Baby in Starkville", description: "Find Rosey Baby at 300 S Jackson Street on the railroad tracks, within walking distance of Main Street in Starkville.", alternates: { canonical: "/visit" } };

export default function VisitPage() {
  return <main>
    <SiteHeader />
    <section className="visit-layout"><div className="visit-copy"><p className="eyebrow">Meet us on the tracks</p><h1>Easy to find. <em>Hard to leave.</em></h1><p>Find Rosey Baby on South Jackson Street along the railroad tracks, within walking distance of Main Street in downtown Starkville.</p><address>{address}</address><div className="action-row"><a className="button button-primary" href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}>Google Maps</a><a className="button" href={`https://maps.apple.com/?daddr=${query}`}>Apple Maps</a></div></div><iframe className="visit-map" title="Map showing Rosey Baby in Starkville" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${query}&output=embed`} /></section>
    <section className="visit-details"><article><p className="eyebrow">Hours</p><h2>Monday–Saturday</h2><p>11 AM–10 PM<br />Sunday closed</p></article><article><p className="eyebrow">Good to know</p><h2>Bring the whole crew</h2><p>There is plenty of parking. Large parties should make a reservation so the team can have your table ready.</p></article><article><p className="eyebrow">Call us</p><h2><a href="tel:+16623241949">662-324-1949</a></h2><p>Call for seasonal crawfish availability, large parties, or general questions.</p></article></section>
  </main>;
}
