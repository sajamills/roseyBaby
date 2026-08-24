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

## Launch QA audit (friend review, 2026-08-24)

A friend ran an external audit against the site before the domain cutover fully propagated. Note: the audit's #1 finding (canonical domain / redirects / noindex staging) appears to be based on stale/cached data — `roseybaby.com` now correctly redirects to `www.roseybaby.com`, and canonical tags, sitemap.xml, robots.txt, and OG/JSON-LD URLs were already fixed to use `https://www.roseybaby.com` on 2026-08-24. The old-WordPress-URL redirect mapping below is still real and open.

- [Launch blocker] Add 301 redirects (or proper 410s) from old WordPress URLs to the closest new page, so search rankings/backlinks survive the cutover: `/contact/` → `/visit`, `/menu/apps/`, `/menu/entrees/`, `/menu/drinks/`, `/menu/dessert/` → `/menu` (or menu section anchors), plus any other indexed WordPress category/tag/archive URLs.
- [High] The linked OpenTable listing still shows a stale menu (last updated Feb 2022, old prices, "Fried Crowfish Tails" typo). Update it, ask OpenTable to unlink/remove the menu tab in favor of the site's `/menu`, or confirm it matches before launch.
- [High] Reconcile `/menu` line-by-line against the real current menu: item names/descriptions, prices, sides/substitutions, market-price crawfish language, alcohol/age language, spelling of Cajun terms (po'boy, étouffée, etc.), raw-oyster/undercooked-food advisory, allergen language, and consistency with DoorDash/Grubhub/OpenTable/printed menus (these currently disagree with each other and should have one designated source of truth).
- [High] Test the catering form (and any other form) end-to-end as a real customer: required-field/invalid-input handling, inline error messages, actual email delivery to a monitored inbox, customer confirmation, spam/rate-limiting, duplicate-submission handling, keyboard-only completion, 200% zoom, privacy disclosure, and a clear success screen.
- [High] Verify the `BusinessStatus` open/closed indicator explicitly uses `America/Chicago`, updates without a redeploy, handles DST, doesn't flash the wrong status during hydration, and says what's next (e.g. "Closed · opens Monday at 11 AM") rather than just open/closed.
- [Medium] Soften "live Louisiana crawfish" in the hero so it doesn't read as year-round — pair it with season/availability language on the hero, `/crawfish`, and `/menu` (e.g. "season and availability vary based on weather and supply — call or check our latest update").
- [Medium] Improve image alt text specificity (name the actual dish/scene instead of generic phrasing like "A dish served at Rosey Baby"); confirm purely decorative labels (e.g. feature-card numbering) aren't announced to screen readers.
- [Medium] Verify mobile nav accessibility when closed: excluded from tab order, `aria-hidden`, focus moves into the menu on open and back to the toggle on close, Escape closes it, and the toggle announces "Open/Close navigation" rather than just "Menu." Consider adding a "Skip to main content" link.
- [Medium] Confirm every contact action is a real link, not JS-only (`tel:+16623241949`, `mailto:meetyouonthetracks@gmail.com`, directions), with visible keyboard-focus states, and that external links are clearly labeled.
- [Medium] Test layout at in-between widths (768/820/1024/1280px) and 200% browser zoom, not just phone/desktop — header wrapping, long menu-item names, iPhone safe-area spacing, and whether the mobile bottom bar covers footer content.
- [Low–medium] Add footer links for Instagram/Facebook/Untappd, a Privacy Policy, an Accessibility statement, and a copyright line; consider a branded domain email (e.g. `hello@roseybaby.com`) instead of Gmail.
- [Launch checklist] Standard technical pre-launch pass: unique title/description per page (Menu, Crawfish, Beer Wall, Catering, Events, Starkville, Blog, Our Story, Visit), structured-data completeness (address/phone/hours/cuisine/menu URL/price range/reservation URL/socials), OG/social share images, favicon/app icons, custom 404, no console errors or placeholder content, and analytics wired to real conversion actions (reservations, calls, directions, orders, menu views, catering submissions) without firing on staging.

## Completed August 1, 2026

- Replaced the white visual system with a warm charcoal dark brand theme, cream typography, Rosey red actions, brass accents, and dark reading panels.
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
