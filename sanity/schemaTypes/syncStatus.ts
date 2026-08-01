import { defineField, defineType } from "sanity";

export const syncStatus = defineType({
  name: "syncStatus",
  title: "Calendar sync status",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", initialValue: "Weekly events sync", readOnly: true }),
    defineField({ name: "lastAttemptAt", title: "Last attempt", type: "datetime", readOnly: true }),
    defineField({ name: "lastSuccessfulAt", title: "Last successful run", type: "datetime", readOnly: true }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["success", "partial", "failed"] }, readOnly: true }),
    defineField({ name: "sportsCount", title: "MSU events imported", type: "number", readOnly: true }),
    defineField({ name: "communityCount", title: "Downtown events imported", type: "number", readOnly: true }),
    defineField({ name: "removedCount", title: "Stale events removed", type: "number", readOnly: true }),
    defineField({ name: "errorMessage", title: "Latest error", type: "text", readOnly: true }),
    defineField({ name: "sources", title: "Sources", type: "array", of: [{ type: "string" }], readOnly: true }),
  ],
});
