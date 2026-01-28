import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_PROJECT_ID || "yourProjectId";
const dataset = process.env.SANITY_DATASET || "production";

export default defineCliConfig({ projectId, dataset });

