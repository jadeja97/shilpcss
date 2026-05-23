import type values from "@/config/values/data";
import type valueResolvers from "@/config/values/methods/resolvers";
import type { ShilpConfig } from "@/types/config";
import type { Properties, PropertyConfig } from "@/types/config/properties";
import type { InlineThemeConfig } from "@/types/config/theme";
import type { UtilityDetails } from "@/types/config/utilities";
import type { NestedObject } from "@/types/shared";

/* ================================================================================================
	VALUE METHODS
================================================================================================ */

/**
 * options used to select a value resolver function by key.
 */
export interface GetValueGetterMethodOptions {
  /**
   * resolver key to select.
   */
  resolveFn: keyof ValueResolvers;
  /**
   * available resolver functions object.
   */
  valueResolvers: ValueResolvers;
  /**
   * optional fallback callback when resolver key is missing.
   */
  errorFn?: () => void;
}

/**
 * return the selected value resolver function.
 */
export type GetValueGetterMethodOutput = ValueResolvers[number];

/**
 * options used to resolve property(ies) value from tokens.
 */
export interface GetPropertyValueOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * value token segments from the utility.
   */
  tokens: string[];
  /**
   * optional resolver key override.
   */
  resolve?: keyof ValueResolvers;
  /**
   * values object used for lookup.
   */
  values: PropertyConfig["values"];
  /**
   * split utility details.
   */
  utility: UtilityDetails;
  /**
   * intent key owning this property.
   */
  intentName: keyof Properties;
  /**
   * property config used for lookup and output mapping.
   */
  propertyConfig: PropertyConfig;
}

/**
 * shared options passed to value resolver functions.
 */
export type ValueResolverOptions = {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * split utility details.
   */
  utility: UtilityDetails;
  /**
   * value token segments from the utility.
   */
  tokens: string[];
  /**
   * values object used for lookup.
   */
  values: PropertyConfig["values"];
} & (
  | {
      /**
       * intent key when resolving property-based values.
       */
      intentName: keyof Properties;
      /**
       * property config when resolving property-based values.
       */
      propertyConfig: PropertyConfig;
      /**
       * [with `propertyConfig`] Not allowed in property-based resolver calls.
       */
      inlineThemeConfig?: never;
    }
  | {
      /**
       * inline-theme key when resolving inline-theme values.
       */
      intentName: string;
      /**
       * [with `inlineThemeConfig`] Not allowed in inline-theme resolver calls.
       */
      propertyConfig?: never;
      /**
       * inline-theme config used for this resolver call.
       */
      inlineThemeConfig: InlineThemeConfig;
    }
);

/* ================================================================================================
	VALUES DEFINITIONS
================================================================================================ */

/**
 * object with value groups keyed by name.
 */
export type Values = Record<string, NestedObject<string | number>>;

/**
 * type of ShilpCSS built-in `values` config.
 */
export type ValuesShape = typeof values;

/**
 * union of built-in value keys.
 */
export type { AvailableValues } from "@/config/values/data";

/* ============================================================================================= */

/**
 * object with resolver functions keyed by resolver name.
 */
export type ValueResolvers = Record<string, (options: ValueResolverOptions) => string>;

/**
 * type of ShilpCSS built-in `valueResolvers` config.
 */
export type ValueResolversShape = typeof valueResolvers;

/**
 * union of built-in resolver keys.
 */
export type { AvailableValueResolvers } from "@/config/values/methods/resolvers";
