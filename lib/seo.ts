export const siteUrl = "https://roseybaby.com";

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${siteUrl}/#restaurant`,
      name: "Rosey Baby",
      alternateName: "Rosey Baby Starkville",
      url: siteUrl,
      logo: `${siteUrl}/rosey-baby-logo-reference.png`,
      image: [
        `${siteUrl}/rosey-originals/header.jpg`,
        `${siteUrl}/rosey-originals/deck.jpg`,
        `${siteUrl}/rosey-originals/oysters.jpg`,
      ],
      description: "Family-owned Cajun restaurant in Starkville serving live Louisiana crawfish, elevated Southern favorites, and more than 60 beers on tap.",
      telephone: "+1-662-324-1949",
      email: "meetyouonthetracks@gmail.com",
      foundingDate: "1995",
      priceRange: "$$",
      servesCuisine: ["Cajun", "Creole", "Seafood", "Southern"],
      acceptsReservations: true,
      menu: `${siteUrl}/menu`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "300 S Jackson St",
        addressLocality: "Starkville",
        addressRegion: "MS",
        postalCode: "39759",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "22:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/RoseyBabyStarkville/",
        "https://www.instagram.com/roseybabystarkville/",
        "https://x.com/RoseyBaby_stark",
        "https://untappd.com/v/rosey-baby/18903",
      ],
      hasMap: "https://maps.google.com/?q=300+S+Jackson+St+Starkville+MS+39759",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rosey Baby",
      publisher: { "@id": `${siteUrl}/#restaurant` },
      inLanguage: "en-US",
    },
  ],
};
