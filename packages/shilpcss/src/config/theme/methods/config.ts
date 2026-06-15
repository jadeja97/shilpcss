import { throwError } from "@jadeja/ts/lib/logger";
import { deepMergeObj } from "@jadeja/ts/lib/operations";
import { isObj, isFn, isStr } from "@jadeja/ts/lib/types";

import theme, { defaultTheme } from "@/config/theme/data";
import inlineTheme from "@/config/theme/data/inline-theme";
import values from "@/config/values/data";

import type { NestedObject } from "@jadeja/ts/types/data";

import type { ShilpConfig } from "@/types/config";
import type { InlineTheme, ThemeObject } from "@/types/config/theme";

/* ============================================================================================= */

/**
 * resolves and merges the theme and inline theme configuration.
 *
 * Initializes `shilpConfig.theme` and `shilpConfig.inlineTheme`.
 *
 * @param config - The shilp config object.
 */
const resolveThemeConfig = (config: ShilpConfig): void => {
  //

  /* ==============================================================================================
		RESOLVE THEME
	============================================================================================== */

  if (!isObj(config.theme) && !isFn(config.theme)) {
    config.theme = theme({
      values: config.values ?? {},
      defaultValues: values,
      defaultTheme,
    }) as ThemeObject;
  }

  let inBuiltTheme = config.theme ?? defaultTheme;
  let userTheme = config.extend?.theme ?? {};

  if (isFn(inBuiltTheme)) {
    inBuiltTheme =
      inBuiltTheme({
        values: config.values ?? {},
        defaultValues: values,
        defaultTheme,
      }) ?? defaultTheme;
  }

  if (isFn(userTheme)) {
    userTheme = (userTheme({
      values: config.values ?? {},
      theme: config.theme ?? {},
      defaultValues: values,
      defaultTheme,
    }) ?? {}) as ThemeObject;
  }

  const resolvedTheme = deepMergeObj(inBuiltTheme, userTheme);

  /* ==============================================================================================
		INLINE THEME VALIDATIONS
	============================================================================================== */

  const screens = resolvedTheme.screens as NestedObject<string>;

  for (const [key, val] of Object.entries(screens ?? {})) {
    //
    if (!Object.hasOwn(screens ?? {}, key)) {
      continue;
    }

    if (!isStr(val) || !val.endsWith("px")) {
      return throwError(
        `THEME: \`theme.screens.${key}\` → breakpoint value must be absolute (px). Other units are not supported.`,
      );
    }
  }

  //

  // set resolved theme
  config.theme = resolvedTheme as ThemeObject;

  /* ==============================================================================================
		RESOLVE INLINE THEME CONFIG
	============================================================================================== */

  const inBuiltInlineTheme = config.inlineTheme ?? inlineTheme;

  config.inlineTheme = deepMergeObj(
    inBuiltInlineTheme,
    config.extend?.inlineTheme ?? {},
  ) as InlineTheme;
};

/* ============================================================================================= */

export default resolveThemeConfig;
