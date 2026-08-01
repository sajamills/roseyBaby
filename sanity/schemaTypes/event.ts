import { defineField, defineType } from "sanity";
export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "eventType",
      title: "Type",
      type: "string",
      options: {
        list: [
          "Football",
          "Baseball",
          "Other MSU sports",
          "Campus tradition",
          "Starkville event",
          "Rosey Baby event",
        ],
      },
    }),
    defineField({ name: "startsAt", title: "Starts", type: "datetime" }),
    defineField({ name: "endsAt", title: "Ends", type: "datetime" }),
    defineField({
      name: "dateLabel",
      title: "Date label",
      description:
        "Use when the exact date is not announced, such as ‘Spring 2027 · date pending’.",
      type: "string",
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "streetAddress",
      title: "Street address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      initialValue: "Starkville",
    }),
    defineField({
      name: "region",
      title: "State",
      type: "string",
      initialValue: "MS",
    }),
    defineField({ name: "postalCode", title: "Postal code", type: "string" }),
    defineField({ name: "organizer", title: "Organizer", type: "string" }),
    defineField({ name: "organizerUrl", title: "Organizer URL", type: "url" }),
    defineField({
      name: "sourceUrl",
      title: "Official source URL",
      type: "url",
    }),
    defineField({
      name: "ticketUrl",
      title: "Tickets or details URL",
      type: "url",
    }),
    defineField({
      name: "sourceImageUrl",
      title: "Official source image URL",
      description:
        "An externally hosted image supplied by an official event feed.",
      type: "url",
      readOnly: true,
      hidden: ({ document }) => !document?.sourceImageUrl,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isHome",
      title: "In Starkville",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sourceProvider",
      title: "Automatic source",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => !document?.sourceProvider,
    }),
    defineField({
      name: "providerEventId",
      title: "Source event ID",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => !document?.providerEventId,
    }),
    defineField({
      name: "autoSyncedAt",
      title: "Last automatically synced",
      type: "datetime",
      readOnly: true,
      hidden: ({ document }) => !document?.autoSyncedAt,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
