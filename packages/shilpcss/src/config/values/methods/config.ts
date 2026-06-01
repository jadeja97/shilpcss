import { deepMergeObj, isObj } from "@jadeja/ts/lib";

import values from "@/config/values/data";
import valueResolvers from "@/config/values/methods/resolvers";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

/**
 * resolves and merges the values configuration.
 *
 * Initialize `shilpConfig.values` and `shilpConfig.valueResolvers`.
 *
 * @param config - The shilp config object.
 */
const resolveValuesConfig = (config: ShilpConfig) => {
  //

  /* ==============================================================================================
	RESOLVE VALUES
	============================================================================================== */

  if (!isObj(config.values)) {
    config.values = values;
  }
  deepMergeObj(config.values, config.extend?.values ?? {});

  /* ==============================================================================================
		RESOLVE VALUE RESOLVERS
	============================================================================================== */

  if (!isObj(config.valueResolvers)) {
    config.valueResolvers = valueResolvers;
  }
  deepMergeObj(config.valueResolvers, config.extend?.valueResolvers ?? {});
};

/* ============================================================================================= */

export default resolveValuesConfig;
