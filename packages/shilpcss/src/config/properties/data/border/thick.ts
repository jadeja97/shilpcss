const utilities = {
  // all sides
  DEFAULT: "border-width: <v><i>;",

  // individual
  top: "border-top-width: <v><i>;",
  right: "border-right-width: <v><i>;",
  bottom: "border-bottom-width: <v><i>;",
  left: "border-left-width: <v><i>;",

  // group
  x: `
		border-left-width: <v><i>;
		border-right-width: <v><i>;
	`,
  y: `
		border-top-width: <v><i>;
		border-bottom-width: <v><i>;
	`,

  // logical
  bl: "border-block-width: <v><i>;",
  bls: "border-block-start-width: <v><i>;",
  ble: "border-block-end-width: <v><i>;",
  bi: "border-inline-width: <v><i>;",
  bis: "border-inline-start-width: <v><i>;",
  bie: "border-inline-end-width: <v><i>;",

  //// divider - can be created with childs or self mixin
} as const;

/* ============================================================================================= */

type UtilityKey = keyof typeof utilities;

const thick = {} as Record<
  UtilityKey,
  {
    property: string;
    resolve: "spacing";
    themeKey: "thickness";
  }
>;

/* ============================================================================================= */

for (const key of Object.keys(utilities) as UtilityKey[]) {
  thick[key] = {
    property: utilities[key],
    resolve: "spacing",
    themeKey: "thickness",
  };
}

/* ============================================================================================= */

export default thick;
