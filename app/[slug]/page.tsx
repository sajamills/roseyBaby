import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

const pages: Record<string, { eyebrow: string; title: string; intro: string; items: string[] }> = {
  order: { eyebrow: "Order online", title: "Rosey Baby To Go", intro: "The ordering provider will connect here once the current service and URL are confirmed.", items: ["Pickup", "Delivery", "Group orders"] },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.title, description: page.intro, alternates: { canonical: `/${slug}` }, robots: slug === "order" ? { index:false, follow:false } : undefined } : {};
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <main className="inner-page">
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>
      <section className="placeholder-list">
        {page.items.map((item, i) => <div key={item}><span>0{i + 1}</span><h2>{item}</h2><p>Content and photography will be added through Sanity.</p></div>)}
      </section>
      <Link className="back-home" href="/">← Back to home</Link>
    </main>
  );
}
