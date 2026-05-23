import { getColor, getRawColor } from "@/config/values/methods/getters/color";
import { getDefaultValue } from "@/config/values/methods/getters/default";
import { getRawSpacing, getSpacing } from "@/config/values/methods/getters/spacing";

import type { ValueResolvers } from "@/types/config/values";

/* ============================================================================================= */

/**
 * value resolver methods.
 */
const valueResolvers = {
  //
  default: getDefaultValue,

  // colors
  color: getColor,
  rawColor: getRawColor,

  // spacing
  spacing: getSpacing,
  rawSpacing: getRawSpacing,
} as const satisfies ValueResolvers;

/* ============================================================================================= */

export default valueResolvers;

export type AvailableValueResolvers = keyof typeof valueResolvers;
