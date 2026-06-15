import { resolve } from "node:path";

import { docsConfig, contentConfig } from "@docs";
import { createContentSiteMapEntries, createSiteMapEntry } from "@jadeja/docs/lib/app/sitemap";

import type { MetadataRoute } from "next";

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

const sitemap = (): MetadataRoute.Sitemap => {
  //
  // trailing slash is important for correct URL structure and SEO for github pages,
  // as it treats URLs with and without trailing slash as different pages

  const { trailingSlash, constants } = docsConfig;
  const { SITE_URL } = constants;

  return [
    // "/"
    createSiteMapEntry({
      url: "/",
      filePath: resolve("./page.tsx"),
      priority: 1,
      SITE_URL,
      trailingSlash,
    }),

    // "/work-with-me"
    createSiteMapEntry({
      url: "/work-with-me",
      filePath: resolve("./work-with-me/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.9,
      SITE_URL,
      trailingSlash,
    }),

    // "/docs", "/docs/*"
    ...createContentSiteMapEntries({
      priority: 0.8,
      content: contentConfig.docs,
      SITE_URL,
      trailingSlash,
    }),
  ];
};

/* ============================================================================================= */

export default sitemap;
