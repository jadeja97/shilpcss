/**
 * default browser target for cross-browser and legacy version compatibility
 */
export const DEFAULT_BROWSER_TARGET = "since 2023-01-31";

/* ============================================================================================= */

/**
 * scss imports.
 *
 * This statement is intended to be added at the top of CSS code before compilation by the sass JS
 * API.
 */
export const SCSS_IMPORTS = `@use "sass:list";`;

/* ============================================================================================= */

/**
 * purge css source to scan for styles.
 *
 * for efficient purging, provide source files from build folder instead of src folder.
 */
export const PURGECSS_SOURCE_FOR_FRAMEWORK = {
  // vite
  react: ["./dist/**/*.{html,js}"],
  // vite
  vue: ["./dist/**/*.{html,js}"],
};

/* ============================================================================================= */

/**
 * detect LCH color format pattern
 *
 * this is for [L 0-100% (float)] [C 0-1 (float)] [H 0-255 (float)]
 */
export const LCH_COLOR_FORMAT_PATTERN = /(\d*\.?\d+)%\s+(\d*\.?\d+)\s+(\d*\.?\d+)/g;

/* ============================================================================================= */

/**
 * lists all reserved intent or mixins like patterns to filter
 *
 * @example
 *   -`@charset "utf-8"; @if <expression> {}`;
 */
export const RESERVED_NAMES = [
  //

  // CSS reserved names

  "custom-media",
  "font-palette-values",
  "charset",
  "import",
  "namespace",
  "media",
  "supports",
  "layer",
  "scope",
  "container",
  "page",
  "font-face",
  "font-feature-values",
  "keyframes",
  "counter-style",
  "property",
  "color-profile",
  "view-transition",
  "starting-style",

  // SCSS reserved names

  "break",
  "continue",
  "use",
  "forward",
  "import",
  "mixin",
  "include",
  "function",
  "return",
  "if",
  "else",
  "each",
  "for",
  "while",
  "error",
  "warn",
  "debug",
  "at-root",
  "extend",
  "content",
] as const;
