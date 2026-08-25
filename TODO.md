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
- Minor polish: `app/layout.tsx` icons all point at the same full-size `rosey-baby-logo-reference.png` for `icon`/`shortcut`/`apple` (browser-scaled, not purpose-sized — an Apple touch icon is ideally a 180×180 non-transparent square). There's also an unused, unreferenced `public/favicon.svg` sitting alongside it.

## Engineering and operations

- [Found 2026-08-25] `/api/health` returned 503 for ~26 hours (2026-08-24 ~10:54 UTC to 2026-08-25 ~12:57 UTC, 32 of 60 uptime checks failed) before self-recovering when the weekly Monday sync cron ran successfully. Root cause not fully diagnosed — the health document's `status` field going bad a day before the scheduled weekly cron ran doesn't match simple staleness (216h threshold), so something else touched `calendar-sync-status` in Sanity. Investigate what changed it, and consider whether the sync cron's weekly cadence is too infrequent given a single bad run can leave health red for up to a week with only a 15-minute-interval GitHub Actions check as the sole alarm.
- [Confirmed broken 2026-08-25, needs manual fix] GitHub Actions email notifications for failed workflows are NOT reaching the user — confirmed against the real incident above (32 failed runs, zero noticed emails). Can't be fixed from the repo/CLI; it's a personal account setting. Go to github.com/settings/notifications → "Actions" row → make sure "Email" is checked (not just "Web"), and confirm the notification email address under github.com/settings/emails is monitored. Also check github.com/sajamills/roseyBaby → Watch button is set to "All Activity" or "Custom → Actions", not "Ignore".
- Remaining npm audit findings (9, down from 22) are all inside `@sanity/cli`'s framework-detection dependency chain (`@vercel/frameworks` → `js-yaml`/`smol-toml`, `typeid-js` → `uuid`), used only by local `sanity dev`/CLI tooling, not the deployed app. `sanity@6.10.1`/`@sanity/cli@8.3.0` are already the latest published versions and npm's only "fix" is downgrading to `sanity@5.14.1` (a major regression) — no real fix exists upstream yet. Revisit by periodically re-running `npm audit` to see if Sanity ships a patch.

## Launch QA audit (friend review, 2026-08-24)

A friend ran an external audit against the site before the domain cutover fully propagated. Most findings are now resolved — see "Completed August 25, 2026" below. Remaining open items:

- [High] Test the catering form (and any other form) end-to-end as a real customer: required-field/invalid-input handling, inline error messages, actual email delivery to a monitored inbox, customer confirmation, spam/rate-limiting, duplicate-submission handling, keyboard-only completion, 200% zoom, privacy disclosure, and a clear success screen. Still blocked: a `RESEND_ACCESS_TOKEN` was added to `.env.local` on 2026-08-25, but there is no Typeform-webhook-to-Resend integration built yet (no webhook receiver route exists in `app/api/`) — this needs a real design/build session (webhook endpoint, signature verification, email template, and a decision on whether it replaces or supplements Typeform's own notification email), not just a config tweak.
- [Launch checklist] Two sub-items open: (1) OG/social share images are still generic/shared, not dedicated per major page (see Design and growth). (2) Structured-data completeness (address/phone/hours/cuisine/menu URL/price range/reservation URL/socials) — JSON-LD exists sitewide via the shared `JsonLd` component but hasn't been checked field-by-field against this exact list.

## PageSpeed Insights audit (2026-08-25)

User-pasted PageSpeed report for `roseybaby.com` (mobile 79 / desktop 100 performance; accessibility 95; best practices 100; SEO 100). Open items:

- [Mobile performance] Largest Contentful Paint is 4.7s on mobile (slow-4G throttled) vs. 0.6s desktop — investigate the LCP breakdown/3rd-party and network-dependency-tree insights PageSpeed flagged, since the gap between mobile and desktop suggests render-blocking or 3rd-party-script delay rather than a raw asset-size problem.
- [Mobile performance] Reduce unused JavaScript (~96 KiB estimated savings) and legacy JavaScript (~15 KiB) flagged by PageSpeed; also 3 long main-thread tasks found on mobile (1 on desktop).
- [Performance] Improve image delivery (9 KiB mobile / 160 KiB desktop estimated savings) and address the render-blocking-requests insight.
- [Accessibility, score 95] Fix insufficient color contrast between background and foreground text somewhere on the page (Lighthouse contrast audit) — likely in the dark charcoal theme's secondary/muted text.
- [Accessibility/Best Practices] Fix "Identical links have the same purpose" — find repeated link text (e.g., multiple "Reserve a table" or "Read more"-style links) that isn't clearly disambiguated for screen-reader users tabbing through the link list.
- [Best Practices, informational] Lighthouse's Trust & Safety checks list "Ensure CSP is effective against XSS attacks," "Use a strong HSTS policy," "Ensure proper origin isolation with COOP," and "Mitigate DOM-based XSS with Trusted Types." Score is currently 100 so these may not be failing, but re-run Lighthouse after the new `Content-Security-Policy` header ships (added 2026-08-25, uses `'unsafe-inline'` for both script-src and style-src — no nonce, see `next.config.ts` for why) and consider adding `Strict-Transport-Security` and `Cross-Origin-Opener-Policy` headers, which aren't set yet.

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
- Added a Content Security Policy (`next.config.ts`, one policy for `/studio`, a stricter one for the rest of the site). Caught and fixed a critical regression during QA: the initial `style-src 'self'` (no `unsafe-inline`) silently made browsers drop the inline `style` attribute Next's `<Image fill>` uses for positioning on every hero image sitewide, which blew out several hero sections' layout (worst at ~768–820px width, e.g. `/events`, where the heading and body copy overflowed off-screen). Fixed by adding `'unsafe-inline'` to style-src; verified the fix on `/events`, `/catering`, `/our-story`, and the homepage. Deliberately did not use a nonce-based CSP — it requires `headers()` per request, which opts every route out of static generation/ISR (verified: it turned all `○`/`●` prerendered routes into `ƒ` dynamic ones in a real build).
- Added a real automated integration test for the event cron's authenticated success path (`tests/cron-sync.test.mjs`) — imports the actual route handler via a small Node loader that resolves the `@/*` path alias and native-TypeScript-strips it (`tests/helpers/register-alias-loader.mjs`), and mocks the two sync sources with `node:test`'s `mock.module` so it doesn't depend on live third-party APIs or real Sanity credentials.
- Reviewed and remediated the npm security report on a `chore/npm-audit-remediation` branch (not merged/pushed yet): ran the non-breaking `npm audit fix` (22 → 12 vulnerabilities), then upgraded `next`/`eslint-config-next` from an exact `16.2.12` pin to `16.3.2` (12 → 9), which resolved the postcss/sharp findings. The remaining 9 are an unfixable-for-now Sanity CLI dev-tooling chain — see "Engineering and operations" above.
- Confirmed the `sites` git remote concern is moot (only `origin` exists, push works) and confirmed — via a live incident — that GitHub Actions failure emails are not reaching the user; both written up under "Engineering and operations" above.
- Fixed a real accessibility gap found during a responsive/keyboard QA pass: outside of the mobile hamburger menu and the Our Story family-store grid, no interactive element (header nav, hero buttons, footer links, tel/mailto links) had any explicit `:focus-visible` style — added one globally in `app/globals.css` (the same red outline already used in those two spots) so keyboard focus is reliably visible everywhere. Verified contact links (tel/mailto/directions) are all real `<a>` tags, not JS-only handlers, and that the four external `target="_blank"` links (Our Story family-store cards) already have `rel="noreferrer"` and accessible labels.
- Spot-checked layout at 768/820/1024/1280px (after the CSP style-src fix above) — clean at all four widths, and confirmed the homepage's fixed mobile bottom action bar has generous footer `padding-bottom` clearance so it doesn't cover footer content.
- Confirmed unique per-page titles/descriptions exist for all of Menu, Crawfish, Beer Wall, Catering, Events, Starkville, Blog, Our Story, and Visit, and confirmed `NEXT_PUBLIC_GA_MEASUREMENT_ID` is scoped to the Production environment only in Vercel, so analytics does not fire on preview/staging deployments.
- Fixed a latent bug found while touching `next.config.ts` for CSP: `images.remotePatterns` had no entry for `cdn.sanity.io`, even though blog/event `imageUrl` can resolve to a Sanity-hosted asset URL passed straight into `next/image` — would have thrown a runtime "hostname not configured" error the first time a Sanity-sourced (non-fallback) image was actually used.

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
