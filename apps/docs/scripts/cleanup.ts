import { readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

// oxlint-disable import/no-relative-parent-imports
import { SEARCH_INDEX_KEY } from "../src/lib/constants";

/* ============================================================================================= */

// post build script to remove old search index files

/* ============================================================================================= */

const publicDir = join(cwd(), "public");

const files = readdirSync(publicDir);

const searchIndexFiles = files.filter((file) => file.startsWith(SEARCH_INDEX_KEY));

for (const file of searchIndexFiles) {
  //
  const filePath = join(publicDir, file);

  unlinkSync(filePath);
}

// oxlint-disable eslint/no-console
console.log(`::::::: DOCS CLEANUP COMPLETED :::::::`);
