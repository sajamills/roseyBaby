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
    const dashVersions = menu.filter(i => i._id.startsWith("menu-item-"));
    const dotVersions = menu.filter(i => i._id.startsWith("menuItem."));
    const mismatches = dashVersions.filter(d => {
      const dot = dotVersions.find(x => x.name === d.name);
      return !dot || dot.description !== d.description || dot.category !== d.category || Boolean(dot.seasonal) !== Boolean(d.seasonal);
    });
    console.log(`[getMenu diag] dash=${dashVersions.length} dot=${dotVersions.length} contentMismatches=${mismatches.length}`);
    if (mismatches.length) console.log(`[getMenu diag] mismatchNames=${JSON.stringify(mismatches.map(m => m.name))}`);
    return deduped.length ? deduped : fallbackMenu;
  } catch (err) {
    console.log(`[getMenu diag] CAUGHT ERROR, using fallback: ${err instanceof Error ? err.message : String(err)}`);
    return fallbackMenu;
  }
}
