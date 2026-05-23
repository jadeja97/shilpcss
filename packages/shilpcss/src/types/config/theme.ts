import type { defaultTheme } from "@/config/theme/data";
import type inlineTheme from "@/config/theme/data/inline-theme";
import type { ShilpConfig } from "@/types/config";
import type { ValueResolvers, Values, ValuesShape } from "@/types/config/values";
import type { NestedObject } from "@/types/shared";

/* ================================================================================================
	THEME METHODS
================================================================================================ */

/**
 * options used to resolve inline theme directives from content.
 */
export interface ResolveInlineThemeOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * raw source content to scan.
   */
  content: string;
  /**
   * path of the file being scanned.
   */
  filePath: string;
}

/* ================================================================================================
	THEME CONFIG
================================================================================================ */

/**
 * config for one inline-theme resolver key.
 */
export interface InlineThemeConfig {
  /**
   * enables variant-aware inline theme lookup.
   */
  variant?: boolean;
  /**
   * optional inline theme values object.
   */
  values?: ThemeObject;
}

/* ================================================================================================
	THEME DEFINITIONS
================================================================================================ */

/**
 * nested object used for theme values.
 */
export type ThemeObject = Record<string, NestedObject<string | number>>;

/**
 * options passed to theme function callbacks.
 */
export interface ThemeFunctionOptions {
  /**
   * user-defined values object.
   */
  values: Values;
  /**
   * built-in default values object.
   */
  defaultValues: ValuesShape;
  /**
   * built-in default theme object.
   */
  defaultTheme: ThemeShape;
}

/**
 * function that returns a generated theme object.
 */
export type ThemeFunction = (options: ThemeFunctionOptions) => ThemeObject;

/**
 * supported theme input type.
 */
export type Theme = ThemeObject | ThemeFunction;

/**
 * type of ShilpCSS built-in `theme` config.
 */
export type ThemeShape = typeof defaultTheme;

/**
 * union of built-in theme keys.
 */
export type { AvailableTheme } from "@/config/theme/data";

/* ============================================================================================= */

/**
 * options passed to extend-theme function callbacks.
 */
export interface ExtendThemeFunctionOptions {
  /**
   * user-defined values object.
   */
  values: Values;
  /**
   * user-provided theme input.
   */
  theme: Theme;
  /**
   * built-in default values object.
   */
  defaultValues: ValuesShape;
  /**
   * built-in default theme object.
   */
  defaultTheme: ThemeShape;
}

/**
 * function that returns an extended theme object.
 */
export type ExtendThemeFunction = (options: ExtendThemeFunctionOptions) => ThemeObject;

/**
 * supported extend-theme input type.
 */
export type ExtendTheme = ThemeObject | ExtendThemeFunction;

/* ============================================================================================= */

/**
 * inline theme object by resolver key.
 */
export type InlineTheme = Record<keyof ValueResolvers, InlineThemeConfig>;

/**
 * type of ShilpCSS built-in `inlineTheme` config.
 */
export type InlineThemeShape = typeof inlineTheme;

/**
 * union of built-in inline-theme keys.
 */
export type { AvailableInlineTheme } from "@/config/theme/data/inline-theme";
