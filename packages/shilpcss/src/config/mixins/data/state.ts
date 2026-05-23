const state = {
  variants: {
    disabled: "&:disabled",
    enabled: "&:enabled",
    empty: "&:empty",
    hover: ["@media (hover: hover)", "&:hover"],
    // "real-focus": "&:focus",
    focus: "&:focus-visible",
    // "focus-within": "&:focus-within",

    // active during user interaction (press/hold/trigger)
    active: "&:active",

    // visited: "&:visited",
    target: "&:target",
  },
} as const;

export default state;
