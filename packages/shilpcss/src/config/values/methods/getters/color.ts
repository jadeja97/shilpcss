import { LCH_COLOR_FORMAT_PATTERN } from "@/config/index/constants";
import { throwError } from "@/lib/logger";
import { fresh } from "@/lib/operations";
import { isObj, isStr } from "@/lib/types";

import type { ValueResolverOptions } from "@/types/config/values";
import type { NestedObject } from "@/types/shared";

/* ================================================================================================
	GET RAW COLOR VALUE  (AS-IS FROM `propertyConfig.values`)
================================================================================================ */

/**
 * retrieves the raw color value based on the provided configuration.
 *
 * @param options - Options for getting raw color.
 * @param options.values - The values object containing resolved values.
 * @param options.tokens - The value tokens used for property resolution.
 * @param options.utility - The utility object containing raw value and other properties.
 * @param options.intentName - The name of the intent to which the property belongs.
 *
 * @returns The raw color value.
 *
 * @throws If the utility cannot be resolved to color value.
 */
export const getRawColor = ({ values, tokens, utility, intentName }: ValueResolverOptions) => {
  //
  let value = "";

  let obj = (values as NestedObject<string>) || {};

  let i = 0;

  while (!value && i <= tokens.length) {
    //
    const token = tokens[i];

    if (!isObj(obj)) {
      break;
    }

    const nestedObj = obj[token] || obj.DEFAULT || obj[500];

    if (!nestedObj) {
      break;
    }

    if (isStr(nestedObj)) {
      value = nestedObj;
      break;
    }

    obj = nestedObj;
    i++;
  }

  if (!value) {
    throwError(`${intentName.toUpperCase()} -> COLORS: ${utility.raw} not resolved!`);
  }

  return value;
};

/* ================================================================================================
	GET PROCESSED RAW COLOR VALUE
================================================================================================ */

/**
 * retrieves the color value based on the provided configuration.
 *
 * @param options - Options for getting color with format.
 * @param options.values - The values object containing resolved values (may be nested).
 * @param options.tokens - The value tokens used for property resolution.
 * @param options.utility - The utility object containing raw value and other properties.
 * @param options.intentName - The name of the intent to which the property belongs.
 *
 * @returns The color value in oklch format with optional opacity.
 *
 * @throws If the propvided opacity in utility is out of range.
 */
export const getColor = ({
  values,
  tokens,
  utility,
  intentName,
  ...rest
}: ValueResolverOptions) => {
  //
  const rawColor = getRawColor({
    values,
    tokens,
    utility,
    intentName,
    ...rest,
  });

  const isLCHPattern = fresh(LCH_COLOR_FORMAT_PATTERN).test(rawColor);

  // value with no css variable and no oklch color pattern
  if (!rawColor.startsWith("var") && !isLCHPattern) {
    return rawColor;
  }

  let opacity: string | number | undefined = utility.variant;

  /* if not has opacity */
  // opacity is string, so "0" will be true
  if (!opacity) {
    return `oklch(${rawColor})`;
  }

  /* if has opacity */

  // no digit
  if (!/\d/.test(opacity)) {
    throwError(
      `${intentName.toUpperCase()} -> COLORS: ${utility.raw} - Expected digits for opacity.`,
    );
  }

  opacity = Number.parseInt(opacity, 10);

  // not in range
  if (opacity < 0 || opacity > 100) {
    throwError(
      `${intentName.toUpperCase()} -> COLORS: ${
        utility.raw
      } - Expected range: 0 to 100 for opacity.`,
    );
  }

  // looks good in comments only :p
  // if (opacity === 0) return values.none || "transparent";
  // if (opacity === 100) return `oklch(${rawColor})`;

  return `oklch(${rawColor} / ${opacity / 100})`;
};
