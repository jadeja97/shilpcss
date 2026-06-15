import { createUtility, resolveUtilities } from "@/config/utilities/methods";

import type { IntentDetails, ResolveIntentOptions } from "@/types/config/intents";

/* ================================================================================================
	CREATE INTENT DETAILS
================================================================================================ */

/**
 * creates a intent object from a raw intent name string.
 *
 * @param rawIntentName - The raw intent name string to be processed.
 *
 * @returns An object containing parsed intent name information.
 */
export const createIntent = (rawIntentName: string): IntentDetails => {
  //
  let name = rawIntentName;
  let important = false;

  if (name.endsWith("!")) {
    important = true;
    name = name.slice(0, -1);
  }

  return {
    name,
    important,
    raw: rawIntentName,
  };
};

/* ================================================================================================
	RESOLVE INTENTS
================================================================================================ */

/**
 * resolves the utilities for a specific intent.
 *
 * If the intent name does not match from config and content, return raw content to process by next
 * matcher.
 *
 * @param options - Options for splitting intent and utilities.
 * @param options.config - The shilp config object.
 * @param options.intentName - The name of the intent to resolve.
 * @param options.rawUtilities - Raw utilities of the current intent (space separated string).
 * @param options.important - Important flag on intent level makes all the utilities important.
 *
 * @returns The resolved content (css properties) for the intent.
 */
export const resolveIntent = ({
  config,
  intentName,
  important,
  rawUtilities,
}: ResolveIntentOptions) => {
  return resolveUtilities({
    config,
    intentName,
    important,
    utilities: rawUtilities.split(" ").map((utility) => {
      return createUtility(utility);
    }),
  });
};
