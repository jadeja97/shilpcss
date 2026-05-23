import margin from "./space/margin";
import padding from "./space/padding";

/* ============================================================================================= */

const space = {
  gap: {
    DEFAULT: {
      property: "gap: <v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
      values: {},
    },

    x: {
      property: "column-gap: <v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
      values: {},
    },

    y: {
      property: "row-gap: <v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
      values: {},
    },
  },

  ...margin,
  ...padding,
  //
} as const;

/* ============================================================================================= */

export default space;
