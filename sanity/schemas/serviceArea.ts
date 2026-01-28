import { defineField, defineType } from "sanity";

export const serviceArea = defineType({
  name: "serviceArea",
  title: "Service Area",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "City / Area",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes (optional)",
      type: "string",
    }),
  ],
});

