import type { ShilpConfig } from "@/types/config";
import type { Properties, PropertiesShape } from "@/types/config/properties";

/* ================================================================================================
	INTENT METHODS
================================================================================================ */

/**
 * intent details split from the intent token.
 */
export interface IntentDetails {
  /**
   * resolved intent key.
   */
  name: keyof Intents;
  /**
   * whether the intent is marked as important.
   */
  important: boolean;
  /**
   * raw intent token from input content.
   */
  raw: string;
}

/**
 * options used to resolve a single intent token.
 */
export interface ResolveIntentOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * intent key to resolve.
   */
  intentName: keyof Intents;
  /**
   * whether the intent is important.
   */
  important: boolean;
  /**
   * raw utilities string for this intent.
   */
  rawUtilities: string;
}

/* ================================================================================================
	INTENT CONFIG
================================================================================================ */

/**
 * per-intent config options.
 */
export interface IntentConfig {
  /**
   * disables this intent when true.
   */
  disable?: boolean;
}

/* ================================================================================================
	INTENTS DEFINITIONS
================================================================================================ */

/**
 * object with all intents aligned to available properties.
 */
export type Intents = Record<keyof Properties, IntentConfig>;

/**
 * internal full `intents` object type after properties are known.
 */
export type IntentsShape = {
  /**
   * intent config per property key.
   */
  [K in keyof PropertiesShape]: IntentConfig;
};
