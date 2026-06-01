import { throwError, isNum, isObj, isStr } from "@jadeja/ts/lib";

import type { ValueResolverOptions } from "@/types/config/values";
import type { NestedObject } from "@/types/shared";

/* ============================================================================================= */

/**
 * retrieves the value based on the provided configuration.
 *
 * This is a default function to get value, if value resolver not specified.
 *
 * @param options - Options for getting raw value.
 * @param options.values - The values object containing resolved values (may be nested).
 * @param options.tokens - The value tokens used for property resolution.
 * @param options.utility - The utility object containing raw value and other flags.
 * @param options.intentName - The name of the intent to which the property belongs.
 *
 * @returns The resolved value.
 *
 * @throws If the utility cannot be resolved to value.
 */
// oxlint-disable import/prefer-default-export
export const getDefaultValue = ({ values, tokens, utility, intentName }: ValueResolverOptions) => {
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

    let nestedObj = obj[token] ?? obj.DEFAULT;

    if (!nestedObj && nestedObj !== 0) {
      //

      // NOTE: here utility.raw is `"theme(...)"` string
      if (utility.raw.includes("theme") && utility.raw.includes("color")) {
        //
        nestedObj = obj["500"];
        //
      } else {
        //
        break;
      }
    }

    if (isStr(nestedObj) || isNum(nestedObj)) {
      value = nestedObj;
      break;
    }

    obj = nestedObj;
    i++;
  }

  if (!value && value !== 0) {
    throwError(`${intentName.toUpperCase()} -> ${utility.raw} not resolved!`);
  }

  return `${value}`;
};
