import { lib } from "@jadeja/ts/configs/oxlint";
import { defineConfig } from "oxlint";

import type { OxlintConfig } from "@jadeja/ts/configs/oxlint/types";

/* ============================================================================================= */

const eslintIdLength = lib.rules["eslint/id-length"];
eslintIdLength[1].exceptions = [...eslintIdLength[1].exceptions, "h", "m", "p", "w", "y", "z"];

const oxlintConfig: OxlintConfig = defineConfig({
  ...lib,
  rules: {
    ...lib.rules,
    "eslint/id-length": eslintIdLength,
  },
});

/* ============================================================================================= */

export default oxlintConfig;
