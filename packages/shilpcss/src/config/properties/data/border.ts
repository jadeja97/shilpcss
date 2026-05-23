import color from "./border/color";
import rounded from "./border/rounded";
import style from "./border/style";
import thick from "./border/thick";

/* ============================================================================================= */

const border = {
  color,
  rounded,
  style,
  thick,
} as const;

/* ============================================================================================= */

export default border;
