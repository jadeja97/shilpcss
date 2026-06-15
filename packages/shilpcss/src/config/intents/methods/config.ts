import { throwError } from "@jadeja/ts/lib/logger";
import { deepMergeObj } from "@jadeja/ts/lib/operations";
import { isObj } from "@jadeja/ts/lib/types";

import { RESERVED_NAMES } from "@/config/index/constants";

import type { ShilpConfig } from "@/types/config";
import type { Intents } from "@/types/config/intents";

/* ============================================================================================= */

/**
 * resolves and merges intents configurations.
 *
 * Initializes `shilpConfig.intents`.
 *
 * @param config - The shilp config object.
 */
const resolveIntentsConfig = (config: ShilpConfig) => {
  //
  if (!isObj(config.intents)) {
    config.intents = {} as Intents;
  }

  for (const intentName in config.properties) {
    //
    if (!Object.hasOwn(config.properties, intentName)) {
      continue;
    }

    if (isObj(config.properties[intentName])) {
      deepMergeObj(config.intents, {
        [intentName]: {},
      } as Intents);
    }
  }

  deepMergeObj(config.intents, config.extend?.intents ?? {});

  // prevent using reserved names
  for (const intentName in config.intents) {
    //
    if (!Object.hasOwn(config.intents, intentName)) {
      continue;
    }

    if ((RESERVED_NAMES as readonly string[]).includes(intentName)) {
      throwError(
        `INTENTS: \`${intentName}\` intent name is a reserved name.\nPlease use different name.`,
      );
    }
  }
};

/* ============================================================================================= */

export default resolveIntentsConfig;
