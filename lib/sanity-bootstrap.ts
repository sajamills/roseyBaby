import { createClient } from "@sanity/client";
import menu from "@/content/menu.json";
import { fallbackEvents, fallbackPosts } from "@/lib/editorial";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const faqs = [
  ["When is crawfish season in Starkville?", "Rosey Baby generally serves fresh Louisiana crawfish from January through June. The exact start, availability, and market price depend on the Louisiana catch, so call or check Facebook before a crawfish-only trip.", "Crawfish"],
  ["Does Rosey Baby serve all-you-can-eat crawfish?", "Rosey Baby offers seasonal all-you-can-eat crawfish and crawfish platters with corn, sausage, and potatoes. Availability can change by day.", "Crawfish"],
  ["Can Rosey Baby cater an on-site crawfish boil?", "Yes. Rosey Baby provides on-site boils, food delivery, staffed bars, and full-service catering for weddings, MSU events, Greek events, companies, and private parties.", "Catering"],
  ["How far in advance should I book catering?", "Please inquire at least one week ahead. Larger weddings, game-day events, and staffed bar services should be planned earlier when possible.", "Catering"],
  ["Can Rosey Baby handle large parties?", "Yes. There is ample parking, and large parties should reserve in advance so the team can prepare the right seating and service plan.", "Visit"],
  ["Where is Rosey Baby?", "Rosey Baby is at 300 South Jackson Street in Starkville, along the railroad tracks and within walking distance of Main Street.", "Visit"],
  ["What are Rosey Baby’s hours?", "Rosey Baby is open Monday through Saturday from 11 AM until 10 PM and closed Sunday. Holiday and event hours may vary.", "Visit"],
  ["Does Rosey Baby have craft beer?", "Yes. Rosey Baby has a large rotating beer wall with local and regional beer, IPAs, sours, stouts, lagers, and seasonal releases.", "Beer"],
];

const pageSettings = [
  ["Crawfish", "crawfish", "Louisiana crawfish · January–June", "Fresh Louisiana crawfish, platters, all-you-can-eat nights, and catered boils in Starkville."],
  ["Catering", "catering", "Full-service catering", "Weddings, MSU events, Greek life, crawfish boils, fish fries, staffed bars, and private parties."],
  ["Beer Wall", "beer-wall", "Rotating craft beer in Starkville", "Local beer, IPAs, sours, stouts, lagers, and seasonal releases."],
  ["Our Story", "our-story", "Family owned · On the tracks since 1995", "The Crissey family story behind Rosey Baby and Starkville’s live-crawfish tradition."],
  ["Visit", "visit", "Meet us on the tracks", "Hours, parking, directions, reservations, and contact information for Rosey Baby."],
  ["Starkville Guide", "starkville", "A local guide from the tracks", "Current events, MSU weekends, family activities, date ideas, and practical Starkville itineraries."],
];

export async function bootstrapSanityContent() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) throw new Error("A Sanity project ID and SANITY_API_WRITE_TOKEN are required.");
  const client = createClient({ projectId, dataset, token, apiVersion: "2026-07-31", useCdn: false });
  const categories = [...new Set(menu.map(item => item.category))];
  const tx = client.transaction();

  categories.forEach((name, order) => tx.createOrReplace({
    _id: `menu-category-${slugify(name)}`, _type: "menuCategory", name,
    slug: { _type: "slug", current: slugify(name) }, order,
  }));
  menu.forEach((item, order) => tx.createOrReplace({
    _id: `menu-item-${slugify(item.category)}-${slugify(item.name)}`, _type: "menuItem",
    name: item.name, slug: { _type: "slug", current: slugify(item.name) }, description: item.description,
    category: { _type: "reference", _ref: `menu-category-${slugify(item.category)}` },
    seasonal: "seasonal" in item ? Boolean(item.seasonal) : false, available: true, verifiedAt: new Date().toISOString(), order,
  }));
  fallbackPosts.forEach(post => tx.createOrReplace({
    _id: `blog-post-${post.slug}`, _type: "blogPost", ...post,
    slug: { _type: "slug", current: post.slug }, featured: post.slug === "how-to-host-crawfish-boil-starkville",
  }));
  fallbackEvents.filter(event => event.eventType !== "Football").forEach((event, order) => tx.createIfNotExists({
    _id: `editorial-event-${slugify(event.title)}`, _type: "event", ...event,
    slug: { _type: "slug", current: `${slugify(event.title)}-${order + 1}` }, city: "Starkville", region: "MS",
    organizer: event.eventType === "Starkville event" ? "Starkville Main Street" : "Mississippi State University",
  }));
  faqs.forEach(([question, answer, category], order) => tx.createOrReplace({
    _id: `faq-${slugify(question)}`, _type: "faq", question, answer, category, order, verifiedAt: new Date().toISOString(),
  }));
  pageSettings.forEach(([title, slug, eyebrow, intro]) => tx.createOrReplace({
    _id: `page-${slug}`, _type: "page", title, slug: { _type: "slug", current: slug }, eyebrow, intro,
    lastReviewedAt: new Date().toISOString(), seo: { title, description: intro, noIndex: false },
  }));
  tx.createOrReplace({ _id: "crawfish-status", _type: "crawfishStatus", status: "Call for availability", message: "Fresh Louisiana crawfish are generally available January through June. Call for today’s availability." });
  [
    ["General catering", "general-catering", process.env.NEXT_PUBLIC_CATERING_TYPEFORM_URL],
    ["On-site crawfish boils", "crawfish-boils", process.env.NEXT_PUBLIC_CRAWFISH_TYPEFORM_URL],
    ["Bartending services", "bartending", process.env.NEXT_PUBLIC_BARTENDING_TYPEFORM_URL],
  ].forEach(([title, slug, formUrl], order) => tx.createOrReplace({
    _id: `catering-service-${slug}`, _type: "cateringService", title,
    slug: { _type: "slug", current: slug }, summary: "Full-service Rosey Baby event support in Starkville and the surrounding area.",
    ...(formUrl ? { formUrl } : {}), featured: order === 0,
  }));
  await tx.commit({ visibility: "sync" });
  return { menuCategories: categories.length, menuItems: menu.length, posts: fallbackPosts.length, events: fallbackEvents.length, faqs: faqs.length, pages: pageSettings.length, cateringServices: 3 };
}
