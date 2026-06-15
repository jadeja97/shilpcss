import { docsConfig } from "@docs";
import { createRobotsRules } from "@jadeja/docs/lib/app/robots";

import type { MetadataRoute } from "next";

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

const robots = (): MetadataRoute.Robots => {
  return createRobotsRules(docsConfig.constants.SITE_URL);
};

/* ============================================================================================= */

export default robots;
