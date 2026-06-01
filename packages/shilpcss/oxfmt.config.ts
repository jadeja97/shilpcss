import { lib } from "@jadeja/ts/configs/oxfmt";
import { defineConfig } from "oxfmt";

import type { OxfmtConfig } from "@jadeja/ts/configs/oxfmt/types";

/* ============================================================================================= */

const oxfmtConfig: OxfmtConfig = defineConfig({ ...lib });

/* ============================================================================================= */

export default oxfmtConfig;
