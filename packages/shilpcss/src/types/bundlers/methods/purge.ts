import type { UserDefinedOptions } from "purgecss";

/* ================================================================================================
	PURGE METHODS
================================================================================================ */

/**
 * options passed to the purge step.
 */
export interface PurgeOptions {
  /**
   * css text to purge.
   */
  css: string;
  /**
   * path for the CSS source file.
   */
  filePath: string;
  /**
   * source preset or custom file globs used for scanning.
   */
  source?: PurgeConfigSource;
  /**
   * optional function to customize purge options.
   */
  options?: PurgeConfig;
}

/**
 * output of purge step.
 */
export interface PurgeConfigOutput {
  /**
   * css text to purge.
   */
  css?: string;
  /**
   * rejected css by purgecss
   */
  rejectedCSS?: string;
}

/**
 * payload sent to the custom purge config function.
 */
interface PurgeDefaultOptions {
  /**
   * default PurgeCSS options prepared by ShilpCSS.
   */
  defaultOptions: UserDefinedOptions;
  /**
   * cSS text to purge.
   */
  css: string;
  /**
   * path for the CSS source file.
   */
  filePath: string;
}

/* ================================================================================================
	PURGE CONFIG
================================================================================================ */

/**
 * supported source presets for purge scanning.
 */
export type PurgeConfigSource = "react" | "vue" | string[] | null;

/* ============================================================================================= */

/**
 * function used to customize PurgeCSS options.
 */
export type PurgeConfig = (options: PurgeDefaultOptions) => UserDefinedOptions;
