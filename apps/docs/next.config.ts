import { resolve } from "node:path";

import createMDX from "@next/mdx";
import ShilpCSS from "shilpcss/bundlers/webpack";

import { docsConfig } from "./docs.config";
import shilpConfig from "./shilp.config";

import type { NextConfig } from "next";
import type { Configuration } from "webpack";

/* ============================================================================================= */

/**
 * configures the MDX parser with Markdown and HTML processing plugins.
 */
const processMDX = createMDX(docsConfig.mdxConfig);

/* ============================================================================================= */

const nextConfig: NextConfig = processMDX({
  /* ==============================================================================================
		NEXT CONFIG PRESET
	============================================================================================== */

  ...docsConfig.getNextConfig({ githubPages: true }),

  /* ==============================================================================================
		CUSTOMIZE BUNDLER
	============================================================================================== */

  webpack: (config: Configuration) => {
    //
    const webpackConfig = docsConfig.getWebpackConfig(config, {
      plugins: [new ShilpCSS(shilpConfig)],
      alias: {
        // webpack can't resolve the dynamic module without this
        "@/content": resolve(import.meta.dirname, "src/content"),

        // normal alias (also defined in `tsconfig.json`)
        "@docs": "./docs.config.ts",
        "@": "./src",
      },
    });

    return webpackConfig;
  },
});

/* ============================================================================================= */

export default nextConfig;
