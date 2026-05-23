// oxlint-disable import/no-relative-parent-imports
import packageJSON from "../../package.json" with { type: "json" };

/* ============================================================================================= */

export const SITE_URL = "https://shilpcss.com";

/* ============================================================================================= */

// oxlint-disable node/no-process-env
export const DEV = process.env.NODE_ENV === "development";
// oxlint-disable node/no-process-env
export const PROD = process.env.NODE_ENV === "production";

/* ============================================================================================= */

// search index will be stored in `public` directory
export const SEARCH_INDEX_KEY = "search-index";
export const SEARCH_INDEX_PATH = `/${SEARCH_INDEX_KEY}-v-${DEV ? "dev" : packageJSON.version}.json`;

// index fields
export const SEARCH_INDEX_FIELDS = [
  "title",
  "label",
  "url",
  "content",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
];
// return fields
export const SEARCH_INDEX_RETURN_FIELDS = ["title", "label", "url", "metaTitle", "metaDescription"];
