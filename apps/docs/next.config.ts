import ShilpCSS from "shilpcss/bundlers/webpack";

import shilpConfig from "./shilp.config";
import processMDX from "./src/markdown/lib/process-mdx";

import type { NextConfig } from "next";
import type { Configuration, ResolveOptions } from "webpack";

/* ============================================================================================= */

const nextConfig: NextConfig = {
  //
  reactCompiler: true,
  reactStrictMode: false,
  devIndicators: false,
  output: "export",
  distDir: "dist",
  pageExtensions: ["ts", "tsx", "mdx"],
  typescript: {
    ignoreBuildErrors: true,
  },

  /* ==============================================================================================
		STATIC HOST SETUP - GITHUB PAGES
	============================================================================================== */

  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  /* ==============================================================================================
		CUSTOMIZE BUNDLER
	============================================================================================== */

  webpack: (config: Configuration) => {
    //
    config.plugins?.push(new ShilpCSS(shilpConfig));

    config.resolve ??= {} as ResolveOptions;

    config.resolve.alias = Object.assign(config.resolve.alias ?? {}, {
      "@icons": "./src/components/assets/icons.jsx",
      "@": "./src",
    });

    return config;
  },

  /* ==============================================================================================
		EXPERIMENTAL FEATURES
	============================================================================================== */

  experimental: {
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
};

/* ============================================================================================= */

export default processMDX(nextConfig);
