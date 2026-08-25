# Rosey Baby working backlog

## Launch blockers

- DNS cutover is complete — `roseybaby.com`/`www.roseybaby.com` now point to Vercel and serve the live site.
- Sign into Sanity and create the publishing webhook described in `README.md`.
- Confirm GA4 receives production traffic now that the domain cutover is live.
- Complete Google Search Console verification now that the domain resolves to Vercel.
- Complete Bing Webmaster verification now that the domain resolves to Vercel.
- Connect a real online-ordering provider; the `/order` CTA was changed to "Call to order" in the meantime since ordering isn't wired up yet.
- Update every Typeform completion/thank-you link to the final production domain at launch.
- Finish the Resend email integration (DNS verification for `roseybaby.com` is in progress as of 2026-08-25) so Typeform inquiries send a real email notification instead of relying on Typeform's own delivery.
- Manually confirm in the Typeform dashboard that all three forms' notification email is set to `meetyouonthetracks@gmail.com`.

## Content and integrations

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

A friend ran an external audit against the site before the domain cutover fully propagated. Most findings are now resolved — see "Completed August 25, 2026" below. Remaining open items:

- [High] Test the catering form (and any other form) end-to-end as a real customer: required-field/invalid-input handling, inline error messages, actual email delivery to a monitored inbox, customer confirmation, spam/rate-limiting, duplicate-submission handling, keyboard-only completion, 200% zoom, privacy disclosure, and a clear success screen. (Blocked in part on the Resend email integration above.)
- [Medium] Confirm every contact action is a real link, not JS-only (`tel:+16623241949`, `mailto:meetyouonthetracks@gmail.com`, directions), with visible keyboard-focus states, and that external links are clearly labeled.
- [Medium] Test layout at in-between widths (768/820/1024/1280px) and 200% browser zoom, not just phone/desktop — header wrapping, long menu-item names, iPhone safe-area spacing, and whether the mobile bottom bar covers footer content.
- [Launch checklist] Standard technical pre-launch pass: unique title/description per page (Menu, Crawfish, Beer Wall, Catering, Events, Starkville, Blog, Our Story, Visit), structured-data completeness (address/phone/hours/cuisine/menu URL/price range/reservation URL/socials), OG/social share images, favicon/app icons, no console errors or placeholder content, and analytics wired to real conversion actions (reservations, calls, directions, orders, menu views, catering submissions) without firing on staging.

## Completed August 25, 2026

- Fixed a critical live bug: every menu item was showing doubled (144 vs. 72) due to two overlapping ID schemes from historical seed scripts. Deleted the 72 stale duplicates and added defensive de-duplication in `lib/menu.ts`.
- Fixed duplicate events on `/events` (same class of bug) and added event filters: MSU Football / All MSU / All / Arts.
- Updated the live `/menu` content end to end to match the new official 2026 printed menu — 75 items across 10 categories (Starters, Sides, Po-boys & More, Fried to Perfection, Cajun Favorites, Steaks, Chops, Desserts, Cocktails, Shooters) with real prices stored in Sanity. Prices are intentionally not displayed on the public page yet (existing schema design — ask if that should change). Beer list intentionally left off the menu page; it stays on `/beer-wall`. The OpenTable-hosted menu was also updated (by the user, directly).
- Replaced 7 of 8 site photos with new Rosey Baby originals, added a catering photo and a Curt/Our-Story photo, and added a 10-photo food/drink gallery to `/menu`.
- Fixed mobile UI bugs: black photo placeholder boxes before images loaded, and buttons all rendering the same color due to a CSS specificity conflict.
- Implemented the friend's QA audit plan: mobile-nav keyboard accessibility (Escape to close, focus management, dynamic aria-label), a "Skip to main content" link, more specific image alt text, footer additions (copyright line, Privacy and Accessibility pages, Catering and Reserve-a-table links), and softened "live Louisiana crawfish" wording with season/availability caveats on the hero, `/crawfish`, and `/menu`.
- Added 301 redirects from old WordPress URLs (`/menu/apps/`, `/contact`, etc.) to their closest new page, and added a branded custom 404 page.
- Fixed a GitHub Actions uptime-monitor bug that was sending false-positive failure emails (health check required all sync sources to succeed in the same run instead of tolerating one transient failure) and cleared the already-stale stored state.
- Responded to a pasted SEO/PageSpeed audit: canonical domain fixed to `www.roseybaby.com`, `Restaurant`+`LocalBusiness` schema, AVIF/WebP image formats.
- Exported all three Typeform question sets to a PDF for stakeholder review.
- Diagnosed and fixed the Sanity Studio "X-Frame-Options" load error; changed the "Order online" CTA to "Call to order" since online ordering isn't wired up yet.

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
