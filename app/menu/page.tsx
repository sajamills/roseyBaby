import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getMenu } from "@/lib/menu";
import { siteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;
export const metadata: Metadata = { title: "Menu", description: "Explore Rosey Baby’s Cajun specialties, seafood, po-boys, wings, cocktails, and desserts in Starkville, Mississippi.", alternates: { canonical: "/menu" } };

const galleryPhotos = [
  { src: "/rosey-originals/gallery/etouffee.jpg", alt: "Shrimp and chicken étouffée with fried fish at Rosey Baby" },
  { src: "/rosey-originals/gallery/charbroiled-oysters.jpg", alt: "Char-broiled oysters at Rosey Baby" },
  { src: "/rosey-originals/gallery/hurricane.jpg", alt: "A hurricane cocktail at Rosey Baby's bar" },
  { src: "/rosey-originals/gallery/burger.jpg", alt: "A Rosey Baby cheeseburger and fries" },
  { src: "/rosey-originals/gallery/beer-taps.jpg", alt: "The Rosey Baby beer tap wall" },
  { src: "/rosey-originals/gallery/seafood-pasta.jpg", alt: "Seafood pasta at Rosey Baby" },
  { src: "/rosey-originals/gallery/daiquiris.jpg", alt: "Frozen daiquiris at Rosey Baby" },
  { src: "/rosey-originals/gallery/mac-and-cheese.jpg", alt: "Mac and cheese with sausage and bacon at Rosey Baby" },
  { src: "/rosey-originals/gallery/shrimp-tacos.jpg", alt: "Fried shrimp tacos at Rosey Baby" },
  { src: "/rosey-originals/gallery/bar-bottles.jpg", alt: "The bar at Rosey Baby" },
];

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
  return <main id="main-content" className="menu-page">
    <JsonLd data={menuJsonLd} />
    <SiteHeader />
    <section className="page-hero menu-hero"><p className="eyebrow">Food from the tracks</p><h1>The Menu</h1><p>Elevated Cajun roots, Starkville favorites, and no shortage of flavor. Prices and availability may change; ask your server for current details.</p></section>
    <section className="menu-gallery" aria-label="Photos of Rosey Baby food and drinks">{galleryPhotos.map(photo => <div key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw" /></div>)}</section>
    <nav className="menu-jump" aria-label="Menu categories">{Object.keys(grouped).map(category => <a href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} key={category}>{category}</a>)}</nav>
    <div className="menu-groups">{Object.entries(grouped).map(([category, items]) => <section className="menu-group" id={category.toLowerCase().replace(/[^a-z0-9]+/g,"-")} key={category}><p className="eyebrow">Rosey Baby</p><h2>{category}</h2><div className="menu-items">{items.map(item => <article key={`${category}-${item.name}`}><div><h3>{item.name}</h3>{item.seasonal && <span className="seasonal-tag">Seasonal</span>}</div><p>{item.description}</p></article>)}</div></section>)}</div>
    <p className="allergen-note"><strong>Allergen notice:</strong> Please tell your server about allergies before ordering. Our kitchen handles common allergens and cannot guarantee an allergen-free environment.</p>
    <p className="allergen-note"><strong>Seasonal items:</strong> Crawfish season and availability vary based on weather and supply. Call or check our latest update before visiting.</p>
  </main>;
}
