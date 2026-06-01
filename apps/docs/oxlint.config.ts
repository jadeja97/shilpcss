import { next } from "@jadeja/ts/configs/oxlint";
import { defineConfig } from "oxlint";

import type { OxlintConfig } from "@jadeja/ts/configs/oxlint/types";

/* ============================================================================================= */

const eslintIdLength = next.rules["eslint/id-length"];
eslintIdLength[1].exceptions = [...eslintIdLength[1].exceptions, "h", "m", "p", "w", "y", "z"];

const oxlintConfig: OxlintConfig = defineConfig({
  ...next,
  rules: {
    ...next.rules,
    "eslint/id-length": eslintIdLength,
  },
});

/* ============================================================================================= */

export default oxlintConfig;
