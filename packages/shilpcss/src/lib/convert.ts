import browserslist from "browserslist";
import { transform, browserslistToTargets } from "lightningcss";

import { isObj, isStr } from "@/lib/types";

import type { NestedObject } from "@/types";

/* ============================================================================================= */

/**
 * convert LCH string to RGB string
 *
 * @param obj - Object with LCH values (can be nested).
 *
 * @returns Object with RGB value (structure same as original).
 */
// oxlint-disable import/prefer-default-export
export const lchToRgb = <T extends NestedObject<string>>(obj: T): T => {
  //
  const output = {} as T;

  // OKLCH string "0-100% 0-1 0-255" → RGB string "0–255 0-255 0-255"
  const transpile = (str: string) => {
    const { code } = transform({
      filename: "shilpcss/lib/convert.ts",
      code: Buffer.from(str),
      minify: true,
      targets: browserslistToTargets(browserslist("since 2012-01-31")),
    });

    return code?.toString().split("rgba(")[1].split(");")[0].split(",").slice(0, 3).join(" ");
  };

  const nested = (src: NestedObject<string>, dest: NestedObject<string>) => {
    for (const [key, val] of Object.entries(src)) {
      //
      if (!Object.hasOwn(src, key)) {
        continue;
      }

      if (isStr(val)) {
        dest[key] = transpile(`body { color: oklch(${val} / 0.9); }`);
      } else if (isObj(val)) {
        dest[key] = {};
        nested(val, dest[key]);
      }
    }
  };

  nested(obj, output);

  return output;
};
