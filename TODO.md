# Rosey Baby working backlog

## Launch blockers

- Sign into Sanity and create the publishing webhook described in `README.md`.
- Update Bluehost DNS for both `roseybaby.com` and `www.roseybaby.com` to the Vercel value `76.76.21.21`, then verify redirects, SSL, canonical URLs, sitemap, forms, and the webhook. Both hostnames are already attached to the Vercel project.
- Confirm GA4 receives production traffic after the final domain cutover.
- Complete Google Search Console verification after the final domain resolves to Vercel.
- Complete Bing Webmaster verification after the final domain resolves to Vercel.
- Connect the real online-ordering provider; keep `/order` noindexed until then.
- Update every Typeform completion/thank-you link to the final production domain at launch.

## Content and integrations

- Add prices or explicit market-price labels to all 72 Sanity menu items.
- Add Sanity images to the seven blog posts and priority upcoming events.
- Enrich the 65 events missing a street address and 61 events missing an end time where official sources provide the data.
- Add catering menus, packages, pricing guidance, and approved venue relationships to Sanity.
- Add historical photos, menus, newspaper clippings, and family materials to Our Story.
- Add fuller histories and approved photographs for Down the Hatch, Coconuts, Brewski’s, and Bulldog Package Store.
- Connect the beer wall to Untappd for Business when endpoint credentials are available.
- Confirm Facebook/Main Street event coverage manually and document a stable permitted source or workflow.
- Add real ordering, ticket, organizer, address, image, and end-date data to events when available.

## Design and growth

- Prototype the proposed warm charcoal dark theme in a Vercel preview before replacing the current light visual system.
- Produce dedicated Open Graph images for the homepage, major service pages, articles, and guides.
- Continue replacing weak or generic photography with approved Rosey Baby originals.
- Register Google Search Console, Bing Webmaster Tools, GA4 conversions, Bing Places, Apple Business Connect, and other local profiles.
- Monitor indexing and expand `/starkville` guides based on real Search Console queries.

## Engineering and operations

- Review and remediate the current npm security report in a preview branch; avoid an unreviewed `npm audit fix --force` because most high-severity findings are transitive through Next.js image tooling and Sanity’s CLI/build stack.
- Add a Content Security Policy compatible with the embedded Sanity Studio. The other baseline security headers are complete.
- Add an automated integration test for the event cron’s authenticated success path. Production routes, JSON-LD, noindex, webhook authorization, health checks, and Sanity fallback behavior are covered.
- Confirm GitHub Actions email notifications are enabled for failed uptime workflows.
- Replace or authenticate the current `sites` Git remote so local commits can be pushed reliably.

## Completed August 1, 2026

- Added `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy` headers.
- Pinned the application and Vercel builds to Node.js 24 LTS.
- Replaced obsolete starter tests with Rosey Baby configuration and production smoke tests.
- Added `/api/health` with sync freshness, status, and source counts.
- Removed unused Cloudflare, Vite, vinext, Wrangler, Drizzle, and RSC development dependencies from the production project manifest.
- Added first-party image fallbacks and social metadata for all seven existing articles while preserving Sanity image overrides.
- Attached `roseybaby.com` and `www.roseybaby.com` to the Vercel project; Bluehost DNS is the remaining cutover step.
- Expanded future event imports to retain official source images and community postal codes and to add the verified Davis Wade Stadium address to football events.
- Added GA4, Google Search Console, and Bing Webmaster verification configuration.
- Added a GitHub Actions uptime monitor for the public site, event-sync health, and sitemap every 15 minutes.
