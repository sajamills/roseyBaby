import { createClient } from "@sanity/client";

export const dynamic = "force-dynamic";

type SyncStatus = {
  status?: "success" | "partial" | "failed";
  lastSuccessfulAt?: string;
  sportsCount?: number;
  communityCount?: number;
  errorMessage?: string;
};

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    return Response.json(
      {
        healthy: false,
        service: "events-sync",
        error: "Sanity is not configured",
      },
      { status: 503 },
    );
  }

  try {
    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2026-07-31",
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    });
    const sync = await client.fetch<SyncStatus | null>(
      `*[_id == "calendar-sync-status"][0]{status,lastSuccessfulAt,sportsCount,communityCount,errorMessage}`,
    );
    const lastSuccess = sync?.lastSuccessfulAt
      ? new Date(sync.lastSuccessfulAt).getTime()
      : 0;
    const ageHours = lastSuccess
      ? (Date.now() - lastSuccess) / 3_600_000
      : null;
    const hasRecords =
      (sync?.sportsCount || 0) + (sync?.communityCount || 0) > 0;
    const healthy =
      sync?.status === "success" &&
      hasRecords &&
      ageHours !== null &&
      ageHours < 216;

    return Response.json(
      {
        healthy,
        service: "events-sync",
        status: sync?.status || "unknown",
        lastSuccessfulAt: sync?.lastSuccessfulAt || null,
        ageHours: ageHours === null ? null : Math.round(ageHours * 10) / 10,
        sportsCount: sync?.sportsCount || 0,
        communityCount: sync?.communityCount || 0,
        error: sync?.errorMessage || null,
      },
      {
        status: healthy ? 200 : 503,
        headers: { "cache-control": "no-store" },
      },
    );
  } catch (error) {
    return Response.json(
      {
        healthy: false,
        service: "events-sync",
        error: error instanceof Error ? error.message : "Health check failed",
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
