import { throwError, deepCopy, deepMergeObj } from "@jadeja/ts/lib";

import { getPropertyValue } from "@/config/values/methods";

import type { GetPropertiesOptions, PropertyConfigValues } from "@/types/config/properties";

/* ================================================================================================
	GET RESOLVED PROPERTY(IES)
================================================================================================ */

/**
 * resolve property(ies) based on config.
 *
 * @param options - Options for resolving property(ies) from utility.
 * @param options.config - The shilp config object.
 * @param options.propertyConfig - Configuration for property generation.
 * @param options.intentName - Name of the intent to which properties belong.
 * @param options.utility - Utility object with various flags.
 * @param options.valueTokens - Tokens used for resolving the property value.
 *
 * @returns The generated property(ies) string.
 */
// oxlint-disable import/prefer-default-export
export const getProperties = ({
  config,
  propertyConfig,
  intentName,
  utility,
  valueTokens,
}: GetPropertiesOptions) => {
  //

  /* ==============================================================================================
		RESOLVE PROPERTY VALUES OBJECT
	============================================================================================== */

  propertyConfig.values ??= {};

  // special --> { property: "<v>", values: { ... } }
  // no `;` semicolon, no `<i>` important flag and no `<n>` negative. this will be provided in value.
  // NOTE: make sure value must end with `;` semicolon.
  // NOTE: special property just don't support global values.
  if (!propertyConfig.special) {
    //
    const values = deepCopy(config.theme?.["globalValues" as keyof typeof config.theme] ?? {});

    if (propertyConfig.themeKey) {
      //
      if (config.theme && !(propertyConfig.themeKey in config.theme)) {
        throwError(
          `${intentName.toUpperCase()} -> Invalid theme key ${
            propertyConfig.themeKey
          } for ${utility.raw}`,
        );
      }

      // first extend or override global values with theme values
      deepMergeObj(
        values,
        config.theme?.[propertyConfig.themeKey as keyof typeof config.theme] ?? {},
      );
      //
    }

    // then extend or override with values defined in property config values
    deepMergeObj(values, propertyConfig.values || {});
    // update the values
    propertyConfig.values = values as PropertyConfigValues;
  }

  /* ==============================================================================================
		RESOLVE PROPERTY VALUES VARIANT
	============================================================================================== */

  // NOTE: opt-in variant and only consume the very first "/" and any followings will be removed.
  // `- anything after "/" will be counted as one token.
  // `- this will prevent `x/y/z` pattern. this will grow increase the complexity.
  // `- can go with `x-y-z`, this will be n tokens has the appropiate variations
  //
  // by default, "/" will be considered as part of the utility value.
  // `- below we are joining it back if `variant: true` flag is not set, but this is separated while creating utility.
  // property config explicitely need to add `variant: true` flag to make this count as variant.
  if (!propertyConfig.variant && utility.variant) {
    valueTokens.push(`${valueTokens.pop()}/${utility.variant}`);
    delete utility.variant;
  }

  /* ==============================================================================================
		GET RESOLVEVD PROPERTY VALUE
	============================================================================================== */

  const value = getPropertyValue({
    config,
    tokens: valueTokens,
    resolve: propertyConfig.resolve,
    values: propertyConfig.values,
    utility,
    intentName,
    propertyConfig,
  });

  /* ==============================================================================================
		CREATE AND RETURN PROPERTY(IES)
	============================================================================================== */

  return (
    propertyConfig.property
      // might be possible that property is group of one or more properties in string so using `replace all`
      //
      // <v> need to be first because of `propertyConfig.special: true`. in this case proeprty has only "<v>" and values.* have the property definition.
      .replaceAll("<v>", value)
      .replaceAll("<n>", utility.negative ? "-" : "")
      .replaceAll("<i>", utility.important ? " !important" : "")
  );
};
