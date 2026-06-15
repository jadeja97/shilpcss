import { error, printBlankLine, printSeparator, throwError } from "@jadeja/ts/lib/logger";
import { freshRegex } from "@jadeja/ts/lib/operations";

import { RESERVED_NAMES } from "@/config/index/constants";
import { INTENT_PATTERN } from "@/config/intents/constants";
import { createIntent, resolveIntent } from "@/config/intents/methods";
import { resolveInlineTheme } from "@/config/theme/methods";

import type { ProcessOptions } from "@/types/bundlers/methods/process";

/* ============================================================================================= */

/**
 * processes content (css) which is the output by pre-processing life-cycle.
 *
 * @param options - Options for processing the contnet.
 * @param options.config - The shilp config object.
 * @param options.content - The pre-processed content (css) to be processed.
 * @param options.filePath - The file path of the content for error logging.
 *
 * @returns The processed content.
 *
 * @throws { Error } If an error occurs during processing or intent config not found.
 */
const process = ({ config, content, filePath }: ProcessOptions) => {
  //
  try {
    //

    /* ============================================================================================
			RESOLVE CONTENT  (intent to css properties)
		============================================================================================ */

    const processedContent = content.replace(
      freshRegex(INTENT_PATTERN),
      //
      (rawContent: string, rawIntentName: string, rawUtilities: string) => {
        //

        // split intent name to parts
        const { name, important } = createIntent(rawIntentName);

        // return the content for reserved names
        if ((RESERVED_NAMES as readonly string[]).includes(name)) {
          return rawContent;
        }

        // get intent config
        const intentConfig = config.intents?.[name];

        // throw error if intent config not found
        if (!intentConfig) {
          return throwError(
            `INTENTS: \`${name}\` intent name do not exist in shilp config.\nIt is used in "${filePath}".`,
          );
        }

        // remove intent definition if disabled
        if (intentConfig?.disable) {
          return "";
        }

        // resolve intent to css properties
        return resolveIntent({
          config,
          intentName: name,
          rawUtilities,
          important,
        });
      },
    );

    /* ============================================================================================
			RESOLVE INLINE THEME
		============================================================================================ */

    // NOTE: one is already at the pre-process method just before scss compilation to prevent error
    // 1. before scss compilation
    // 2. after processing all utilities
    return resolveInlineTheme({ config, content: processedContent, filePath });
    //
  } catch (err) {
    //
    printSeparator();
    printBlankLine();
    error(`Error: Processing :: ${filePath}`);
    printBlankLine();
    printSeparator();
    return throwError(err);
  }
};

/* ============================================================================================= */

export default process;
