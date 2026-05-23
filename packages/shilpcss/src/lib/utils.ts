// NOTE: DO NOT ADD ANY ALIAS IMPORT HERE, ELSE YOU WILL GET THE MODULE RESOLUTION ERROR

import { existsSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* ============================================================================================= */

/**
 * gets the absolute file path and directory name based on the input URL.
 *
 * @param metaUrl - The URL provided by `import.meta.url`.
 *
 * @returns An object containing the absolute file path and directory name.
 *
 * @throws If `import.meta.url` is not provided.
 */
export const getAbsolutePath = (metaUrl?: string) => {
  //
  if (!metaUrl) {
    throw new Error("Error: Missing param `import.meta.url`");
  }

  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);

  return { __filename, __dirname };
};

/* ============================================================================================= */

/**
 * copies an entire folder and its contents to a destination directory.
 *
 * If the destination directory does not exist, it will be created automatically.
 *
 * @param src - The source directory path.
 * @param dest - The destination directory path.
 */
export const copyFolderSync = (src: string, dest: string) => {
  //
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
};
