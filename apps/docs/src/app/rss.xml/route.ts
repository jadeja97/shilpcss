import { docsConfig, contentConfig } from "@docs";
import { createRSSFile, generateRSSFeed } from "@jadeja/docs/lib/app/rss";

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

/**
 * generates RSS feed for documentation updates
 */
export const GET = async () => {
  return createRSSFile(
    await generateRSSFeed([
      {
        title: "Shilp CSS",
        content: contentConfig.docs,
        SITE_URL: docsConfig.constants.SITE_URL,
        trailingSlash: docsConfig.trailingSlash,
      },
    ]),
  );
};
