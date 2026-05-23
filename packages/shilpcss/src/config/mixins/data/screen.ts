// https://tailwindcss.com/docs/responsive-design
// https://getbootstrap.com/docs/5.3/layout/breakpoints/

/* ============================================================================================= */

import { throwError } from "@/lib/logger";

import type { MixinConfigResolveOptions } from "@/types/config/mixins";

/* ================================================================================================
	BREAKPOINTS RANGE
================================================================================================ */

/**
 * resolves a range breakpoints value from the theme configuration.
 *
 * @param options - Options for getting breakpoint range.
 * @param options.values - Object containing values for breakpoints.
 * @param options.from - The starting breakpoint value.
 * @param options.to - The ending breakpoint value.
 * @param options.raw - The raw value string (e.g., "500px").
 *
 * @returns The resolved media query string for the breakpoint singel or range.
 *
 * @throws If the specified breakpoints are not found in the values.
 */
const getBreakpointRange = ({
  values,
  from,
  to,
  raw,
}: {
  values: Record<string, string>;
  from: string;
  to: string;
  raw: string;
}) => {
  //
  if (!(from in values)) {
    throwError(`SCREEN: \`${from}\` from \`${raw}\` doesn't exist in \`config.theme.screens\``);
  }

  if (!(to in values)) {
    throwError(`SCREEN: \`${to}\` from \`${raw}\` doesn't exist in \`config.theme.screens\``);
  }

  const maxWidth = Number.parseInt(values[to], 10);

  return `@media (min-width: ${values[from]}) and (max-width: ${maxWidth - 1}px) {`;
};

/* ================================================================================================
	SINGLE BREAKPOINT  - MIN OR MAX
================================================================================================ */

/**
 * resolves a single breakpoint value from the theme configuration.
 *
 * Handles minimum and maximum breakpoints.
 *
 * @param options - Options for resolving single breakpoint.
 * @param options.values - The object containing breakpoint values.
 * @param options.from - The breakpoint name (e.g., "sm", "max-sm").
 * @param options.raw - The raw selector string containing the breakpoint.
 *
 * @returns The resolved media query string for the breakpoint.
 *
 * @throws If breakpoint not found.
 */
const getSingleBreakpoint = ({
  values,
  from,
  raw,
}: {
  values: Record<string, string>;
  from: string;
  raw: string;
}) => {
  //
  let breakpoint = from;
  let isMax = false;

  if (from.startsWith("max-")) {
    isMax = true;
    breakpoint = from.replace("max-", "");
  }

  if (!(breakpoint in values)) {
    throwError(
      `SCREEN: \`${breakpoint}\` from \`${raw}\` doesn't exist in \`config.theme.screens\``,
    );
  }

  const width = Number.parseInt(values[breakpoint], 10);

  return `@media (${isMax ? "max" : "min"}-width: ${width - Number(isMax)}px) {`;
};

/* ================================================================================================
	ADD BREAKPOINT STYLES  - SINGLE (MIN OR MAX), RANGE
================================================================================================ */

/**
 * resolves screen breakpoints.
 *
 * Handles both single and range breakpoints.
 *
 * @param options - Options for resolving screen mixin.
 * @param options.config - The configuration object containing theme settings.
 * @param options.variantName - The name of the variant (e.g., "sm", "md", "max-sm", "md:xl").
 * @param options.raw - The raw selector string containing the pseudo mixin selector.
 *
 * @returns The resolved breakpoint mixin selector and/or definition.
 *
 * @throws If range breakpoints uses `max-*` breakpoint.
 */
const resolveScreen = ({ config, variantName, raw }: MixinConfigResolveOptions) => {
  //
  const values = config.theme?.["screens" as keyof typeof config.theme] as unknown as Record<
    string,
    string
  >;

  // extract from and to breakpoints
  // x:y, max-x
  const [from, to] = variantName.split(":");

  if (from && to && (from.startsWith("max-") || to.startsWith("max-"))) {
    throwError(`SCREEN: \`${raw}\` - range breakpoints must not use 'max-'`);
  }

  return {
    // returning resolved css selector and not the `@mixin` definition
    selector: to
      ? getBreakpointRange({ values, from, to, raw })
      : getSingleBreakpoint({ values, from, raw }),
  };
};

/* ================================================================================================
	SCREEN MIXIN CONFIG
================================================================================================ */

const screen = {
  resolve: resolveScreen,
};

/* ============================================================================================= */

export default screen;
