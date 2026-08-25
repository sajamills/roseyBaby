# Rosey Baby working backlog

## Launch blockers

- DNS cutover is complete — `roseybaby.com`/`www.roseybaby.com` now point to Vercel and serve the live site.
- Sign into Sanity and create the publishing webhook described in `README.md`.
- Confirm GA4 receives production traffic now that the domain cutover is live.
- Complete Google Search Console verification now that the domain resolves to Vercel.
- Complete Bing Webmaster verification now that the domain resolves to Vercel.
- Connect a real online-ordering provider; the `/order` CTA was changed to "Call to order" in the meantime since ordering isn't wired up yet.
- Update every Typeform completion/thank-you link to the final production domain at launch.
- Manually confirm in the Typeform dashboard that all three forms' notification email is set to `meetyouonthetracks@gmail.com` (belt-and-suspenders alongside the new Resend notification below).

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

## "Wings in Starkville" SEO push (2026-08-25)

Researched the actual SERP (Rosey Baby had zero indexed content mentioning wing night/50-cent wings anywhere — confirmed via live search). Shipped: a new `/starkville/wing-night-starkville` local guide (same answer-engine format as the crawfish-season guide, targets "wing night starkville," "50 cent wings starkville"), a new blog post at `/blog/wing-night-at-rosey-baby`, a Wings promo callout on `/menu` (was previously just one line under Starters), and a 4th homepage feature card. All cross-link to each other and flow into the sitemap automatically.

Still needed — off-page work I can't do myself:

- Add "Wing Night" as a recurring **Google Business Profile post**. A competing bar's Tuesday-wing-night Facebook post is currently outranking every Starkville restaurant's own website for this query, which says social/GBP content is what's actually winning this space right now — a GBP post is the closest equivalent lever available.
- Fix stale wing pricing on the Tripadvisor listing (shows $8/$14 for 6/12 wings; the real, current menu price is $11/$18).
- A few Facebook/Instagram posts consistently using "Wing Night," "Tuesday," and "Starkville."
- [Done 2026-08-25] Real wing photo added (`public/rosey-originals/wings.jpg`) — now used on the blog post, the homepage feature card, and added to the `/menu` gallery.

Also found in passing: the shared `/starkville/[slug]` guide template hardcodes "Updated July 31, 2026" in its byline for every guide regardless of actual publish date (pre-existing, not introduced by this work) — the new wing-night guide shows the same stale date. Worth making that per-guide if guides start getting dated more often.

## Careers page (2026-08-25)

Added `/careers` (nav + footer link), a new live Typeform (`EkhLs3xp`, `NEXT_PUBLIC_CAREERS_TYPEFORM_URL`) with its webhook already registered against the shared `TYPEFORM_WEBHOOK_SECRET` — applications email `meetyouonthetracks@gmail.com` (cc'd to the temporary dev address) the same way catering/crawfish/bartending inquiries do. Note: the Typeform account's plan doesn't support file uploads (`NOT_ALLOWED_FILE-UPLOAD-STORAGE`, a paid-tier feature) — the form asks for a resume link or an email instead of an upload field. Still needed: add `NEXT_PUBLIC_CAREERS_TYPEFORM_URL` to Vercel's Production env (same rollout step every new Typeform needs) and write the real "why work here" specifics (pay, benefits, culture) once the user provides them — the current copy is intentionally generic to avoid inventing facts.

## Engineering and operations

- [Found 2026-08-25] `/api/health` returned 503 for ~26 hours (2026-08-24 ~10:54 UTC to 2026-08-25 ~12:57 UTC, 32 of 60 uptime checks failed) before self-recovering when the weekly Monday sync cron ran successfully. Root cause not fully diagnosed — the health document's `status` field going bad a day before the scheduled weekly cron ran doesn't match simple staleness (216h threshold), so something else touched `calendar-sync-status` in Sanity. Investigate what changed it, and consider whether the sync cron's weekly cadence is too infrequent given a single bad run can leave health red for up to a week with only a 15-minute-interval GitHub Actions check as the sole alarm.
- [Confirmed broken 2026-08-25, needs manual fix] GitHub Actions email notifications for failed workflows are NOT reaching the user — confirmed against the real incident above (32 failed runs, zero noticed emails). Can't be fixed from the repo/CLI; it's a personal account setting. Go to github.com/settings/notifications → "Actions" row → make sure "Email" is checked (not just "Web"), and confirm the notification email address under github.com/settings/emails is monitored. Also check github.com/sajamills/roseyBaby → Watch button is set to "All Activity" or "Custom → Actions", not "Ignore".
- Remaining npm audit findings (9, down from 22) are all inside `@sanity/cli`'s framework-detection dependency chain (`@vercel/frameworks` → `js-yaml`/`smol-toml`, `typeid-js` → `uuid`), used only by local `sanity dev`/CLI tooling, not the deployed app. `sanity@6.10.1`/`@sanity/cli@8.3.0` are already the latest published versions and npm's only "fix" is downgrading to `sanity@5.14.1` (a major regression) — no real fix exists upstream yet. Revisit by periodically re-running `npm audit` to see if Sanity ships a patch.

## Launch QA audit (friend review, 2026-08-24)

A friend ran an external audit against the site before the domain cutover fully propagated. Most findings are now resolved — see "Completed August 25, 2026" below. Remaining open items:

- [Resend integration confirmed live 2026-08-25] `/api/typeform-webhook` → Resend email delivery is built, deployed, and confirmed working end-to-end: all 3 forms are registered with a shared `TYPEFORM_WEBHOOK_SECRET`, `RESEND_ACCESS_TOKEN` is a valid key, `roseybaby.com` is verified in Resend, and a synthetic signed test plus a real Typeform submission both produced a `"delivered"` email (per Resend's own send log) to `meetyouonthetracks@gmail.com`, cc'd to `samueljamesmiller2021@gmail.com` (temporary, remove the CC — `INQUIRY_NOTIFICATION_CC` env var — once this is trusted). Remove the temporary CC by unsetting that env var when ready.
- [High, still open] Beyond "does an email arrive," do the fuller end-to-end QA pass on the catering form (and the other two) as a real customer: required-field/invalid-input handling, inline error messages, customer confirmation, spam/rate-limiting, duplicate-submission handling, keyboard-only completion, 200% zoom, privacy disclosure, and a clear success screen.
- [Launch checklist] Two sub-items open: (1) OG/social share images are still generic/shared, not dedicated per major page (see Design and growth). (2) Structured-data completeness (address/phone/hours/cuisine/menu URL/price range/reservation URL/socials) — JSON-LD exists sitewide via the shared `JsonLd` component but hasn't been checked field-by-field against this exact list.

## PageSpeed Insights audit (2026-08-25)

User-pasted PageSpeed report for `roseybaby.com` (mobile 79 / desktop 100 performance; accessibility 95; best practices 100; SEO 100).

Fixed:

- [Accessibility, was score 95] Fixed the actual failing elements PageSpeed named: `RESERVE`/`RESERVE A TABLE` buttons and the "Rosey Baby story" band (eyebrow, body text, "Read our story →") all had white text on the brand red (`#e44840`), which measures 3.96:1 — under the 4.5:1 WCAG AA minimum for that text size. Added a `--red-solid` CSS variable (`#bd302c`, 5.80:1 with white) for every solid-fill red background with white/light text sitewide (buttons, CTA bands, event badges, the skip-link, filter pills), and darkened `.button-primary:hover` to `#a32823` to keep a visible hover state distinct from the new resting color. `--red` itself is untouched for text/border/accent uses against the dark page background, which already had good contrast.
- [Accessibility/Best Practices] Fixed "Identical links have the same purpose": the homepage (`app/page.tsx`) and the sitewide footer both had a link with the exact text "Get directions ↗" pointing at two different Google Maps URL formats. Unified both to the footer's `maps/dir/?api=1&destination=` deep link.
- [Best Practices, informational] Added `Cross-Origin-Opener-Policy: same-origin` — main site only, deliberately excluded from `/studio` since Sanity Studio's login uses a `window.opener`-based OAuth popup that COOP would sever. `Strict-Transport-Security` was already present (Vercel adds it automatically for verified custom domains, confirmed via `curl -I`), so nothing to do there. "Ensure CSP is effective against XSS attacks" and "Mitigate DOM-based XSS with Trusted Types" are informational/manual-check items, not currently failing — Trusted Types would need a real migration off `'unsafe-inline'` and isn't worth it for the score alone; revisit only if it starts actually failing.
- [Mobile performance, partial] Added an explicit `browserslist` targeting evergreen browsers only (Chrome/Edge 91+, Firefox 90+, Safari/iOS 15+) — no `browserslist` existed before, so Next/SWC was polyfilling `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd` for browsers this site doesn't need to support (~14 KiB). Also switched the GA4 tag loader (`components/Analytics.tsx`) from `strategy="afterInteractive"` to `"lazyOnload"` (keeping the tiny `dataLayer`/`gtag` shim itself on `afterInteractive` so events still queue correctly) — GTM's own script/`unused-javascript` bytes are Google's, not ours, but this at least gets the heavy download off the critical path.

- [LCP gap, investigated 2026-08-25, closed] Re-ran Lighthouse (mobile, slow-4G simulate) against production after the fixes above: performance score is now 95 (was 76-79), LCP is 2.6s (was 4.7s) — largely closed by the browserslist/GA4-defer/CSP fixes above, which all shipped before this re-run. Traced the LCP breakdown: the LCP element is the hero `<h1>` text (not the hero image), and its full network dependency chain is just `HTML (234ms) → one 9.87 KiB CSS file (278ms total)` — no other blocking resources, server responds in 33ms, no redirects, compression is on. That ~278ms unthrottled chain is what Lighthouse's slow-4G/CPU simulation multiplies up; it's already near the practical floor for "load one stylesheet before first paint." The only further lever is critical-CSS inlining (Next's experimental `optimizeCss`, needs adding `critters`/`beasties`) for a modest, uncertain gain — decided not worth the risk of an experimental CSS-extraction feature for a few hundred ms. Not pursuing further.
- [Image delivery, fixed 2026-08-25] Desktop Lighthouse named the two specific images: the homepage hero photo (17.8 KiB) and the crawfish-season feature card photo (10.3 KiB), both flagged "increasing the image compression factor could improve this image's download size" — i.e. Next's default `quality=75` was higher than these photos need. Added `quality={70}` to `components/HeroImage.tsx` (fixes every hero image sitewide, not just the homepage) and the homepage feature-grid image, plus `images.qualities: [70, 75]` in `next.config.ts` (Next 16 hard-rejects any request for a quality value not in this allowlist, so 75 had to stay for every other image that doesn't opt into 70). Render-blocking-requests is understood via the LCP finding above (just the one CSS file, already minimal) — nothing further there.
- [Performance] "Reduce unused JavaScript" (~96–98 KiB) — the two contributors found so far are Google's own `gtag.js` bundle (not ours to trim) and React DOM's core runtime (inherent framework overhead, not a real site bug). No further action identified.
- [Long main-thread tasks, investigated 2026-08-25, closed] `long-tasks` audit is score 1 (passing/informational, doesn't affect the performance score). Traced all 7 tasks from a real trace: 2 are React hydration (~155ms total, ~1s in) — normal for a page with a few client islands (Analytics, EventsFilter, mobile nav); 2 are GTM's own `gtag.js` parsing (~320ms) now happening at ~4.3s thanks to the `lazyOnload` defer, well clear of LCP/FCP; 2 are Next's own background link-prefetch chunk loading (~130ms at ~2.4-2.6s, beneficial, not blocking); 1 is unattributable GC-ish work (63ms). No actual bug found — nothing left to fix here beyond what's already shipped.

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
