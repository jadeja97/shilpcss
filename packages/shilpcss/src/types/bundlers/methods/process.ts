import type { ShilpConfig } from "@/types/config";

/* ================================================================================================
	PROCESS METHODS
================================================================================================ */

/**
 * options passed to the main process step.
 */
export interface ProcessOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * raw file content to process.
   */
  content: string;
  /**
   * absolute or relative path of the source file.
   */
  filePath: string;
}
