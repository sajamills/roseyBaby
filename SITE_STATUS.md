# Rosey Baby website status and handoff

Last audited: August 1, 2026

Repository: `/Users/sammiller/Documents/rosey`

Production alias: <https://rosey-woad.vercel.app>

Intended public domain: <https://roseybaby.com>

## Executive status

The Next.js website is deployed and production builds successfully on Vercel with Next.js 16.2.12. The current Sanity schema is available through the embedded Studio at `/studio`. Core restaurant, menu, catering, crawfish, beer, story, event, blog, visit, and Starkville-guide experiences are present. Technical SEO foundations, structured data, weekly event syncing, Typeform paths, IndexNow support, responsive navigation, and optimized image delivery are implemented.

The largest remaining launch dependency is domain cutover. `roseybaby.com` still serves the previous website, so canonical metadata intentionally names a domain that does not yet serve this application. The requested Sanity webhook URL cannot work until the domain points to Vercel; it currently returns `406` rather than reaching the Next.js route.

Both `roseybaby.com` and `www.roseybaby.com` are now attached to the Vercel project. Vercel reports that Bluehost DNS still needs an A record pointing each hostname to `76.76.21.21`; no DNS record was changed automatically.

Current handoff boundary: someone with Bluehost DNS access must replace the records for the apex and `www` hostnames. After propagation, verify that both hosts serve Vercel, choose the apex as the canonical host, redirect `www`, confirm SSL, and then activate the Sanity webhook at the canonical endpoint.

## Verified deployment

- Vercel project: `sajamills-projects/rosey`
- Latest production deployment: `dpl_3CTSWybkVeMB264dLtKXGg3caXeQ`
- Production alias: <https://rosey-woad.vercel.app>
- Next.js: 16.2.12
- React and React DOM: 19.2.8
- Production compilation: passed
- TypeScript verification: passed in the production build
- Static generation: 84 routes generated successfully
- Embedded Studio: returns HTTP 200
- Embedded Studio base path: configured as `/studio`; the previous “Tool not found: studio” routing error is resolved
- Primary site routes: return HTTP 200
- Protected revalidation endpoint: returns HTTP 401 without its secret, as expected
- IndexNow key endpoint: configured and returns HTTP 200

## Sanity status

- Organization: `opfNY1l3M`
- Project: `xh78cgr5`
- Dataset: `production`
- Studio: <https://rosey-woad.vercel.app/studio>

Verified published content:

| Content type        | Count |
| ------------------- | ----: |
| Menu categories     |     9 |
| Menu items          |    72 |
| Blog posts          |     7 |
| Events              |   394 |
| FAQs                |     8 |
| Reusable pages      |     6 |
| Catering services   |     3 |
| Restaurant settings |     1 |

The sync-status document reports success, with 59 sports records and 329 community records. Its latest attempt and latest successful run were both recorded at `2026-08-01T04:14:33.064Z`, with zero stale events removed and no error message.

## August 1 production audit

- All 176 URLs extracted from the production sitemap returned HTTP 200 through the Vercel alias.
- The sitemap contains canonical `roseybaby.com` URLs, but that domain still serves the previous WordPress website from Bluehost/Apache.
- `robots.txt` allows normal crawlers and OAI-SearchBot while excluding `/api/` and `/studio/`.
- `/order` correctly emits `noindex, nofollow`.
- Restaurant, menu, article, breadcrumb, and event JSON-LD are present on their intended templates.
- Vercel supplies HSTS, but the application does not yet define a broader security-header policy.
- After removing unused starter dependencies, the production dependency audit reports 21 findings: 14 high and seven moderate. The remaining high findings are primarily transitive through Next.js image dependencies and Sanity’s CLI/build tooling and should be remediated through upstream patch releases with regression testing.
- Sanity has 391 future events and three undated recurring/tradition events. Every event has an official source URL.
- Content completeness gaps: 72 menu items have no price, all 394 events lack a dedicated Sanity image, 65 events lack a street address, 61 lack an end time, and all seven blog posts lack a Sanity-managed image.
- Every current article now has a first-party Rosey Baby image fallback, a visible optimized article image, and article-specific Open Graph/Twitter metadata. A future Sanity image automatically replaces its fallback.
- The embedded Studio sign-in is operational, but the Sanity project-management browser session used for webhook administration remains signed out.

### Studio deployment model

The current schema is deployed as an embedded Sanity Studio within the Vercel application. This is the recommended editor URL for this project because it ships with the exact production schema. The standalone `npm run studio:deploy` command still requires an authenticated local Sanity CLI session; it is only necessary if the team wants an additional `*.sanity.studio` hostname.

## Vercel environment status

Configured in production:

- Sanity project and dataset
- Sanity read and write tokens
- Typeform URLs for catering, crawfish boils, and bartending
- `CRON_SECRET`
- `INDEXNOW_KEY`
- `SANITY_WEBHOOK_SECRET`

Waiting for account-issued values:

- None. GA4, Google Search Console, and Bing Webmaster verification values were supplied on August 1, 2026 and added to Vercel production.

Optional/not yet connected:

- Untappd for Business endpoint, email, and API token
- OpenAI API key for a future AI search experience
- Final online-ordering provider URL

## Content managed in Sanity

- Restaurant settings
- Menu categories and menu items
- Crawfish availability/status
- Catering services and their form URLs
- Blog posts
- Events
- FAQs
- Reusable page content
- Scheduler sync status

## Content and behavior managed in code

- Page layouts and components
- Header, mobile navigation, footer, and business-open status
- SEO metadata, sitemap, robots rules, canonical configuration, and JSON-LD
- Starkville guide templates and fallback editorial content
- Event ingestion and normalization logic
- Sanity fallback content used during CMS outages
- Vercel cron schedule
- Revalidation and IndexNow API routes
- Image presentation and local image files
- Analytics event definitions

## SEO and AI-discovery status

Implemented:

- Crawlable server-rendered pages
- Canonical URLs
- `robots.txt`, including explicit OAI-SearchBot access
- XML sitemap
- Restaurant/local-business structured data
- Menu structured data
- Article and breadcrumb structured data
- Individual event URLs and Event structured data
- Starkville guide hub and supporting intent-focused guides
- Sitewide address, telephone, hours, directions, and social links
- Open Graph and Twitter metadata
- IndexNow notification support

Highest-value next actions:

1. Complete the public-domain cutover and submit the sitemap in Google Search Console and Bing Webmaster Tools.
2. Add accurate GA4 conversion tracking for calls, reservations, catering forms, ordering, and directions.
3. Publish genuinely useful weekly Starkville event summaries with visible update dates and primary-source links.
4. Strengthen entity consistency across Google Business Profile, Bing Places, Apple Maps, Facebook, Yelp, Tripadvisor, OpenTable, and the website.
5. Earn local links and mentions from Visit Starkville, Main Street Association, Mississippi State organizations, venues, wedding vendors, and event organizers.
6. Add first-party photos, author information, cited sources, exact distances, parking advice, and concise answers to Starkville guides.

## Responsive and image status

- Mobile navigation is implemented for interior pages.
- The 320px catering-heading overflow was corrected.
- Major touch targets were enlarged.
- Full-width hero imagery now uses Next.js Image rather than CSS background URLs.
- The four Crissey family-store photographs use Next.js Image.
- No remaining plain HTML `<img>` tags or Rosey hero URLs in CSS were found in the audited application directories.
- The supplied 128×90 logo remains suitable for favicon/header use but may appear soft on high-density displays. A larger original PNG is still preferred.

## Dark-theme recommendation

A warm dark theme is a strong brand direction, but it has not been applied to production. Create it first as a preview using charcoal rather than pure black, cream typography, Rosey red calls to action, muted brass accents, and lighter charcoal reading panels. Check menu legibility, accessibility contrast, daytime mobile use, food-photo color, and the risk of making the brand feel like a generic sports bar before promotion.

## Launch checklist

- [ ] Point apex and `www` domains to Vercel.
- [ ] Confirm one preferred host and redirect the other.
- [ ] Verify SSL and all canonical URLs.
- [ ] Change the Sanity webhook to `https://roseybaby.com/api/revalidate` after cutover.
- [ ] Verify a signed Sanity publish triggers page and sitemap revalidation.
- [ ] Add GA4 and webmaster verification variables.
- [ ] Submit `/sitemap.xml` to Google and Bing.
- [ ] Verify Google Business Profile website/menu/reservation links.
- [ ] Verify the three Typeforms and their completion links.
- [ ] Connect or remove placeholder ordering actions.
- [ ] Test calls, reservations, directions, catering leads, analytics events, and weekly cron.
- [ ] Review every public page on 320px, 390px, tablet, and desktop viewports.
- [ ] Confirm legal ownership/permission for every production photograph.

## Prioritized outstanding work

### P0 — before domain launch

- Domain/DNS cutover and redirect verification
- Sanity publishing webhook
- Analytics and webmaster verification
- Real ordering destination or removal of the ordering CTA
- Typeform final-domain updates and end-to-end testing

### P1 — first month

- Untappd beer-wall integration
- Catering packages, prices, and approved venue content
- First-party Story archive and family-store history
- Dedicated social-sharing artwork
- Search Console monitoring and local-profile consistency

### P2 — growth

- Dark-theme prototype and accessibility review
- Recurring editorial workflow for Starkville/weekend guides
- Stronger event enrichment and source attribution
- Local backlink and partnership campaign
- AI-enabled onsite search after content coverage and analytics are mature enough to measure it

## Security and maintenance

- Secrets are stored in Vercel and excluded from Git.
- Production now sends HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a restrictive camera/microphone/geolocation `Permissions-Policy`.
- `/api/health` returns 200 only when the weekly event sync is successful, recent, and non-empty.
- `.github/workflows/uptime.yml` checks the public site, `/api/health`, and sitemap every 15 minutes. GitHub will surface failures in Actions and can email repository watchers according to their notification settings.
- Never expose Sanity write tokens, cron secrets, Typeform tokens, or webhook secrets to browser code.
- Rotate the previously shared Typeform personal token if it has not already been rotated.
- Pin the project to an active Node LTS line rather than relying indefinitely on `>=22.13.0`.
- Review dependency updates monthly and validate them through a preview deployment.
- Check the event sync-status document after each Monday run and alert on failures or zero-source counts.
