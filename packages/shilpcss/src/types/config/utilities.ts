import type { ShilpConfig } from "@/types/config";
import type { Properties } from "@/types/config/properties";

/* ================================================================================================
	UTILITY METHODS
================================================================================================ */

/**
 * split utility token details.
 */
export interface UtilityDetails {
  /**
   * raw utility token from source content.
   */
  raw: string;
  /**
   * utility value segment without modifiers.
   */
  value: string;
  /**
   * true when the utility has a negative prefix.
   */
  negative: boolean;
  /**
   * optional variant name parsed from the utility.
   */
  variant?: string;
  /**
   * true when the utility has `!important` intent.
   */
  important: boolean;
}

/**
 * options used to resolve utilities for one intent.
 */
export interface ResolveUtilitiesOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * intent key owning the utilities.
   */
  intentName: keyof Properties;
  /**
   * parsed utility tokens for this intent.
   */
  utilities: UtilityDetails[];
  /**
   * true when the full intent is marked as important.
   */
  important: boolean;
}
