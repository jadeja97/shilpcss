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

  webpack: (config: Configuration, { isServer }) => {
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

    // prevent next.js from chunking, wrong ordering and merging
    // this will make sure that, there's no specificity issue due to wrong ordering
    // @ts-expect-error  type issue
    if (!isServer && webpackConfig.optimization?.splitChunks?.cacheGroups) {
      // @ts-expect-error  type issue
      // oxlint-disable-next-line typescript/no-unsafe-member-access
      webpackConfig.optimization.splitChunks.cacheGroups.styles = {
        name: "styles",
        test: /\.css$/,
        chunks: "all",
        // tells webpack to ignore size constraints and force a single file
        enforce: true,
      };
    }

    return webpackConfig;
  },

  /* ==============================================================================================
		EXPERIMENTAL
	============================================================================================== */

  experimental: {
    cssChunking: "strict",
    inlineCss: false,
    optimizeCss: false,
    useLightningcss: false,
  },
});

/* ============================================================================================= */

export default nextConfig;
