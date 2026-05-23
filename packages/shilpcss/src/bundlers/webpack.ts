import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// oxlint-disable import/no-namespace
import * as webpack from "webpack";
// oxlint-disable import/no-namespace
import * as webpackSources from "webpack-sources";

import preProcess from "@/bundlers/methods/pre-process";
import process from "@/bundlers/methods/process";
import purge from "@/bundlers/methods/purge";
import transpile from "@/bundlers/methods/transpile";
import { throwError } from "@/lib/logger";

import type { Compiler } from "webpack";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

// fix cjs and esm conflict
const { Compilation } = webpack.default;
// @ts-expect-error conflict between actual exports and typescript types
// oxlint-disable typescript/no-unsafe-assignment
const { RawSource } = webpackSources.default;

/* ============================================================================================= */

/**
 * transform intent based utitlities and mixins to plain css.
 *
 * @param config - The shilp config object.
 *
 * @returns Plain css and it's mapping.
 */
class WebpackPluginShilpCSS {
  //
  private readonly config: ShilpConfig;

  public constructor(config: ShilpConfig) {
    this.config = config;
  }

  public apply(compiler: Compiler) {
    //

    this.removeDefaultCSSMinificationPlugins(compiler);

    this.transform(compiler);

    this.writeBundle(compiler);
  }

  /* ==============================================================================================
		REMOVE DEFAULT CSS MINIFICATION PLUGINS
	============================================================================================== */

  private removeDefaultCSSMinificationPlugins(compiler: Compiler) {
    //
    compiler.options.optimization.minimizer ??= [];

    compiler.options.optimization.minimizer.filter(
      (plugin) =>
        !["CssMinimizerPlugin", "LightningCssMinimizerPlugin"].includes(plugin.constructor?.name),
    );
  }

  /* ==============================================================================================
		EXECUTES FOR ALL ENVS
	============================================================================================== */

  private transform(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap("WebpackPluginShilpCSSPreProcess", (compilation) => {
      //
      compilation.hooks.processAssets.tap(
        {
          name: "transform",
          stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
        },
        (assets) => {
          //
          for (const filePath in assets) {
            //
            if (!Object.hasOwn(assets, filePath)) {
              continue;
            }

            if (filePath.endsWith(".css")) {
              //
              const content = compilation.getAsset(filePath)?.source?.source?.() as string;

              const preProcessedContent = preProcess({
                filePath,
                config: this.config,
                content,
              });

              const processedContent = process({
                filePath,
                config: this.config,
                content: preProcessedContent ?? "",
              });

              // oxlint-disable typescript/no-unsafe-call, typescript/no-unsafe-argument
              compilation.updateAsset(filePath, new RawSource(processedContent ?? ""));
            }
          }
        },
      );
    });
  }

  /* ==============================================================================================
		EXECUTES FOR BUILD ONLY
	============================================================================================== */

  // purge and transpile
  private writeBundle(compiler: Compiler) {
    //
    if (compiler.options.mode !== "development") {
      //

      compiler.hooks.afterEmit.tap("WebpackPluginShilpCSSBuild", (compilation) => {
        //
        const outputPath = compilation.outputOptions.path;

        if (!outputPath) {
          throwError("Build: Output directory is required");
        }

        for (const filePath in compilation.assets) {
          //
          if (!Object.hasOwn(compilation.assets, filePath)) {
            continue;
          }

          if (filePath.endsWith(".css")) {
            //
            const resolvedFilePath = resolve(outputPath, filePath);
            const css = readFileSync(resolvedFilePath, "utf8");

            // NOTE: There's issue if using async/await here.
            // oxlint-disable promise/catch-or-return, promise/no-floating-promises
            purge({
              filePath: resolvedFilePath,
              css,
              options: this.config.purge,
              source: this.config.source,
              //
              // oxlint-disable promise/always-return, promise/prefer-await-to-then
            }).then((purged) => {
              //
              const transpiled = transpile({
                filePath: resolvedFilePath,
                css: purged?.css ?? css,
                options: this.config.transpile,
                colorFormat: this.config.colorFormat,
              });

              writeFileSync(resolvedFilePath, transpiled?.css ?? css);
            });
          }
        }
      });
    }
  }
}

/* ============================================================================================= */

export default WebpackPluginShilpCSS;
