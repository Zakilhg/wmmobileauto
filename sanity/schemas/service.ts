import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    }),
    defineField({
      name: "serviceType",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Mobile Mechanic", value: "mechanic" },
          { title: "Window Tint", value: "tint" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceList",
      title: "Service List",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "commonIssues",
      title: "Common Issues (mechanic)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Benefits (tint)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tintTiers",
      title: "Tint Tiers (tint)",
      type: "array",
      of: [
        {
          type: "object",
          name: "tintTier",
          fields: [
            { name: "name", title: "Tier Name", type: "string" },
            { name: "description", title: "Description", type: "string" },
          ],
        },
      ],
    }),
  ],
});

