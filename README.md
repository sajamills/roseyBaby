# Rosey Baby

The production website for Rosey Baby, a family-owned Cajun restaurant, crawfish destination, craft-beer bar, and full-service caterer in Starkville, Mississippi.

The site is built with Next.js, deployed on Vercel, and uses Sanity as its content management system. It also publishes Starkville event and travel-guide content to support local SEO and AI-assisted search discovery.

## Live services

- Website: <https://rosey-woad.vercel.app>
- Embedded Sanity Studio: <https://rosey-woad.vercel.app/studio>
- Intended canonical domain: <https://roseybaby.com>
- Sanity project: `xh78cgr5`
- Sanity dataset: `production`
- Vercel project: `rosey`

The `roseybaby.com` DNS/domain cutover is not complete. Until it is, canonical URLs and the requested webhook URL point at a host that still serves the previous site. See `SITE_STATUS.md` before launch.

## Technology

- Next.js 16.3.2 and React 19.2.8
- TypeScript
- Sanity Studio 6 and `next-sanity`
- Vercel hosting and weekly cron
- ESPN/HailState and Starkville community-event ingestion
- Typeform catering, crawfish boil, and bartending lead forms, with a webhook that emails a formatted summary via Resend
- IndexNow notification support
- Google Analytics support when a GA4 ID is configured

## Local development

Requirements:

- Node.js 22 LTS or 24 LTS
- npm
- Access to the Rosey Baby Sanity and Vercel projects for production operations

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The Studio is available at <http://localhost:3000/studio>.

Useful commands:

```bash
npm run build          # production build and TypeScript verification
npm run lint           # ESLint
npm run studio         # standalone local Sanity Studio
npm run studio:deploy  # deploy standalone hosted Studio (requires Sanity CLI login)
npm run sanity:seed    # seed initial content; do not run casually against production
```

## Environment variables

Copy `.env.example` to `.env.local` and add only the credentials needed for your work. Never commit `.env.local` or access tokens.

Core variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `CRON_SECRET`
- `SANITY_WEBHOOK_SECRET`
- `INDEXNOW_KEY`

Optional integrations:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_CATERING_TYPEFORM_URL`
- `NEXT_PUBLIC_CRAWFISH_TYPEFORM_URL`
- `NEXT_PUBLIC_BARTENDING_TYPEFORM_URL`
- `NEXT_PUBLIC_CAREERS_TYPEFORM_URL`
- `UNTAPPD_BUSINESS_MENU_ENDPOINT`
- `UNTAPPD_BUSINESS_EMAIL`
- `UNTAPPD_BUSINESS_API_TOKEN`
- `OPENAI_API_KEY`
- `TYPEFORM_ACCESS_TOKEN`
- `TYPEFORM_WEBHOOK_SECRET` — required for `/api/typeform-webhook` to accept submissions; see "Typeform inquiry notifications" below
- `RESEND_ACCESS_TOKEN` — required to actually send the notification email
- `RESEND_FROM_ADDRESS` — optional; defaults to Resend's shared `onboarding@resend.dev` sender, which only delivers to the Resend account's own verified address until a sending domain is verified
- `INQUIRY_NOTIFICATION_EMAIL` — optional; defaults to `meetyouonthetracks@gmail.com`

## Content ownership

Sanity manages menu categories and items, articles, events, FAQs, restaurant settings, crawfish status, catering services, reusable pages, and event-sync status.

Code currently manages page layout, navigation, footer, SEO metadata and structured data, Starkville guide templates, source integrations, fallback content, image presentation, business-hours logic, and API routes. Code fallbacks remain intentionally available if Sanity is temporarily unreachable.

## Scheduled event sync

Vercel calls `/api/cron/sync-sports` every Monday at 10:00 UTC. The job imports Mississippi State sports and Starkville community events, writes them to Sanity, and updates the Sanity sync-status document.

`/api/health` returns HTTP 200 while the last successful sync is recent and produced records. It returns HTTP 503 when the sync is stale, failed, or empty, making it suitable for an external uptime monitor.

The sync requires `CRON_SECRET` and `SANITY_API_WRITE_TOKEN` in Vercel. Current Main Street/community ingestion is based on public event sources; Facebook does not provide a reliable unrestricted public-events API, so source coverage needs periodic human review.

## Sanity publishing webhook

Create a Sanity webhook for document create/update/delete events. It should POST to the live Next.js host’s `/api/revalidate` endpoint and include:

```text
Authorization: Bearer <SANITY_WEBHOOK_SECRET>
```

Use `https://rosey-woad.vercel.app/api/revalidate` before domain cutover. Change it to `https://roseybaby.com/api/revalidate` after DNS points to Vercel and that endpoint returns successfully.

## Typeform inquiry notifications

Typeform's own notification email is unreliable enough that `/api/typeform-webhook` sends a formatted summary of every submission (catering, crawfish boil, and bartending inquiries) to `INQUIRY_NOTIFICATION_EMAIL` (default `meetyouonthetracks@gmail.com`) via Resend, replying-to the submitter's own email when they gave one. It does not replace Typeform's built-in notification — leave that on too as a fallback.

Register the webhook once per form (repeat for the catering, crawfish boil, and bartending form IDs — find each ID in the Typeform dashboard URL or via `GET https://api.typeform.com/forms`):

```bash
npm run typeform:webhook -- <form_id> https://www.roseybaby.com
```

The script prints a generated webhook secret the first time it runs for a given form (pass `TYPEFORM_WEBHOOK_SECRET` yourself to reuse one instead) — save it as `TYPEFORM_WEBHOOK_SECRET` in Vercel; Typeform will not show it again. Set `RESEND_ACCESS_TOKEN` in Vercel too, or the webhook will 401 and 500 respectively. Until the `roseybaby.com` sending domain is verified with Resend, email sends from the shared `onboarding@resend.dev` address, which only delivers to the Resend account's own verified inbox — set `RESEND_FROM_ADDRESS` once a domain is verified.

## Deployment

```bash
vercel --prod
```

Vercel runs a clean production build. The embedded `/studio` route deploys the current Sanity schema with the website, so editors always use the schema associated with production code. A separate `sanity deploy` is optional if a standalone `*.sanity.studio` hostname is desired.

## Documentation

- `SITE_STATUS.md` — verified production status, ownership map, launch checklist, and backlog
- `TODO.md` — concise working backlog
- `docs/UNTAPPD.md` — planned Untappd integration
- `public/rosey-originals/SOURCES.md` — image provenance notes

## Repository safety

- Do not commit tokens, `.env.local`, exported customer leads, or private family assets without approval.
- Treat `scripts/seed-sanity.mjs` as a production data-writing tool.
- Verify a Vercel preview before changing DNS or promoting substantial visual redesigns.
