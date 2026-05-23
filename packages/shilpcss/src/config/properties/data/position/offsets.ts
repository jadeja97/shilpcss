const utilities = {
  // individual
  top: "top: <n><v><i>;",
  right: "right: <n><v><i>;",
  bottom: "bottom: <n><v><i>;",
  left: "left: <n><v><i>;",

  // group
  x: `
		left: <n><v><i>;
		right: <n><v><i>;
	`,
  y: `
		top: <n><v><i>;
		bottom: <n><v><i>;
	`,
} as const;

const inset = {
  // all sides
  DEFAULT: {
    property: "inset: <n><v><i>;",
    resolve: "spacing",
    themeKey: "spacing",
  },

  block: {
    DEFAULT: {
      property: "inset-block: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },

    end: {
      property: "inset-block-end: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },

    start: {
      property: "inset-block-start: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },
  },

  inline: {
    DEFAULT: {
      property: "inset-inline: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },

    end: {
      property: "inset-inline-end: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },

    start: {
      property: "inset-inline-start: <n><v><i>;",
      resolve: "spacing",
      themeKey: "spacing",
    },
  },
} as const;

/* ============================================================================================= */

type DeepExpand<T> = T extends object
  ? // oxlint-disable typescript/no-explicit-any
    T extends (...args: any[]) => any
    ? T
    : {
        [K in keyof T]: DeepExpand<T[K]>;
      }
  : T;

interface OffsetConfig {
  property: string;
  resolve: "spacing";
  themeKey: "spacing";
}

type UtilityOffsets = {
  -readonly [K in keyof typeof utilities]: OffsetConfig;
};

type NestedInset<T> = {
  -readonly [K in keyof T]: T[K] extends {
    property: string;
  }
    ? OffsetConfig
    : NestedInset<T[K]>;
};

type Offsets = DeepExpand<
  UtilityOffsets & {
    inset: NestedInset<typeof inset>;
  }
>;

const offsets: Offsets = {
  inset,
} as Offsets;

/* ============================================================================================= */

for (const key of Object.keys(utilities) as (keyof typeof utilities)[]) {
  offsets[key] = {
    property: utilities[key],
    resolve: "spacing",
    themeKey: "spacing",
  };
}

/* ============================================================================================= */

export default offsets;
