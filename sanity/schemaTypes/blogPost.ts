import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(220) }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Crawfish", "Food & beer", "Game day", "Starkville", "Catering", "Our story"] } }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "featured", title: "Featured post", type: "boolean", initialValue: false }),
    defineField({ name: "image", title: "Hero image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (rule) => rule.max(60) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, validation: (rule) => rule.max(160) }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
