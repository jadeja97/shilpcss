import { createManifest } from "@jadeja/docs/lib/app/manifest";

import type { MetadataRoute } from "next";

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

const manifest = (): MetadataRoute.Manifest => {
  //
  return createManifest({
    siteName: "Shilp CSS",
    description: "an Intent-first, CSS-centric, styling engine and framework",
    color: "#9333ea",
  });
};

/* ============================================================================================= */

export default manifest;
