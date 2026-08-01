import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/editorial";
import { getEvents } from "@/lib/editorial";
import { starkvilleGuides } from "@/lib/starkville-guides";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const events = await getEvents();
  const pages: Array<{ path: string; frequency: "weekly" | "monthly"; priority: number }> = [
    { path: "", frequency: "weekly", priority: 1 },
    { path: "/menu", frequency: "weekly", priority: 0.95 },
    { path: "/crawfish", frequency: "weekly", priority: 0.9 },
    { path: "/catering", frequency: "monthly", priority: 0.9 },
    { path: "/events", frequency: "weekly", priority: 0.85 },
    { path: "/beer-wall", frequency: "weekly", priority: 0.8 },
    { path: "/visit", frequency: "monthly", priority: 0.8 },
    { path: "/our-story", frequency: "monthly", priority: 0.7 },
    { path: "/blog", frequency: "weekly", priority: 0.75 },
    { path: "/starkville", frequency: "weekly", priority: 0.9 },
  ];

  return [
    ...pages.map(page => ({ url: `${siteUrl}${page.path}`, lastModified: new Date(), changeFrequency: page.frequency, priority: page.priority })),
    ...posts.map(post => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.65 })),
    ...events.map(event => ({ url: `${siteUrl}/events/${event.slug}`, lastModified: event.startsAt ? new Date(event.startsAt) : new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...starkvilleGuides.map(guide => ({ url: `${siteUrl}/starkville/${guide.slug}`, lastModified: new Date("2026-07-31"), changeFrequency: "weekly" as const, priority: 0.75 })),
  ];
}
