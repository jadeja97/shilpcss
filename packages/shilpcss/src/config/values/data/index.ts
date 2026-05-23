import angles from "./angles";
import blend from "./blend";
import border from "./border";
import colors from "./colors";
import filter from "./filter";
import flexGrid from "./flex-grid";
import flow from "./flow";
import globalValues from "./global-values";
import numbers from "./numbers";
import spacing from "./spacing";
import time from "./time";

import type { Values } from "@/types/config/values";

/* ============================================================================================= */

const values = {
  angles,
  blend,
  border,
  colors,
  filter,
  flexGrid,
  flow,
  globalValues,
  numbers,
  spacing,
  time,
} as const satisfies Values;

/* ============================================================================================= */

export default values;

export type AvailableValues = keyof typeof values;
