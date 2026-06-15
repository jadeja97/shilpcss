import { deepMergeObj } from "@jadeja/ts/lib/operations";

import { docsConfig } from "./docs.config";

import type { ShilpConfig } from "shilpcss/types";

/* ============================================================================================= */

const shilpConfig: ShilpConfig = {
  //
  source: null,

  extend: {
    theme: {
      container: {
        spacing: {
          sm: "24px",
          md: "24px",
          lg: "24px",
          xl: "24px",
          mac: "24px",
          max: "",
        },
        innerPadding: {
          xs: "16px",
          md: "24px",
        },
      },
    },

    properties: deepMergeObj(docsConfig.shilpConfig.extend?.properties ?? {}, {}),
  },
};

/* ============================================================================================= */

export default shilpConfig;
