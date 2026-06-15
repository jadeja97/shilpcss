import oxlintLib from "@jadeja/ts/configs/oxlint/lib";
import { defineConfig } from "oxlint";

import type { OxlintConfig } from "oxlint";

/* ============================================================================================= */

const eslintIdLength = oxlintLib.rules["eslint/id-length"];
eslintIdLength[1].exceptions = [...eslintIdLength[1].exceptions, "h", "m", "p", "w", "y", "z"];

const oxlintConfig: OxlintConfig = defineConfig({
  ...oxlintLib,
  rules: {
    ...oxlintLib.rules,
    "eslint/id-length": eslintIdLength,
  },
});

/* ============================================================================================= */

export default oxlintConfig;
