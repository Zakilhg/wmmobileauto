import { defineField, defineType } from "sanity";

export const hours = defineType({
  name: "hours",
  title: "Business Hours",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Standard Hours",
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          name: "dayHours",
          fields: [
            { name: "day", title: "Day", type: "string" },
            { name: "open", title: "Open", type: "string" },
            { name: "close", title: "Close", type: "string" },
            {
              name: "closed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    }),
  ],
});

