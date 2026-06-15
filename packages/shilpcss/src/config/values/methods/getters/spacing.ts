import { throwError } from "@jadeja/ts/lib/logger";
import { isObj, isStr, isNum } from "@jadeja/ts/lib/types";

import type { NestedObject } from "@jadeja/ts/types/data";

import type { ValueResolverOptions } from "@/types/config/values";

/* ================================================================================================
	GET RAW SPACING VALUE  (AS-IS FROM `propertyConfig.values`)
================================================================================================ */

/**
 * retrieves the raw spacing value based on the provided configuration.
 *
 * @param options - Options for getting raw spacing.
 * @param options.values - The values object containing resolved values (may be nested).
 * @param options.tokens - The value tokens used for property resolution.
 * @param options.utility - The utility object containing raw value and other properties.
 * @param options.intentName - The name of the intent to which the property belongs.
 *
 * @returns The raw spacing value.
 *
 * @throws { Error } If the utility cannot be resolved to spacing value.
 */
export const getRawSpacing = ({ values, tokens, utility, intentName }: ValueResolverOptions) => {
  //
  let value: string | number = "";

  let obj = values as NestedObject<string | number>;
  let i = 0;

  while (!value && i <= tokens.length) {
    //
    const token = tokens[i];

    if (!isObj(obj)) {
      break;
    }

    const nestedObj = obj[token] ?? obj.DEFAULT;

    if (!nestedObj && nestedObj !== 0) {
      break;
    }

    if (isStr(nestedObj) || isNum(nestedObj)) {
      value = nestedObj;
      break;
    }

    obj = nestedObj;
    i++;
  }

  if (!value && value !== 0) {
    throwError(`${intentName.toUpperCase()} -> SPACING: ${utility.raw} not resolved!`);
  }

  return `${value}`;
};

/* ================================================================================================
	GET PROCESSED SPACING VALUE
================================================================================================ */

/**
 * retrieves the spacing value based on the provided configuration.
 *
 * @param options - Options for getting spacing in rem (mostly).
 * @param options.values - The values object containing resolved values (may be nested).
 * @param options.tokens - The value tokens used for property resolution.
 * @param options.utility - The utility object containing raw value and other properties.
 * @param options.intentName - The name of the intent to which the property belongs.
 *
 * @returns The spacing value, either in px or converted to rem.
 */
export const getSpacing = ({
  values,
  tokens,
  utility,
  intentName,
  ...rest
}: ValueResolverOptions) => {
  //
  const rawSpacing = getRawSpacing({
    values,
    tokens,
    utility,
    intentName,
    ...rest,
  });

  const rawStr = isStr(rawSpacing);

  if (
    rawStr &&
    // covers "auto" keyword for margin
    (rawSpacing.includes("calc") || !rawSpacing.endsWith("px"))
  ) {
    return rawSpacing;
  }

  // 4 precision decimal unless any of it, is non-zero
  return `${(Number.parseFloat(rawSpacing) / 16).toFixed(4).replace(".0000", "")}rem`;
};
