import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { fallbackPosts, getPost } from "@/lib/editorial";
import { notFound } from "next/navigation";
import { safeJsonLd, siteUrl } from "@/lib/seo";
import Image from "next/image";

export function generateStaticParams() {
  return fallbackPosts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
          type: "article",
          title: post.title,
          description: post.excerpt,
          publishedTime: post.publishedAt,
          images: [post.imageUrl || "/rosey-originals/header.jpg"],
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          images: [post.imageUrl || "/rosey-originals/header.jpg"],
        },
      }
    : {};
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        image: [post.imageUrl || `${siteUrl}/rosey-originals/header.jpg`],
        author: { "@type": "Organization", name: "Rosey Baby" },
        publisher: { "@id": `${siteUrl}/#restaurant` },
        mainEntityOfPage: `${siteUrl}/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${slug}`,
          },
        ],
      },
    ],
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SiteHeader />
      <article className="article-page">
        <header>
          <p className="eyebrow">
            {post.category} · {date}
          </p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        {post.imageUrl && (
          <figure className="article-image">
            <Image
              src={post.imageUrl}
              alt={`${post.title} — Rosey Baby`}
              fill
              sizes="100vw"
              priority
            />
          </figure>
        )}
        <div className="article-body">
          {post.body
            ?.filter((block) => block._type === "block")
            .map((block) => {
              const copy = block.children?.map((child) => child.text).join("");
              if (block.style === "h2") return <h2 key={block._key}>{copy}</h2>;
              if (block.style === "h3") return <h3 key={block._key}>{copy}</h3>;
              return <p key={block._key}>{copy}</p>;
            })}
        </div>
        <aside>
          <div>
            <h2>
              {post.category === "Crawfish"
                ? "Need crawfish—or the whole boil?"
                : "Meet you on the tracks."}
            </h2>
            <p>
              {post.category === "Crawfish"
                ? "Check Brewski’s for seasonal live crawfish, or let Rosey Baby cater the entire event."
                : "Make Rosey Baby part of your next Starkville visit."}
            </p>
          </div>
          <Link
            className="button button-primary"
            href={post.category === "Crawfish" ? "/catering" : "/visit"}
          >
            {post.category === "Crawfish"
              ? "Plan a catered boil →"
              : "Plan your visit →"}
          </Link>
        </aside>
      </article>
    </main>
  );
}
