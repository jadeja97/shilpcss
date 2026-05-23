import { defineConfig } from "oxfmt";

import type { OxfmtConfig } from "oxfmt";

/* ============================================================================================= */

const oxfmtConfig: OxfmtConfig = defineConfig({
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  ignorePatterns: [],
  insertFinalNewline: true,
  jsdoc: {
    addDefaultToDescription: true,
    bracketSpacing: true,
    capitalizeDescriptions: false,
    commentLineStrategy: "multiline",
    descriptionTag: false,
    descriptionWithDot: false,
    keepUnparsableExampleIndent: true,
    lineWrappingStyle: "greedy",
    preferCodeFences: true,
    separateReturnsFromParam: true,
    separateTagGroups: true,
  },
  objectWrap: "preserve",
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  sortImports: {
    groups: [
      ["default-builtin", "named-builtin"],
      "wildcard-external",
      ["default-external", "named-external"],
      ["default-internal", "named-internal"],
      ["default-parent", "named-parent"],
      ["default-sibling", "named-sibling"],
      ["default-index", "named-index"],
      "unknown",
      "type-external",
      "type-internal",
    ],
    ignoreCase: true,
    internalPattern: ["@/"],
    newlinesBetween: true,
    order: "asc",
    partitionByComment: true,
    partitionByNewline: false,
    sortSideEffects: false,
  },
  sortPackageJson: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
});

/* ============================================================================================= */

export default oxfmtConfig;
