import { sanityClient } from "./sanity";

export type PostBlock = {
  _key: string;
  _type: string;
  style?: string;
  children?: Array<{ _key: string; text: string }>;
};
export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body?: PostBlock[];
  imageUrl?: string;
};
export type CalendarEvent = {
  title: string;
  slug?: string;
  eventType: string;
  startsAt?: string;
  endsAt?: string;
  dateLabel?: string;
  location: string;
  streetAddress?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  organizer?: string;
  organizerUrl?: string;
  description: string;
  sourceUrl: string;
  ticketUrl?: string;
  isHome: boolean;
  featured?: boolean;
  imageUrl?: string;
  sourceImageUrl?: string;
  categories?: string[];
};

const postFallbackImages: Record<string, string> = {
  "wing-night-at-rosey-baby": "/rosey-originals/appetizers.jpg",
  "how-to-host-crawfish-boil-starkville": "/rosey-originals/deck.jpg",
  "how-to-wash-live-crawfish": "/rosey-originals/oysters.jpg",
  "how-to-season-crawfish-boil": "/rosey-originals/appetizers.jpg",
  "best-crawfish-boil-sides": "/rosey-originals/entrees.jpg",
  "starkville-crawfish-season-guide": "/rosey-originals/oysters.jpg",
  "msu-game-day-at-rosey-baby": "/rosey-originals/deck.jpg",
  "story-behind-rosey-baby-name": "/rosey-originals/header.jpg",
};

const withPostImage = (post: Post): Post => ({
  ...post,
  imageUrl:
    post.imageUrl ||
    postFallbackImages[post.slug] ||
    "/rosey-originals/header.jpg",
});

export const fallbackPosts: Post[] = [
  {
    title: "Wing Night at Rosey Baby: 50-Cent Wings Every Tuesday",
    slug: "wing-night-at-rosey-baby",
    category: "Wings",
    publishedAt: "2026-08-25T12:00:00-05:00",
    excerpt:
      "Every Tuesday, Rosey Baby's wings are 50 cents each, dine-in, in any flavor. Here's how wing night works and which flavors to order.",
    body: [
      {
        _key: "wing-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wing-1a",
            text: "Tuesday is wing night at Rosey Baby: 50-cent wings, dine-in, all day, in any flavor on the menu. No coupon, no app, no limited window — just show up hungry.",
          },
        ],
      },
      {
        _key: "wing-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "wing-2a", text: "How wing night works" }],
      },
      {
        _key: "wing-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wing-3a",
            text: "Every Tuesday, dine-in orders get wings at 50 cents each. It runs all day rather than a short happy-hour window, and there's no cap on how many you order — bring the whole table and mix flavors.",
          },
        ],
      },
      {
        _key: "wing-4",
        _type: "block",
        style: "h2",
        children: [{ _key: "wing-4a", text: "Pick a flavor (or a few)" }],
      },
      {
        _key: "wing-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wing-5a",
            text: "Rosey Baby's wings are fried to order and tossed in buffalo, BBQ, sweet n' spicy, Cajun dry rub, or lemon pepper. Ordering a couple of flavors per dozen is the easiest way to cover the table without anyone missing out on their favorite.",
          },
        ],
      },
      {
        _key: "wing-6",
        _type: "block",
        style: "h2",
        children: [{ _key: "wing-6a", text: "Pair it with the beer wall" }],
      },
      {
        _key: "wing-7",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wing-7a",
            text: "Wing night pairs naturally with Rosey Baby's rotating tap wall — the largest in Mississippi. Order a round of wings across a couple of flavors and work through a few taps while you're at it.",
          },
        ],
      },
    ],
  },
  {
    title: "How to Host a Crawfish Boil in Starkville",
    slug: "how-to-host-crawfish-boil-starkville",
    category: "Crawfish",
    publishedAt: "2026-07-31T20:00:00-05:00",
    excerpt:
      "A practical plan for buying live crawfish at Brewski’s, organizing the pot, feeding a crowd, and serving the whole boil hot.",
    body: [
      {
        _key: "host-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "host-1a",
            text: "A good crawfish boil is part meal and part gathering. The easiest version starts with a head count, a pickup plan, a safe outdoor cooking area, and enough time to wash, boil, soak, and serve without rushing.",
          },
        ],
      },
      {
        _key: "host-2",
        _type: "block",
        style: "h2",
        children: [
          { _key: "host-2a", text: "Start with live crawfish from Brewski’s" },
        ],
      },
      {
        _key: "host-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "host-3a",
            text: "Brewski’s on Highway 12 sells live crawfish in season. Availability and market price follow the Louisiana catch, so check the Brewski’s Facebook page or call before you build the party around a pickup. Buy as close to cooking time as practical and keep the sacks cool, shaded, and able to breathe—never sealed in water or an airtight container.",
          },
        ],
      },
      {
        _key: "host-4",
        _type: "block",
        style: "h2",
        children: [{ _key: "host-4a", text: "Build a simple boil timeline" }],
      },
      {
        _key: "host-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "host-5a",
            text: "Set tables, trash cans, drinks, gloves, towels, and serving trays before lighting the burner. Wash the crawfish in batches. Cook potatoes and sausage early enough to become tender, add corn later, and add fully cooked eggs near the end so they absorb flavor without falling apart. Cook the crawfish thoroughly, then use a controlled soak to build flavor.",
          },
        ],
      },
      {
        _key: "host-6",
        _type: "block",
        style: "h2",
        children: [{ _key: "host-6a", text: "Make serving easy" }],
      },
      {
        _key: "host-7",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "host-7a",
            text: "Cover outdoor tables with food-safe disposable paper or use large trays. Put cold drinks and mild sides away from the hot pot. Serve in manageable batches instead of dumping everything at once, and keep raw seafood equipment separate from the finished food. For a large party or an on-site boil, Rosey Baby can handle the cooking, staffing, bar, and cleanup through its catering team.",
          },
        ],
      },
      {
        _key: "host-8",
        _type: "block",
        style: "h2",
        children: [{ _key: "host-8a", text: "Keep the food safe" }],
      },
      {
        _key: "host-9",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "host-9a",
            text: "Use clean water and clean equipment, discard crawfish that are dead before cooking, and cook seafood thoroughly. USDA guidance lists 145°F as the minimum internal temperature for fish and shellfish. Refrigerate leftovers promptly rather than leaving them on the table through the afternoon.",
          },
        ],
      },
    ],
  },
  {
    title: "How to Wash Live Crawfish Before a Boil",
    slug: "how-to-wash-live-crawfish",
    category: "Crawfish",
    publishedAt: "2026-07-31T19:00:00-05:00",
    excerpt:
      "A straightforward rinse-and-sort method that removes mud and debris without soaking or suffocating live crawfish.",
    body: [
      {
        _key: "wash-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wash-1a",
            text: "Washing crawfish is about rinsing away mud and debris and sorting the catch before it reaches the pot. It does not require hours of soaking, and it should not leave live crawfish trapped in standing water.",
          },
        ],
      },
      {
        _key: "wash-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "wash-2a", text: "Use cool, clean water" }],
      },
      {
        _key: "wash-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wash-3a",
            text: "Place a manageable amount of crawfish in a clean basket, tub with an open drain, or dedicated wash container. Rinse gently with cool potable water, agitate by hand or paddle, and let the dirty water drain completely. Repeat until the runoff is substantially clearer. Do not leave the crawfish submerged between rinses.",
          },
        ],
      },
      {
        _key: "wash-4",
        _type: "block",
        style: "h2",
        children: [{ _key: "wash-4a", text: "Sort while you rinse" }],
      },
      {
        _key: "wash-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wash-5a",
            text: "Remove sticks, grass, broken debris, and any crawfish that are dead before cooking. Live crawfish should show movement. Keep the cleaned batch cool and shaded until it goes directly into the pot.",
          },
        ],
      },
      {
        _key: "wash-6",
        _type: "block",
        style: "h2",
        children: [{ _key: "wash-6a", text: "Buy close to boil time" }],
      },
      {
        _key: "wash-7",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "wash-7a",
            text: "In Starkville, Brewski’s sells live crawfish during the season. Check its Facebook page before pickup because supply and market price change with each catch. Bring a ventilated plan for transport and cook the crawfish as soon as practical.",
          },
        ],
      },
    ],
  },
  {
    title: "How to Season Crawfish and Build a Better Soak",
    slug: "how-to-season-crawfish-boil",
    category: "Crawfish",
    publishedAt: "2026-07-31T18:00:00-05:00",
    excerpt:
      "Layer crawfish seasoning into the boil, taste before the catch goes in, and use soaking time—not endless boiling—to deepen the flavor.",
    body: [
      {
        _key: "season-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "season-1a",
            text: "Great crawfish should taste seasoned through the shell without losing the sweetness of the tail meat. The trick is consistency: measure the water, follow the seasoning package for that volume, taste the broth, and adjust before adding the crawfish.",
          },
        ],
      },
      {
        _key: "season-2",
        _type: "block",
        style: "h2",
        children: [
          { _key: "season-2a", text: "Order enough crawfish seasoning" },
        ],
      },
      {
        _key: "season-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "season-3a",
            text: "Choose a Louisiana-style crawfish boil seasoning and order it before the party instead of guessing at the grocery store the morning of the boil. Match the amount to both your pot capacity and the number of batches. Powder seasons the liquid quickly; liquid concentrate and finishing seasoning can add another layer, but every brand has a different salt level.",
          },
        ],
      },
      {
        _key: "season-4",
        _type: "block",
        style: "h2",
        children: [{ _key: "season-4a", text: "Build flavor in layers" }],
      },
      {
        _key: "season-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "season-5a",
            text: "Start the seasoned water with aromatics such as halved lemons, garlic, and onions. Add potatoes and sausage early, corn later, and crawfish only when the pot is ready. Avoid adding salt blindly after using a commercial blend—taste the broth first.",
          },
        ],
      },
      {
        _key: "season-6",
        _type: "block",
        style: "h2",
        children: [{ _key: "season-6a", text: "The soak matters" }],
      },
      {
        _key: "season-7",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "season-7a",
            text: "After the crawfish are fully cooked, stop the active boil and let them soak in the seasoned liquid. Taste one at intervals rather than relying on a single universal minute count. Pull the batch when the flavor reaches the right balance; an uncontrolled extra-long soak can make the crawfish too salty.",
          },
        ],
      },
      {
        _key: "season-8",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "season-8a",
            text: "Rosey Baby’s method is built around a secret seasoning blend, fresh Louisiana crawfish, and the right soaking time. If you would rather enjoy the party than manage the pot, book an on-site boil through Rosey Baby catering.",
          },
        ],
      },
    ],
  },
  {
    title: "The Best Sides for a Crawfish Boil",
    slug: "best-crawfish-boil-sides",
    category: "Crawfish",
    publishedAt: "2026-07-31T17:00:00-05:00",
    excerpt:
      "Corn, potatoes, sausage, boiled eggs, and a few cool sides turn a sack of crawfish into a full table.",
    body: [
      {
        _key: "sides-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-1a",
            text: "The best crawfish-boil sides do two jobs: they soak up the seasoned broth and give guests something substantial between trays of crawfish. A short, dependable lineup is better than overcrowding the pot.",
          },
        ],
      },
      {
        _key: "sides-2",
        _type: "block",
        style: "h2",
        children: [{ _key: "sides-2a", text: "Potatoes" }],
      },
      {
        _key: "sides-3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-3a",
            text: "Use small red potatoes or similarly waxy potatoes that hold their shape. They take longer than most other sides, so give them a head start in the seasoned water and test the center before serving.",
          },
        ],
      },
      {
        _key: "sides-4",
        _type: "block",
        style: "h2",
        children: [{ _key: "sides-4a", text: "Corn" }],
      },
      {
        _key: "sides-5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-5a",
            text: "Cut ears into halves or thirds so they are easy to grab. Corn absorbs seasoning quickly and can become soft, so add it after the potatoes rather than at the beginning.",
          },
        ],
      },
      {
        _key: "sides-6",
        _type: "block",
        style: "h2",
        children: [{ _key: "sides-6a", text: "Smoked sausage" }],
      },
      {
        _key: "sides-7",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-7a",
            text: "Slice smoked sausage into thick pieces that will not disappear through the basket. A mild sausage balances a spicy broth; andouille adds another layer of smoke and heat.",
          },
        ],
      },
      {
        _key: "sides-8",
        _type: "block",
        style: "h2",
        children: [{ _key: "sides-8a", text: "Boiled eggs" }],
      },
      {
        _key: "sides-9",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-9a",
            text: "Peel fully cooked eggs and let them warm briefly in the seasoned liquid near the end. They take on the broth quickly, so handle them gently and avoid leaving them in a rolling boil.",
          },
        ],
      },
      {
        _key: "sides-10",
        _type: "block",
        style: "h2",
        children: [{ _key: "sides-10a", text: "Cool extras for the table" }],
      },
      {
        _key: "sides-11",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "sides-11a",
            text: "French bread, coleslaw, potato salad, lemon wedges, and a simple green salad give guests a break from the heat. Keep cold sides chilled until serving and keep them separate from the raw-crawfish prep area.",
          },
        ],
      },
    ],
  },
  {
    title: "Your Guide to Crawfish Season in Starkville",
    slug: "starkville-crawfish-season-guide",
    category: "Crawfish",
    publishedAt: "2026-07-30T12:00:00-05:00",
    excerpt:
      "When the season starts, how Rosey Baby sources live Louisiana crawfish, and what to expect when you come to the tracks.",
    body: [
      {
        _key: "a",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "a1",
            text: "Crawfish season generally runs from January through June. Rosey Baby receives fresh crawfish from Louisiana farms four times a week and serves platters and all-you-can-eat events at market price.",
          },
        ],
      },
    ],
  },
  {
    title: "A Rosey Baby Game-Day Plan",
    slug: "msu-game-day-at-rosey-baby",
    category: "Game day",
    publishedAt: "2026-07-28T12:00:00-05:00",
    excerpt:
      "Parking, food, cold beer, and the short walk between downtown Starkville, campus, and the railroad tracks.",
    body: [
      {
        _key: "b",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "b1",
            text: "Rosey Baby sits on South Jackson Street within walking distance of Main Street. Large groups should reserve ahead, especially on home football weekends.",
          },
        ],
      },
    ],
  },
  {
    title: "The Story Behind the Rosey Baby Name",
    slug: "story-behind-rosey-baby-name",
    category: "Our story",
    publishedAt: "2026-07-25T12:00:00-05:00",
    excerpt:
      "From Roselyn’s family nickname to Curt Crissey’s Starkville restaurant on the tracks.",
    body: [
      {
        _key: "c",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "c1",
            text: "Curt Crissey’s mother was named Roselyn, and Curt was her Rosey Baby. The nickname eventually became the name above the restaurant door.",
          },
        ],
      },
    ],
  },
];

const footballSource = "https://hailstate.com/sports/football/schedule/";
export const fallbackEvents: CalendarEvent[] = [
  {
    title: "MSU Football vs ULM",
    eventType: "Football",
    startsAt: "2026-09-05T18:30:00-05:00",
    location: "Davis Wade Stadium · Starkville",
    description: "First Saturday in StarkVegas. Wear maroon or white.",
    sourceUrl: footballSource,
    isHome: true,
    featured: true,
  },
  {
    title: "MSU Football vs Missouri",
    eventType: "Football",
    startsAt: "2026-09-26T17:00:00-05:00",
    location: "Davis Wade Stadium · Starkville",
    description:
      "White Out. Official kickoff is in the 5–7 PM CT night window.",
    sourceUrl: footballSource,
    isHome: true,
  },
  {
    title: "MSU Football vs Alabama",
    eventType: "Football",
    startsAt: "2026-10-03T11:00:00-05:00",
    location: "Davis Wade Stadium · Starkville",
    description: "Stripe Out. Official kickoff is in the 11 AM–noon CT window.",
    sourceUrl: footballSource,
    isHome: true,
    featured: true,
  },
  {
    title: "MSU Football vs Oklahoma",
    eventType: "Football",
    startsAt: "2026-10-24T14:30:00-05:00",
    location: "Davis Wade Stadium · Starkville",
    description: "Black Out. Kickoff remains in the official flex window.",
    sourceUrl: footballSource,
    isHome: true,
  },
  {
    title: "MSU Football vs Vanderbilt",
    eventType: "Football",
    startsAt: "2026-11-07T14:30:00-06:00",
    location: "Davis Wade Stadium · Starkville",
    description: "Homecoming. Kickoff remains in the official flex window.",
    sourceUrl: footballSource,
    isHome: true,
  },
  {
    title: "MSU Football vs Auburn",
    eventType: "Football",
    startsAt: "2026-11-14T11:00:00-06:00",
    location: "Davis Wade Stadium · Starkville",
    description:
      "Military Appreciation Day. Official kickoff is in the 11 AM–noon CT window.",
    sourceUrl: footballSource,
    isHome: true,
  },
  {
    title: "MSU Football vs Tennessee Tech",
    eventType: "Football",
    startsAt: "2026-11-21T12:00:00-06:00",
    location: "Davis Wade Stadium · Starkville",
    description: "Senior Day. Wear maroon and white.",
    sourceUrl: footballSource,
    isHome: true,
  },
  {
    title: "Bulldog Bash",
    eventType: "Campus tradition",
    dateLabel: "Fall 2026 · date pending",
    location: "Downtown Starkville",
    description:
      "Mississippi State’s annual free outdoor concert and student-community celebration.",
    sourceUrl: "https://www.msubulldogbash.com/",
    isHome: true,
    featured: true,
  },
  {
    title: "Super Bulldog Weekend",
    eventType: "Campus tradition",
    dateLabel: "Spring 2027 · date pending",
    location: "Mississippi State campus",
    description:
      "MSU’s spring homecoming tradition with baseball, multiple sports, and campus events.",
    sourceUrl: "https://hailstate.com/",
    isHome: true,
    featured: true,
  },
  {
    title: "Starkville Dachshund Derby",
    eventType: "Starkville event",
    dateLabel: "Spring 2027 · date pending",
    location: "Main Street · Starkville",
    description:
      "The nation’s largest wiener dog race in the heart of downtown Starkville.",
    sourceUrl: "https://starkville.org/things-to-do/",
    isHome: true,
    featured: true,
  },
];

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await sanityClient.fetch<Post[]>(
      `*[_type=="blogPost" && defined(slug.current)]|order(publishedAt desc){title,"slug":slug.current,excerpt,category,publishedAt,"imageUrl":image.asset->url}`,
    );
    const managedSlugs = new Set(rows.map((post) => post.slug));
    return [
      ...rows,
      ...fallbackPosts.filter((post) => !managedSlugs.has(post.slug)),
    ]
      .map(withPostImage)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  } catch {
    return fallbackPosts.map(withPostImage);
  }
}
export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const post =
      (await sanityClient.fetch<Post | undefined>(
        `*[_type=="blogPost" && slug.current==$slug][0]{title,"slug":slug.current,excerpt,category,publishedAt,body,"imageUrl":image.asset->url}`,
        { slug },
      )) || fallbackPosts.find((p) => p.slug === slug);
    return post ? withPostImage(post) : undefined;
  } catch {
    const post = fallbackPosts.find((p) => p.slug === slug);
    return post ? withPostImage(post) : undefined;
  }
}
const eventSlug = (event: CalendarEvent) =>
  event.slug ||
  `${event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(
      /(^-|-$)/g,
      "",
    )}-${event.startsAt?.slice(0, 10) || "date-pending"}`;
export async function getEvents(): Promise<CalendarEvent[]> {
  try {
    const rows = await sanityClient.fetch<CalendarEvent[]>(
      `*[_type=="event" && (!defined(startsAt) || startsAt >= now())]|order(startsAt asc)[0...150]{title,"slug":slug.current,eventType,startsAt,endsAt,dateLabel,location,streetAddress,city,region,postalCode,organizer,organizerUrl,description,sourceUrl,ticketUrl,isHome,featured,sourceImageUrl,categories,"imageUrl":image.asset->url}`,
    );
    return (rows.length ? rows : fallbackEvents).map((event) => ({
      ...event,
      imageUrl: event.imageUrl || event.sourceImageUrl,
      slug: eventSlug(event),
    }));
  } catch {
    return fallbackEvents.map((event) => ({
      ...event,
      slug: eventSlug(event),
    }));
  }
}
export async function getEvent(
  slug: string,
): Promise<CalendarEvent | undefined> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug);
}
