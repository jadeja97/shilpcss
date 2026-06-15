import { deepMergeObj } from "@jadeja/ts/lib/operations";
import { isObj } from "@jadeja/ts/lib/types";

import propereties from "@/config/properties/data";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

/**
 * resolves and merges the properties configuration.
 *
 * Initializes `shilpConfig.properties`.
 *
 * @param config - The shilp config object.
 */
const resolvePropertiesConfig = (config: ShilpConfig) => {
  //
  if (!isObj(config.properties)) {
    config.properties = propereties;
  }
  //
  deepMergeObj(config.properties, config.extend?.properties ?? {});
};

/* ============================================================================================= */

export default resolvePropertiesConfig;
