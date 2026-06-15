import oxfmtLib from "@jadeja/ts/configs/oxfmt/lib";
import { defineConfig } from "oxfmt";

import type { OxfmtConfig } from "oxfmt";

/* ============================================================================================= */

const oxfmtConfig: OxfmtConfig = defineConfig({ ...oxfmtLib });

/* ============================================================================================= */

export default oxfmtConfig;
