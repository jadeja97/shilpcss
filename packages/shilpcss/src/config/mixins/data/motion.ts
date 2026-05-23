const motion = {
  variants: {
    safe: "@media (prefers-reduced-motion: no-preference)",
    reduce: "@media (prefers-reduced-motion: reduce)",
  },
} as const;

export default motion;
