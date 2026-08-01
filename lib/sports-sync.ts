import { createClient } from "@sanity/client";

type HailStateEvent = {
  id: number;
  gameImageUrl?: string | null;
  promotionImagePath?: string | null;
  dateUtc?: string;
  endDateUtc?: string | null;
  location?: string;
  locationIndicator?: string;
  gameStateDisplay?: string;
  gamePromotionText?: string | null;
  opponent?: { title?: string };
  sport?: {
    title?: string;
    shortDisplay?: string;
    globalSportShortname?: string;
  };
  facility?: { title?: string } | null;
  media?: {
    tv?: string;
    gameNote?: string | null;
    tickets?: { url?: string } | null;
  };
  ticketLink?: { url?: string | null };
};

type HailStateDay = { date: string; events?: HailStateEvent[] };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const eventType = (sport = "") =>
  sport === "Football"
    ? "Football"
    : sport === "Baseball"
      ? "Baseball"
      : "Other MSU sports";

const venueDetails = (sport: string, facility?: string) => {
  if (sport === "Football" || facility?.includes("Davis Wade")) {
    return {
      location:
        facility && facility !== "Starkville" ? facility : "Davis Wade Stadium",
      streetAddress: "90 B.S. Hood Road",
      postalCode: "39762",
    };
  }
  return { location: facility || "Starkville, Mississippi" };
};

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function datePart(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function syncHailStateSports() {
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
  const sourceUrl = `https://hailstate.com/api/v2/Calendar/from/${datePart(start)}/to/${datePart(end)}`;
  const response = await fetch(sourceUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": "RoseyBaby-SportsCalendar/1.0",
    },
    cache: "no-store",
  });
  if (!response.ok)
    throw new Error(`HailState calendar returned ${response.status}.`);

  const days = (await response.json()) as HailStateDay[];
  const events = days
    .flatMap((day) => day.events || [])
    .filter(
      (event) =>
        event.id &&
        event.dateUtc &&
        event.locationIndicator === "H" &&
        event.gameStateDisplay !== "CANCELED",
    );

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-07-31",
    useCdn: false,
  });
  const syncedAt = new Date().toISOString();
  const ids = events.map((event) => `hailstate-event-${event.id}`);

  for (let index = 0; index < events.length; index += 40) {
    const transaction = client.transaction();
    for (const event of events.slice(index, index + 40)) {
      const sport =
        event.sport?.shortDisplay || event.sport?.title || "MSU Sports";
      const opponent = event.opponent?.title || "Opponent TBA";
      const title = `MSU ${sport} vs ${opponent}`;
      const venue = venueDetails(
        sport,
        event.facility?.title || event.location,
      );
      const notes = [
        event.gamePromotionText,
        event.media?.tv ? `Watch on ${event.media.tv}.` : null,
      ]
        .filter(Boolean)
        .join(" ");
      transaction.createOrReplace({
        _id: `hailstate-event-${event.id}`,
        _type: "event",
        title,
        slug: { _type: "slug", current: `${slugify(title)}-${event.id}` },
        eventType: eventType(sport),
        startsAt: event.dateUtc,
        ...(event.endDateUtc ? { endsAt: event.endDateUtc } : {}),
        location: venue.location,
        ...(venue.streetAddress ? { streetAddress: venue.streetAddress } : {}),
        city: "Starkville",
        region: "MS",
        ...(venue.postalCode ? { postalCode: venue.postalCode } : {}),
        organizer: "Mississippi State Athletics",
        organizerUrl: "https://hailstate.com/",
        description:
          notes || `Mississippi State ${sport} home event in Starkville.`,
        sourceUrl: "https://hailstate.com/calendar",
        ...(event.gameImageUrl || event.promotionImagePath
          ? {
              sourceImageUrl:
                event.gameImageUrl ||
                `https://hailstate.com${event.promotionImagePath}`,
            }
          : {}),
        ...(event.ticketLink?.url || event.media?.tickets?.url
          ? { ticketUrl: event.ticketLink?.url || event.media?.tickets?.url }
          : {}),
        featured: sport === "Football" || sport === "Baseball",
        isHome: true,
        sourceProvider: "HailState",
        providerEventId: String(event.id),
        autoSyncedAt: syncedAt,
      });
    }
    await transaction.commit({ visibility: "async" });
  }

  const staleIds = await client.fetch<string[]>(
    `*[_type == "event" && sourceProvider == "HailState" && startsAt >= now() && !(_id in $ids)]._id`,
    { ids },
  );
  for (let index = 0; index < staleIds.length; index += 100) {
    const transaction = client.transaction();
    staleIds.slice(index, index + 100).forEach((id) => transaction.delete(id));
    await transaction.commit({ visibility: "async" });
  }

  return {
    source: "HailState official athletics calendar",
    range: { start: datePart(start), end: datePart(end) },
    synced: events.length,
    removed: staleIds.length,
  };
}
