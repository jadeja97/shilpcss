import adjust from "./adjust";
import animate from "./animate";
import bg from "./bg";
import border from "./border";
import filter from "./filter";
import flex from "./flex";
import form from "./form";
import grid from "./grid";
import layout from "./layout";
import list from "./list";
import live from "./live";
import mask from "./mask";
import phase from "./phase";
import position from "./position";
import size from "./size";
import space from "./space";
import svg from "./svg";
import table from "./table";
import text from "./text";

import type { Properties } from "@/types/config/properties";

/* ============================================================================================= */

const propereties = {
  adjust,
  animate,
  bg,
  border,
  filter,
  flex,
  form,
  grid,
  layout,
  list,
  live,
  mask,
  phase,
  position,
  size,
  space,
  svg,
  table,
  text,
} as const satisfies Properties;

/* ============================================================================================= */

export default propereties;

export type AvailableProperties = keyof typeof propereties;
