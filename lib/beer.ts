export type BeerTap = {
  name: string;
  brewery?: string;
  style?: string;
  abv?: number;
  ibu?: number;
  serving?: string;
  price?: string;
};

export type BeerSection = { name: string; beers: BeerTap[] };

function number(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeItem(item: Record<string, any>): BeerTap | null {
  const beer = item.beer || item.beverage || item;
  const name = beer.name || item.name || item.beer_name;
  if (!name) return null;
  return {
    name,
    brewery: beer.brewery?.name || beer.brewery_name || item.brewery_name,
    style: beer.style || beer.style_name || item.style,
    abv: number(beer.abv ?? item.abv),
    ibu: number(beer.ibu ?? item.ibu),
    serving: item.container?.name || item.serving || item.size,
    price: item.price ? String(item.price) : undefined,
  };
}

export async function getBeerMenu(): Promise<BeerSection[]> {
  const endpoint = process.env.UNTAPPD_BUSINESS_MENU_ENDPOINT;
  const email = process.env.UNTAPPD_BUSINESS_EMAIL;
  const token = process.env.UNTAPPD_BUSINESS_API_TOKEN;
  if (!endpoint || !email || !token) return [];

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`,
        "User-Agent": "Rosey Baby website beer menu",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload = await response.json();
    const sections = payload.sections || payload.menu?.sections || payload.data?.sections || [];
    return sections.map((section: Record<string, any>) => ({
      name: section.name || section.title || "On Tap",
      beers: (section.items || section.beers || []).map(normalizeItem).filter(Boolean),
    })).filter((section: BeerSection) => section.beers.length);
  } catch {
    return [];
  }
}
