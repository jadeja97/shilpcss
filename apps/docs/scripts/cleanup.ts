import { searchIndexCleanup } from "@jadeja/docs/scripts/search-index-cleanup";

// oxlint-disable-next-line import/no-relative-parent-imports
import { docsConfig } from "../docs.config";

/* ============================================================================================= */

searchIndexCleanup(docsConfig.constants.SEARCH_INDEX_KEY);
