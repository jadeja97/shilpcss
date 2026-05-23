import offsets from "./position/offsets";

/* ============================================================================================= */

const position = {
  is: {
    property: "position: <v><i>;",
    values: {
      static: "static",
      fixed: "fixed",
      absolute: "absolute",
      relative: "relative",
      sticky: "sticky",
    },
  },

  ...offsets,
  //
} as const;

/* ============================================================================================= */

export default position;
