import { INLINE_THEME_PATTERN } from "@/config/theme/constants";
import { createUtility } from "@/config/utilities/methods";
import { getValuesGetterMethod } from "@/config/values/methods";
import { throwError } from "@/lib/logger";
import { fresh } from "@/lib/operations";
import { isStr } from "@/lib/types";

import type { ResolveInlineThemeOptions, ThemeObject } from "@/types/config/theme";
import type { ValueResolvers } from "@/types/config/values";

/* ============================================================================================= */

/**
 * resolves inline theme function.
 *
 * @param options - Options for resolving inline theme function to property value.
 * @param options.config - The shilp config object.
 * @param options.content - The content (css) string.
 * @param options.filePath - The file path for error logging.
 *
 * @returns Resolved css property value.
 *
 * @throws If the specified value resolver function is not found.
 */
// oxlint-disable import/prefer-default-export
export const resolveInlineTheme = ({ config, content, filePath }: ResolveInlineThemeOptions) => {
  //

  // return the raw content if inline theme function is not defined
  if (!(isStr(content) && fresh(INLINE_THEME_PATTERN).test(content))) {
    return content;
  }

  return content.replace(
    fresh(INLINE_THEME_PATTERN),
    //
    (
      rawValue: string,
      // oxlint-disable eslint/default-param-last
      inlineValueResolveFn: keyof ValueResolvers = "default",
      inlineTokens: string,
    ) => {
      //

      // get value resolver method
      const getValue = getValuesGetterMethod({
        resolveFn: inlineValueResolveFn,
        valueResolvers: config.valueResolvers ?? {},
        errorFn: () => {
          throwError(
            `"${filePath}" :: \`${inlineValueResolveFn}\` function does not found for \`${rawValue}\` in at \`shilpConfig.valueResolvers\``,
          );
        },
      });

      // create utility for theme tokens (value tokens always)
      const utility = createUtility(inlineTokens);
      utility.raw = rawValue;

      // inline theme config similiar like property config
      const inlineThemeConfig = config.inlineTheme?.[inlineValueResolveFn] ?? {};
      inlineThemeConfig.values = config.theme as ThemeObject;

      // get value tokens
      const valueTokens = utility.value.split("-");

      // NOTE: opt-in variant and only consume the very first "/" and any followings will be removed.
      // `- anything after "/" will be counted as one token.
      // `- this will prevent `x/y/z` pattern. this will grow increase the complexity.
      // `- can go with `x-y-z`, this will be n tokens has the appropiate variations
      //
      // by default, "/" will be considered as part of the utility value.
      // `- below we are joining it back if `variant: true` flag is not set, but this is separated while creating utility.
      // property config explicitely need to add `variant: true` flag to make this count as variant.
      if (!inlineThemeConfig.variant && utility.variant) {
        valueTokens.push(`${valueTokens.pop()}/${utility.variant}`);
        delete utility.variant;
      }

      // resolve and return css property value
      return getValue({
        config,
        intentName: filePath,
        utility,
        tokens: valueTokens,
        values: inlineThemeConfig.values,
        inlineThemeConfig,
      });
    },
  );
};
