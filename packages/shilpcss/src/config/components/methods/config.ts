import components from "@/config/components/data";
import { deepMergeObj } from "@/lib/operations";
import { isObj } from "@/lib/types";

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
