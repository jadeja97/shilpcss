import { throwError } from "@jadeja/ts/lib/logger";
import { deepMergeObj } from "@jadeja/ts/lib/operations";
import { isObj } from "@jadeja/ts/lib/types";

import { RESERVED_NAMES } from "@/config/index/constants";
import mixins from "@/config/mixins/data";

import type { ShilpConfig } from "@/types/config";

/* ============================================================================================= */

/**
 * resolves and merges mixins configuration.
 *
 * Initializes `shilpConfig.mixins`.
 *
 * @param config - The shilp config object.
 */
const resolveMixinsConfig = (config: ShilpConfig) => {
  //
  if (!isObj(config.mixins)) {
    config.mixins = mixins;
  }
  //
  deepMergeObj(config.mixins, config.extend?.mixins ?? {});

  // prevent using reserved names
  for (const mixinName in config.mixins) {
    //
    if (!Object.hasOwn(config.mixins, mixinName)) {
      continue;
    }

    if ((RESERVED_NAMES as readonly string[]).includes(mixinName)) {
      throwError(
        `MIXINS: \`${mixinName}\` mixin name is a reserved name.\nPlease use different name.`,
      );
    }
  }
};

/* ============================================================================================= */

export default resolveMixinsConfig;
