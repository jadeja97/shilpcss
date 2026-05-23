const env = {
  variants: {
    // orientation
    tall: "@media (orientation: portrait)",
    wide: "@media (orientation: landscape)",

    // media type
    print: "@media print",
    screen: "@media screen",
  },
} as const;

export default env;
