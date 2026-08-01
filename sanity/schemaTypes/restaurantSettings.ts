import { defineField, defineType } from "sanity";

export const restaurantSettings = defineType({
  name: "restaurantSettings", title: "Restaurant Settings", type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", initialValue: "Rosey Baby", validation: r => r.required() }),
    defineField({ name: "phone", title: "Phone", type: "string", initialValue: "662-324-1949" }),
    defineField({ name: "email", title: "Email", type: "email", initialValue: "meetyouonthetracks@gmail.com" }),
    defineField({ name: "address", title: "Address", type: "string", initialValue: "300 S Jackson St, Starkville, MS 39759" }),
    defineField({ name: "reservationUrl", title: "Reservation URL", type: "url" }),
    defineField({ name: "orderingUrl", title: "Ordering URL", type: "url" }),
    defineField({ name: "cateringFormUrl", title: "Catering Typeform URL", type: "url" }),
    defineField({ name: "socials", title: "Social profiles", type: "array", of: [{ type: "object", fields: [{ name: "platform", type: "string" }, { name: "url", type: "url" }] }] }),
    defineField({ name: "announcement", title: "Site announcement", type: "string" }),
    defineField({ name: "announcementExpiresAt", title: "Announcement expires", type: "datetime" }),
    defineField({ name: "hours", title: "Hours", type: "array", of: [{ type: "object", fields: [{ name: "days", type: "string" }, { name: "opens", type: "string" }, { name: "closes", type: "string" }, { name: "closed", type: "boolean" }] }] }),
  ],
});
