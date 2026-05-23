import aria from "./aria";
import childs from "./childs";
import data from "./data";
import env from "./env";
import form from "./form";
import match from "./match";
import motion from "./motion";
import screen from "./screen";
import self from "./self";
import siblings from "./siblings";
import state from "./state";
import text from "./text";
import theme from "./theme";

import type { Mixins } from "@/types/config/mixins";

/* ============================================================================================= */

const mixins = {
  aria,
  childs,
  data,
  env,
  form,
  match,
  motion,
  screen,
  self,
  siblings,
  state,
  text,
  theme,
} as const satisfies Mixins;

/* ============================================================================================= */

export default mixins;

export type AvailableMixins = keyof typeof mixins;
