const utilities = {
  // all sides
  DEFAULT: "border-color: <v><i>;",

  // individual
  top: "border-top-color: <v><i>;",
  right: "border-right-color: <v><i>;",
  bottom: "border-bottom-color: <v><i>;",
  left: "border-left-color: <v><i>;",

  // group
  x: `
		border-left-color: <v><i>;
		border-right-color: <v><i>;
	`,
  y: `
		border-top-color: <v><i>;
		border-bottom-color: <v><i>;
	`,

  // logical
  bl: "border-block-color: <v><i>;",
  bls: "border-block-start-color: <v><i>;",
  ble: "border-block-end-color: <v><i>;",
  bi: "border-inline-color: <v><i>;",
  bis: "border-inline-start-color: <v><i>;",
  bie: "border-inline-end-color: <v><i>;",

  //// divider - can be created with childs or self mixin
} as const;

/* ============================================================================================= */

type UtilityKey = keyof typeof utilities;

const color = {} as Record<
  UtilityKey,
  {
    property: string;
    resolve: "color";
    themeKey: "colors";
    variant: true;
  }
>;

/* ============================================================================================= */

for (const key of Object.keys(utilities) as UtilityKey[]) {
  color[key] = {
    property: utilities[key],
    resolve: "color",
    themeKey: "colors",
    variant: true,
  };
}

/* ============================================================================================= */

export default color;
