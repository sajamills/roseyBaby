import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getMenu } from "@/lib/menu";
import { safeJsonLd, siteUrl } from "@/lib/seo";

export const revalidate = 300;
export const metadata: Metadata = { title: "Menu", description: "Explore Rosey Baby’s Cajun specialties, seafood, po-boys, wings, cocktails, and desserts in Starkville, Mississippi.", alternates: { canonical: "/menu" } };

export default async function MenuPage() {
  const menu = await getMenu();
  const grouped = menu.reduce<Record<string, typeof menu>>((all, item) => { (all[item.category] ||= []).push(item); return all; }, {});
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: "Rosey Baby Menu",
    url: `${siteUrl}/menu`,
    inLanguage: "en-US",
    mainEntityOfPage: `${siteUrl}/menu`,
    hasMenuSection: Object.entries(grouped).map(([category, items]) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: items.map(item => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
      })),
    })),
  };
  return <main className="menu-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(menuJsonLd) }} />
    <SiteHeader />
    <section className="page-hero menu-hero"><p className="eyebrow">Food from the tracks</p><h1>The Menu</h1><p>Elevated Cajun roots, Starkville favorites, and no shortage of flavor. Prices and availability may change; ask your server for current details.</p></section>
    <nav className="menu-jump" aria-label="Menu categories">{Object.keys(grouped).map(category => <a href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} key={category}>{category}</a>)}</nav>
    <div className="menu-groups">{Object.entries(grouped).map(([category, items]) => <section className="menu-group" id={category.toLowerCase().replace(/[^a-z0-9]+/g,"-")} key={category}><p className="eyebrow">Rosey Baby</p><h2>{category}</h2><div className="menu-items">{items.map(item => <article key={`${category}-${item.name}`}><div><h3>{item.name}</h3>{item.seasonal && <span className="seasonal-tag">Seasonal</span>}</div><p>{item.description}</p></article>)}</div></section>)}</div>
    <p className="allergen-note"><strong>Allergen notice:</strong> Please tell your server about allergies before ordering. Our kitchen handles common allergens and cannot guarantee an allergen-free environment.</p>
  </main>;
}
