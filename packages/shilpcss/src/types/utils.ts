import type { RESERVED_NAMES } from "@/config/index/constants";

/* ============================================================================================= */

/**
 * blocks reserved internal keys in user config objects.
 *
 * Primarily used for intents and mixins.
 */
export type PreventReservedKeys = Partial<Record<(typeof RESERVED_NAMES)[number], never>>;
