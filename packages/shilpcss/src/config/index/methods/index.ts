import { isObj } from "@jadeja/ts/lib";

import resolveComponentsConfig from "@/config/components/methods/config";
import resolveIntentsConfig from "@/config/intents/methods/config";
import resolveMixinsConfig from "@/config/mixins/methods/config";
import resolvePropertiesConfig from "@/config/properties/methods/config";
import resolveThemeConfig from "@/config/theme/methods/config";
import resolveValuesConfig from "@/config/values/methods/config";

import type { ShilpConfig } from "@/types";

/* ============================================================================================= */

/**
 * resolves and merges default config with user config.
 *
 * Mutate the shilp config object with various configs resolved.
 *
 * @param config - The shilp config object to be resolved.
 */
const resolveConfig = (config: ShilpConfig) => {
  // add extend if not exist
  if (!isObj(config.extend)) {
    config.extend = {};
  }

  // resolve: values
  resolveValuesConfig(config);

  // resolve: theme (depends on resolved values)
  resolveThemeConfig(config);

  // resolve: properties (depends on resolved values & resolved theme)
  resolvePropertiesConfig(config);

  // create & Resolve: intents (depends on resolved properties)
  resolveIntentsConfig(config);

  // resolve: components (may depends on any of the above)
  resolveComponentsConfig(config);

  // resolve: mixins (independent)
  resolveMixinsConfig(config);
};

/* ============================================================================================= */

export default resolveConfig;
