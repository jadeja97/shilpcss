import type { NestedObject } from "@jadeja/ts/types/data";

import type propereties from "@/config/properties/data";
import type { ShilpConfig } from "@/types/config";
import type { UtilityDetails } from "@/types/config/utilities";
import type { ValueResolvers } from "@/types/config/values";
import type { PreventReservedKeys } from "@/types/utils";

/* ================================================================================================
	PROPERTY METHODS
================================================================================================ */

/**
 * options used to resolve CSS properties from utility tokens.
 */
export interface GetPropertiesOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * property config for the matched rule.
   */
  propertyConfig: PropertyConfig;
  /**
   * intent key that owns this property.
   */
  intentName: keyof Properties;
  /**
   * split utility details.
   */
  utility: UtilityDetails;
  /**
   * value token segments from the utility.
   */
  valueTokens: string[];
}

/* ================================================================================================
	PROPERTY CONFIG
================================================================================================ */

/**
 * nested value object used by property configs.
 */
export type PropertyConfigValues = NestedObject<string | number>;

/**
 * property config variant that reads from a theme key.
 */
export interface PropertyConfigWithThemeKey {
  /**
   * [with `themeKey`] Final CSS property name.
   */
  property: string;
  /**
   * optional resolver key for value lookup.
   */
  resolve?: keyof ValueResolvers;
  /**
   * theme key to read values from.
   */
  themeKey: string;
  /**
   * enables variant-aware lookup when true.
   */
  variant?: boolean;
  /**
   * [with `themeKey`] Not allowed in this property config variant.
   */
  special?: never;
  /**
   * optional inline values that can override theme values.
   */
  values?: PropertyConfigValues;
}

/**
 * property config variant that only uses local values.
 */
export interface PropertyConfigWithoutThemeKey {
  /**
   * [without `themeKey`] Final CSS property name.
   */
  property: string;
  /**
   * optional resolver key for value lookup.
   */
  resolve?: keyof ValueResolvers;
  /**
   * [without `themeKey`] Not allowed in this property config variant.
   */
  themeKey?: never;
  /**
   * enables variant-aware lookup when true.
   */
  variant?: boolean;
  /**
   * [without `themeKey`] Not allowed in this property config variant.
   */
  special?: never;
  /**
   * required local values for lookup.
   */
  values: PropertyConfigValues;
}

/**
 * property config variant used for direct `<v>` special value passthrough.
 */
export interface PropertyConfigWithSpecial {
  /**
   * [with `special`] Must be `<v>` for special direct value output.
   */
  property: "<v>";
  /**
   * enables special direct value mode.
   */
  special: true;
  /**
   * optional resolver key for value lookup.
   */
  resolve?: keyof ValueResolvers;
  /**
   * optional theme key to read values from.
   */
  themeKey?: string;
  /**
   * enables variant-aware lookup when true.
   */
  variant?: boolean;
  /**
   * required local values for lookup.
   */
  values: PropertyConfigValues;
}

/**
 * supported property config type.
 */
export type PropertyConfig =
  | PropertyConfigWithSpecial
  | (PropertyConfigWithThemeKey | PropertyConfigWithoutThemeKey);

/* ================================================================================================
	PROPERTIES DEFINITIONS
================================================================================================ */

export type Properties = Record<string, NestedObject<PropertyConfig>> & PreventReservedKeys;

/**
 * type of ShilpCSS built-in `properties` config.
 */
export type PropertiesShape = typeof propereties;

/**
 * union of built-in property keys.
 */
export type { AvailableProperties } from "@/config/properties/data";
