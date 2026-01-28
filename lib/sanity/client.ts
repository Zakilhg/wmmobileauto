import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID || "demo";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

