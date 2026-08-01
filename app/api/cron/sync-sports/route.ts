import type { NextRequest } from "next/server";
import { syncHailStateSports } from "@/lib/sports-sync";
import { syncStarkvilleMainStreetEvents } from "@/lib/community-events-sync";
import { createClient } from "@sanity/client";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const attemptedAt = new Date().toISOString();
    const [sports, community] = await Promise.allSettled([
      syncHailStateSports(),
      syncStarkvilleMainStreetEvents(),
    ]);
    const failures = [sports, community].filter(result => result.status === "rejected");
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (projectId && token) {
      const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", token, apiVersion: "2026-07-31", useCdn: false });
      const sportsCount = sports.status === "fulfilled" ? sports.value.synced : 0;
      const communityCount = community.status === "fulfilled" ? community.value.synced : 0;
      const errors = [sports, community].flatMap(result => result.status === "rejected" ? [result.reason instanceof Error ? result.reason.message : String(result.reason)] : []);
      await client.createOrReplace({
        _id: "calendar-sync-status", _type: "syncStatus", title: "Weekly events sync",
        lastAttemptAt: attemptedAt,
        ...(failures.length === 0 ? { lastSuccessfulAt: attemptedAt } : {}),
        status: failures.length === 0 ? "success" : failures.length === 2 ? "failed" : "partial",
        sportsCount, communityCount,
        removedCount: (sports.status === "fulfilled" ? sports.value.removed : 0) + (community.status === "fulfilled" ? community.value.removed : 0),
        errorMessage: errors.join("; "),
        sources: ["HailState", "Starkville Main Street"],
      });
    }
    if (failures.length === 2) throw new Error(failures.map(result => result.status === "rejected" ? result.reason : "").join("; "));

    return Response.json({
      success: failures.length === 0,
      partial: failures.length > 0,
      sports: sports.status === "fulfilled" ? sports.value : { error: sports.reason instanceof Error ? sports.reason.message : "Sports sync failed" },
      community: community.status === "fulfilled" ? community.value : { error: community.reason instanceof Error ? community.reason.message : "Community sync failed" },
      completedAt: new Date().toISOString(),
    }, { status: failures.length ? 207 : 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown calendar sync error";
    console.error("Calendar sync failed", error);
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
