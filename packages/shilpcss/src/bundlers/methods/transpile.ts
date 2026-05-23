import browserslist from "browserslist";
import { transform, browserslistToTargets } from "lightningcss";

import { DEFAULT_BROWSER_TARGET, LCH_COLOR_FORMAT_PATTERN } from "@/config/index/constants";
import { lchToRgb } from "@/lib/convert";
import { logDivider, logNewLine, throwError } from "@/lib/logger";
import { fresh } from "@/lib/operations";

import type { Options as BrowsersListOptions } from "browserslist";
import type { CustomAtRules, TransformOptions } from "lightningcss";

import type { TranspileOptions, TranspileOutput } from "@/types/bundlers/methods/transpile";

/* ============================================================================================= */

/**
 * transpile CSS code for cross-browser and legacy versions compatibility.
 *
 * @param options - Options for transpiling and minifying the css.
 * @param options.css - The CSS content to be transpiled.
 * @param options.options - Replace default options for transpilation.
 * @param options.filePath - The file path of the content for error logging.
 * @param options.colorFormat - Set color format for the styling. (default: oklch, optional: rgb)
 *
 * @returns An object containing the transpiled CSS code and source map.
 *
 * @throws If an error occurs during transpilation.
 */
const transpile = ({ css, options, filePath, colorFormat }: TranspileOptions): TranspileOutput => {
  //
  try {
    //

    let finalCSS = css;

    /* ============================================================================================
			OUTPUT COLOR FORMAT - "oklch" (default), "rgb")
		============================================================================================ */

    if (colorFormat === "rgb") {
      // NOTE: due to this, can't use `@supports` with oklch support, to add any colors, as of now
      // TODO: look into this?
      finalCSS = finalCSS
        .replace(fresh(LCH_COLOR_FORMAT_PATTERN), (lchStr) => lchToRgb({ str: lchStr }).str)
        .replace(fresh(/oklch/g), "rgb");
    }

    /* ============================================================================================
			DEFAULT OPTIONS
		============================================================================================ */

    const defaultOptions: TransformOptions<CustomAtRules> = {
      code: Buffer.from(finalCSS),
      minify: true,
      sourceMap: true,
      targets: createCSSTargets(DEFAULT_BROWSER_TARGET),
      nonStandard: {
        // vue, angular
        deepSelectorCombinator: true,
      },
      filename: filePath,
    };

    /* ============================================================================================
			FINAL OPTIONS  (provided by user using `shilpConfig.transpile`?)
		============================================================================================ */

    const finalOptions =
      options?.({
        defaultOptions,
        DEFAULT_BROWSER_TARGET,
        createCSSTargets,
        css: finalCSS,
        originalCSS: css,
        filePath,
      }) ?? defaultOptions;

    /* ============================================================================================
			EXECUTE LIGHTNING CSS
		============================================================================================ */

    // TODO: use mapping
    const { code, map } = transform(finalOptions);

    if (code.length === 0) {
      throwError("CSS Transpilation failed!");
    }

    return { css: code.toString(), map };
    //
  } catch (error) {
    //
    logDivider();
    logNewLine(`Error: Transpiling :: ${filePath}`);
    logDivider();
    return throwError(error);
  }
};

/* ============================================================================================= */

const createCSSTargets = (cssTarget: string, opts?: BrowsersListOptions) =>
  browserslistToTargets(browserslist(cssTarget, opts));

/* ============================================================================================= */

export default transpile;
