const baseUrl = (
  process.env.SITE_URL || "https://rosey-woad.vercel.app"
).replace(/\/$/, "");
const coreRoutes = [
  "/",
  "/menu",
  "/crawfish",
  "/beer-wall",
  "/catering",
  "/our-story",
  "/visit",
  "/blog",
  "/events",
  "/starkville",
  "/studio",
  "/api/health",
  "/robots.txt",
  "/sitemap.xml",
];

async function request(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response;
}

for (const route of coreRoutes) await request(route);

const home = await (
  await request("/", { headers: { accept: "text/html" } })
).text();
if (!home.includes('rel="canonical"'))
  throw new Error("Homepage canonical URL is missing");
if (!home.includes('type="application/ld+json"'))
  throw new Error("Homepage JSON-LD is missing");

for (const [, json] of home.matchAll(
  /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
)) {
  JSON.parse(json.replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
}

const order = await (
  await request("/order", { headers: { accept: "text/html" } })
).text();
if (!order.includes("noindex"))
  throw new Error("Placeholder order page must remain noindex");

const unauthenticatedWebhook = await fetch(`${baseUrl}/api/revalidate`, {
  method: "POST",
});
if (unauthenticatedWebhook.status !== 401)
  throw new Error("Webhook authorization guard failed");

const sitemap = await (await request("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
if (urls.length < 20)
  throw new Error(`Sitemap unexpectedly contains only ${urls.length} URLs`);

console.log(
  `Production smoke test passed for ${baseUrl}: ${coreRoutes.length} core routes and ${urls.length} sitemap URLs.`,
);
