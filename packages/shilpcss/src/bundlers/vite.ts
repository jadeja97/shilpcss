import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import preProcess from "@/bundlers/methods/pre-process";
import process from "@/bundlers/methods/process";
import purge from "@/bundlers/methods/purge";
import transpile from "@/bundlers/methods/transpile";
import { throwError } from "@/lib/logger";

import type { ResolvedConfig } from "vite";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

/**
 * transform intent based utitlities and mixins to plain css.
 *
 * @param config - The shilp config object.
 *
 * @returns Plain css and it's mapping.
 */
const vitePluginShilpCSS = (config: ShilpConfig) => ({
  //
  name: "vite-plugin-shilpcss",

  configResolved: disableDefaultCSSMinification.bind(null),

  transform: transform.bind(null, config),
  writeBundle: writeBundle.bind(null, config),
});

/* ================================================================================================
	DISABLE DEFAULT CSS MINIFICATION - MODIFY VITE CONFIG
================================================================================================ */

const disableDefaultCSSMinification = (viteConfig: ResolvedConfig) => {
  // viteConfig.build ??= {};
  viteConfig.build.cssMinify = false;
};

/* ================================================================================================
	EXECUTES FOR ALL ENVS
================================================================================================ */

const transform = (config: ShilpConfig, content: string, filePath: string) => {
  //
  if (!filePath.endsWith(".css")) {
    return null;
  }

  const preProcessedContent = preProcess({
    filePath,
    config,
    content,
  });

  const processedContent = process({
    filePath,
    config,
    content: preProcessedContent ?? "",
  });

  // TODO: add mapping
  return { code: processedContent ?? "", map: null };
};

/* ================================================================================================
	EXECUTES FOR BUILD ONLY
================================================================================================ */

// NOTE: this is a build hook, never runs during dev
// NOTE: don't need additional build condition like webpack plugin
const writeBundle = async (
  config: ShilpConfig,
  options: { dir?: string },
  bundle: Record<string, unknown>,
): Promise<void> => {
  //
  const outputPath = options.dir;

  if (!outputPath) {
    return throwError("Build: Output directory is required");
  }

  for (const filePath in bundle) {
    //
    if (!Object.hasOwn(bundle, filePath)) {
      continue;
    }

    if (filePath.endsWith(".css")) {
      //
      const resolvedFilePath = resolve(outputPath, filePath);
      const css = readFileSync(resolvedFilePath, "utf8");

      const purged = await purge({
        filePath: resolvedFilePath,
        css,
        options: config.purge,
        source: config.source,
      });

      const transpiled = transpile({
        filePath: resolvedFilePath,
        css: purged?.css ?? css,
        options: config.transpile,
        colorFormat: config.colorFormat,
      });

      writeFileSync(resolvedFilePath, transpiled?.css ?? css);
      //
    }
  }
};

/* ============================================================================================= */

export default vitePluginShilpCSS;
