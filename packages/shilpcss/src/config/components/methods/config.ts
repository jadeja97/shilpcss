import { deepMergeObj, isObj } from "@jadeja/ts/lib";

import components from "@/config/components/data";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

/**
 * resolves and merges component configurations.
 *
 * Initializes `shilpConfig.components`.
 *
 * @param config - The shilp config object.
 */
const resolveComponentsConfig = (config: ShilpConfig) => {
  //
  if (!isObj(config.components)) {
    config.components = components;
  }
  //
  deepMergeObj(config.components, config.extend?.components ?? {});
};

/* ============================================================================================= */

export default resolveComponentsConfig;
