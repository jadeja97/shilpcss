import { defineConfig } from "oxlint";

import type { OxlintConfig } from "oxlint";

/* ============================================================================================= */

const oxlintConfig: OxlintConfig = defineConfig({
  categories: {
    correctness: "error",
    nursery: "warn",
    pedantic: "error",
    perf: "error",
    restriction: "error",
    style: "error",
    suspicious: "error",
  },
  env: {
    builtin: true,
    node: true,
  },
  options: {
    denyWarnings: false,
    reportUnusedDisableDirectives: "error",
    respectEslintDisableDirectives: false,
    typeAware: true,
    typeCheck: false,
  },
  plugins: ["eslint", "import", "jsdoc", "node", "oxc", "promise", "typescript", "unicorn"],
  rules: {
    "capitalized-comments": [
      "error",
      "never",
      {
        block: {
          ignorePattern: "/\\/\\*\\s*=+\\s*[\\r\\n]+(?:[\\s\\S]*?)[\\r\\n]+\\s*=+\\s*\\*\\//m",
        },
        ignorePattern: "^([A-Z]{2,}|[A-Z][A-Z0-9_-]*)(\\b|:)",
      },
    ],
    "eslint/class-methods-use-this": "off",
    "eslint/complexity": ["error", { max: 30 }],
    "eslint/id-length": [
      "error",
      {
        checkGeneric: false,
        exceptions: ["h", "i", "j", "k", "K", "m", "p", "T", "U", "w", "x", "y", "z"],
      },
    ],
    "eslint/init-declarations": "off",
    "eslint/max-lines-per-function": [
      "error",
      { max: 120, skipBlankLines: true, skipComments: true },
    ],
    "eslint/max-params": ["error", { max: 4 }],
    "eslint/max-statements": ["error", { max: 40 }],
    "eslint/no-await-in-loop": "off",
    "eslint/no-continue": "off",
    "eslint/no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    "eslint/no-magic-numbers": "off",
    "eslint/no-plusplus": "off",
    "eslint/no-ternary": "off",
    "eslint/no-underscore-dangle": ["error", { allow: ["__dirname", "__filename"] }],
    "eslint/no-use-before-define": "off",
    "eslint/no-warning-comments": "off",
    "eslint/require-unicode-regexp": "off",
    "eslint/sort-imports": "off",
    "eslint/sort-keys": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/max-dependencies": ["error", { max: 30 }],
    "import/no-default-export": "off",
    "import/no-named-default": "off",
    "import/no-named-export": "off",
    "import/no-nodejs-modules": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-type": "off",
    "no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "oxc/no-async-await": "off",
    "oxc/no-optional-chaining": "off",
    "oxc/no-rest-spread-properties": "off",
    "typescript/explicit-function-return-type": "off",
    "typescript/explicit-module-boundary-types": "off",
    "typescript/no-inferrable-types": "off",
    "typescript/no-unnecessary-condition": "off",
    "typescript/no-unnecessary-type-parameters": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/no-useless-default-assignment": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/strict-boolean-expressions": "off",
    "unicorn/no-null": "off",
    "unicorn/no-lonely-if": "off",
    "unicorn/switch-case-braces": "off",
  },
});

/* ============================================================================================= */

export default oxlintConfig;
