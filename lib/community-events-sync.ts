import { createClient } from "@sanity/client";

type StarkvilleEvent = {
  id: number;
  title?: string;
  description?: string;
  url?: string;
  utc_start_date?: string;
  utc_end_date?: string;
  image?: false | { url?: string };
  venue?: {
    venue?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  organizer?: Array<{ organizer?: string; website?: string }>;
  categories?: Array<{ slug?: string }>;
};

type StarkvilleResponse = {
  events?: StarkvilleEvent[];
  next_rest_url?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const decodeEntities = (value: string) =>
  value
    .replace(/&#8217;|&#039;|&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
const plainText = (value = "") =>
  decodeEntities(
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
const asUtc = (value?: string) =>
  value ? `${value.replace(" ", "T")}Z` : undefined;

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function datePart(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function syncStarkvilleMainStreetEvents() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
  if (!projectId || !token)
    throw new Error(
      "Sanity project ID and a write-capable API token are required.",
    );

  const start = new Date();
  const end = addDays(start, 370);
  let pageUrl = `https://starkville.org/wp-json/tribe/events/v1/events?start_date=${datePart(start)}&end_date=${datePart(end)}&per_page=50`;
  const fetched: StarkvilleEvent[] = [];

  while (pageUrl) {
    const response = await fetch(pageUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "RoseyBaby-CommunityCalendar/1.0",
      },
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error(
        `Starkville community calendar returned ${response.status}.`,
      );
    const page = (await response.json()) as StarkvilleResponse;
    fetched.push(...(page.events || []));
    pageUrl = page.next_rest_url || "";
  }

  // The official Main Street calendar labels its relevant listings as Downtown.
  // This is a supported, stable source for events also promoted through its Facebook presence.
  const events = fetched.filter(
    (event) =>
      event.id &&
      event.utc_start_date &&
      event.categories?.some((category) => category.slug === "downtown"),
  );
  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-07-31",
    useCdn: false,
  });
  const syncedAt = new Date().toISOString();
  const ids = events.map((event) => `starkville-main-street-event-${event.id}`);

  for (let index = 0; index < events.length; index += 40) {
    const transaction = client.transaction();
    for (const event of events.slice(index, index + 40)) {
      const title = plainText(event.title || "Starkville event");
      const location = [
        plainText(event.venue?.venue || "Downtown Starkville"),
        event.venue?.address,
        event.venue?.city,
      ]
        .filter(Boolean)
        .join(" · ");
      const description =
        plainText(event.description).slice(0, 600) ||
        "A downtown Starkville community event.";
      transaction.createOrReplace({
        _id: `starkville-main-street-event-${event.id}`,
        _type: "event",
        title,
        slug: { _type: "slug", current: `${slugify(title)}-${event.id}` },
        eventType: "Starkville event",
        startsAt: asUtc(event.utc_start_date),
        ...(event.utc_end_date ? { endsAt: asUtc(event.utc_end_date) } : {}),
        location,
        ...(event.venue?.address
          ? { streetAddress: plainText(event.venue.address) }
          : {}),
        city: event.venue?.city || "Starkville",
        region: event.venue?.state || "MS",
        ...(event.venue?.zip ? { postalCode: event.venue.zip } : {}),
        ...(event.organizer?.[0]?.organizer
          ? { organizer: plainText(event.organizer[0].organizer || "") }
          : {}),
        ...(event.organizer?.[0]?.website
          ? { organizerUrl: event.organizer[0].website }
          : {}),
        description,
        sourceUrl:
          event.url ||
          "https://starkville.org/about-starkville/lifestyle/downtown/",
        ...(event.image && event.image.url
          ? { sourceImageUrl: event.image.url }
          : {}),
        featured: false,
        isHome: true,
        sourceProvider: "Starkville Main Street",
        providerEventId: String(event.id),
        autoSyncedAt: syncedAt,
      });
    }
    await transaction.commit({ visibility: "async" });
  }

  const staleIds = await client.fetch<string[]>(
    `*[_type == "event" && sourceProvider == "Starkville Main Street" && startsAt >= now() && !(_id in $ids)]._id`,
    { ids },
  );
  for (let index = 0; index < staleIds.length; index += 100) {
    const transaction = client.transaction();
    staleIds.slice(index, index + 100).forEach((id) => transaction.delete(id));
    await transaction.commit({ visibility: "async" });
  }

  return {
    source: "Official Starkville Main Street / Downtown calendar",
    sourceUrl: "https://starkville.org/about-starkville/lifestyle/downtown/",
    facebookCoverage:
      "Uses the official public calendar behind Main Street promotions; direct Facebook ingestion requires an approved Meta Page token.",
    range: { start: datePart(start), end: datePart(end) },
    synced: events.length,
    removed: staleIds.length,
  };
}
