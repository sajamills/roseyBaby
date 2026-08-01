import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("production configuration includes essential security headers", async () => {
  const config = await read("next.config.ts");
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Permissions-Policy/);
});

test("SEO infrastructure includes sitemap, crawler rules, and structured data", async () => {
  const [robots, sitemap, seo, layout] = await Promise.all([
    read("app/robots.ts"),
    read("app/sitemap.ts"),
    read("lib/seo.ts"),
    read("app/layout.tsx"),
  ]);
  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /sitemap/i);
  assert.match(sitemap, /blog/);
  assert.match(sitemap, /events/);
  assert.match(seo, /Restaurant/);
  assert.match(layout, /application\/ld\+json/);
});

test("Sanity Studio is mounted at the embedded production path", async () => {
  const [config, studio] = await Promise.all([
    read("sanity.config.ts"),
    read("app/studio/[[...tool]]/page.tsx"),
  ]);
  assert.match(config, /basePath:\s*["']\/studio["']/);
  assert.match(studio, /NextStudio/);
});

test("cron and webhook endpoints require secrets", async () => {
  const [cron, webhook] = await Promise.all([
    read("app/api/cron/sync-sports/route.ts"),
    read("app/api/revalidate/route.ts"),
  ]);
  assert.match(cron, /CRON_SECRET/);
  assert.match(cron, /Unauthorized/);
  assert.match(webhook, /SANITY_WEBHOOK_SECRET/);
  assert.match(webhook, /Unauthorized/);
});

test("event sync exposes a freshness health check", async () => {
  const health = await read("app/api/health/route.ts");
  assert.match(health, /calendar-sync-status/);
  assert.match(health, /lastSuccessfulAt/);
  assert.match(health, /216/);
  assert.match(health, /503/);
});

test("public content retains fallbacks when Sanity is unavailable", async () => {
  const [menu, editorial] = await Promise.all([
    read("lib/menu.ts"),
    read("lib/editorial.ts"),
  ]);
  assert.match(menu, /fallbackMenu/);
  assert.match(menu, /catch\s*\{/);
  assert.match(editorial, /fallbackPosts/);
  assert.match(editorial, /fallbackEvents/);
  assert.match(editorial, /catch\s*\{/);
});
