import type { StringOptions } from "sass";

import type { ShilpConfig } from "@/types/config";

/* ================================================================================================
	PRE-PROCESS METHODS
================================================================================================ */

/**
 * options passed to the pre-process step.
 */
export interface PreProcessOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * raw file content before processing.
   */
  content: string;
  /**
   * absolute or relative path of the source file.
   */
  filePath: string;
}

/**
 * default SCSS options object passed to custom SCSS config hooks.
 */
interface SCSSOptions {
  /**
   * default Sass string options created by ShilpCSS.
   */
  defaultOptions: StringOptions<"sync">;
  /**
   * css text currently being processed.
   */
  css: string;
  /**
   * absolute or relative path of the source file.
   */
  filePath: string;
}

/* ================================================================================================
	PRE-PROCESS CONFIG
================================================================================================ */

/**
 * css behavior hooks for pre-processing.
 */
export interface SCSSConfig {
  /**
   * allows adding custom SCSS imports.
   */
  imports?: (imports: string) => string;
  /**
   * allows overriding Sass compiler options.
   */
  options?: (options: SCSSOptions) => StringOptions<"sync">;
}
