import { createClient } from "@sanity/client";
import fallbackMenu from "@/content/menu.json";

export type MenuRecord = { name: string; description: string; category: string; price?: string; seasonal?: boolean; available?: boolean };

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
    const menu = await client.fetch<(MenuRecord & { _id: string })[]>(`*[_type == "menuItem" && available != false] | order(category->order asc, name asc) { _id, name, description, price, seasonal, available, "category": category->name }`);
    const deduped = Array.from(new Map(menu.map(item => [item._id, item])).values());
    return deduped.length ? deduped : fallbackMenu;
  } catch {
    return fallbackMenu;
  }
}
