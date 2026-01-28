import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(7, "Phone number is required."),
  email: z.string().email("Enter a valid email.").optional().or(z.literal("")),
  serviceType: z.enum(["mechanic", "tint"]),
  vehicle: z.string().min(2, "Vehicle details are required."),
  location: z.string().min(2, "Location is required."),
  details: z.string().min(5, "Please share some details."),
  preferredTime: z.string().optional().or(z.literal("")),
  honeypot: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

