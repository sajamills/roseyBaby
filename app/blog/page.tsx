import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { getPosts } from "@/lib/editorial";
import HeroImage from "@/components/HeroImage";

export const metadata: Metadata = {
  title: "News, Guides & Stories",
  description:
    "Rosey Baby news, Starkville game-day guides, crawfish updates, catering ideas, and stories from the railroad tracks.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="editorial-hero">
        <HeroImage src="/rosey-originals/entrees.jpg" alt="A Rosey Baby entrée" priority />
        <div>
          <p className="eyebrow">From the tracks</p>
          <h1>
            News, guides &<br />
            <em>Starkville stories.</em>
          </h1>
          <p>
            Crawfish updates, game-day plans, local traditions, and the people
            and plates behind Rosey Baby.
          </p>
        </div>
      </section>
      <section className="post-grid">
        {posts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            className={
              index === 0 ? "post-card post-card-featured" : "post-card"
            }
            key={post.slug}
          >
            <span className="post-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="eyebrow">{post.category}</p>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <strong>Read story →</strong>
          </Link>
        ))}
      </section>
    </main>
  );
}
