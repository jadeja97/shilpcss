import type { InlineTheme } from "@/types/config/theme";

/* ============================================================================================= */

/**
 * inline theme configuration tightly coupled with `shilpConfig.valueResolvers` object keys
 */
const inlineTheme = {
  color: { variant: true },
} as const satisfies InlineTheme;

/* ============================================================================================= */

export default inlineTheme;

export type AvailableInlineTheme = keyof typeof inlineTheme;
