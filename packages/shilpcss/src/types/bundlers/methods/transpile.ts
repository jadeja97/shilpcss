import type { Options as BrowsersListOptions } from "browserslist";
import type { CustomAtRules, Targets, TransformOptions, TransformResult } from "lightningcss";

/* ================================================================================================
	TRANSPILE METHODS
================================================================================================ */

/**
 * options passed to the transpile step.
 */
export interface TranspileOptions {
  /**
   * css text to transpile.
   */
  css: string;
  /**
   * path for the CSS source file.
   */
  filePath: string;
  /**
   * optional output color format.
   */
  colorFormat?: TranspileColorFormat;
  /**
   * optional function to customize lightningcss options.
   */
  options?: TranspileConfig;
}

/**
 * output of the transpile step.
 */
export interface TranspileOutput {
  /**
   * css text to transpile.
   */
  css: string;
  /**
   * source to usage mapping
   */
  map: TransformResult["map"];
}

/**
 * payload sent to the custom transpile config function.
 */
interface TranspileDefaultOptions {
  /**
   * default lightningcss options prepared by ShilpCSS.
   */
  defaultOptions: TransformOptions<CustomAtRules>;
  /**
   * default browser target query used by ShilpCSS.
   */
  DEFAULT_BROWSER_TARGET: string;
  /**
   * helper to create lightningcss browser targets from a browserslist query.
   */
  createCSSTargets: (cssTarget: string, opts?: BrowsersListOptions) => Targets;
  /**
   * current CSS text to transpile.
   */
  css: string;
  /**
   * original CSS text before color conversion updates.
   */
  originalCSS: string;
  /**
   * path for the CSS source file.
   */
  filePath: string;
}

/* ================================================================================================
	TRANSPILE CONFIG
================================================================================================ */

/**
 * available color formats supported in transpile output.
 */
export type TranspileColorFormat = "oklch" | "rgb";

/* ============================================================================================= */

/**
 * function used to customize lightningcss transform options.
 */
export type TranspileConfig = (options: TranspileDefaultOptions) => TransformOptions<CustomAtRules>;
