const utilities = {
  // all sides
  DEFAULT: "border-radius: <v><i>;",

  // individual
  tl: "border-top-left-radius: <v><i>;",
  tr: "border-top-right-radius: <v><i>;",
  br: "border-bottom-right-radius: <v><i>;",
  bl: "border-bottom-left-radius: <v><i>;",

  // group
  top: `
		border-top-left-radius: <v><i>;
		border-top-right-radius: <v><i>;
	`,
  left: `
		border-top-left-radius: <v><i>;
		border-bottom-left-radius: <v><i>;
	`,
  bottom: `
		border-bottom-left-radius: <v><i>;
		border-bottom-right-radius: <v><i>;
	`,
  right: `
		border-top-right-radius: <v><i>;
		border-bottom-right-radius: <v><i>;
	`,
} as const;

/* ============================================================================================= */

type UtilityKey = keyof typeof utilities;

const rounded = {} as Record<
  UtilityKey,
  {
    property: string;
    resolve: "spacing";
    themeKey: "radius";
  }
>;

/* ============================================================================================= */

for (const key of Object.keys(utilities) as UtilityKey[]) {
  rounded[key] = {
    property: utilities[key],
    resolve: "spacing",
    themeKey: "radius",
  };
}

/* ============================================================================================= */

export default rounded;
