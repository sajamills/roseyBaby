import { createClient } from "@sanity/client";
import fallbackMenu from "@/content/menu.json";

export type MenuRecord = { name: string; description: string; category: string; seasonal?: boolean; available?: boolean };

export async function getMenu(): Promise<MenuRecord[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "replace-me") return fallbackMenu;
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2026-07-31",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
  try {
    const menu = await client.fetch<(MenuRecord & { _id: string })[]>(`*[_type == "menuItem" && available != false] | order(category->order asc, name asc) { _id, name, description, seasonal, available, "category": category->name }`);
    const deduped = Array.from(new Map(menu.map(item => [item._id, item])).values());
    console.log(`[getMenu diag] rawLength=${menu.length} dedupedLength=${deduped.length} uniqueIds=${new Set(menu.map(i => i._id)).size}`);
    console.log(`[getMenu diag] sample ids for Wings: ${JSON.stringify(menu.filter(i => i.name === "Wings").map(i => i._id))}`);
    console.log(`[getMenu diag] id prefixes: ${JSON.stringify([...new Set(menu.map(i => i._id.split(/[.-]/)[0]))])}`);
    return deduped.length ? deduped : fallbackMenu;
  } catch (err) {
    console.log(`[getMenu diag] CAUGHT ERROR, using fallback: ${err instanceof Error ? err.message : String(err)}`);
    return fallbackMenu;
  }
}
