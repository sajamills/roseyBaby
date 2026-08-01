import { readFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
const items = JSON.parse(await readFile(new URL("../content/menu.json", import.meta.url), "utf8"));
const slugify = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const categories = [...new Set(items.map((item) => item.category))];
const client = createClient({ projectId, dataset, token, apiVersion: "2026-07-31", useCdn: false });
let tx = client.transaction();
categories.forEach((name, order) => tx.createOrReplace({ _id: `menuCategory.${slugify(name)}`, _type: "menuCategory", name, slug: { _type: "slug", current: slugify(name) }, order }));
items.forEach((item) => tx.createOrReplace({ _id: `menuItem.${slugify(item.category)}.${slugify(item.name)}`, _type: "menuItem", name: item.name, slug: { _type: "slug", current: slugify(item.name) }, description: item.description, category: { _type: "reference", _ref: `menuCategory.${slugify(item.category)}` }, seasonal: Boolean(item.seasonal), available: true, verifiedAt: new Date().toISOString() }));
tx.createOrReplace({ _id:"restaurantSettings", _type:"restaurantSettings", name:"Rosey Baby", phone:"662-324-1949", email:"meetyouonthetracks@gmail.com", address:"300 S Jackson St, Starkville, MS 39759", reservationUrl:"https://www.opentable.com/r/rosey-baby-starkville", socials:[{ _key:"facebook", platform:"Facebook", url:"https://www.facebook.com/RoseyBabyStarkville/" },{ _key:"instagram", platform:"Instagram", url:"https://www.instagram.com/roseybabystarkville/" },{ _key:"x", platform:"X", url:"https://x.com/RoseyBaby_stark" },{ _key:"untappd", platform:"Untappd", url:"https://untappd.com/v/rosey-baby/18903" }]});
await tx.commit();
console.log(`Seeded ${categories.length} categories and ${items.length} menu items.`);
