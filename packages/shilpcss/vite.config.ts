import { resolve } from "node:path";

import { copyFolders } from "@jadeja/ts/plugins/vite";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

/* ============================================================================================= */

const viteConfig = defineConfig({
  //

  /* ==============================================================================================
		BUILD
	============================================================================================== */

  build: {
    //
    minify: "oxc",
    target: ["chrome109", "firefox109", "edge109", "safari16.3"],
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,

    // mark as library
    lib: {
      entry: {
        vite: resolve(import.meta.dirname, "./src/bundlers/vite.ts"),
        webpack: resolve(import.meta.dirname, "./src/bundlers/webpack.ts"),
        lib: resolve(import.meta.dirname, "./src/lib/index.ts"),
      },

      // minify whitespace is disabled for es format
      // https://vite.dev/config/build-options#build-minify
      formats: ["es"],
    },

    // tansformer options
    rolldownOptions: {
      external: [
        "lightningcss",
        "browserslist",
        "purgecss",
        "sass",
        "webpack",
        "webpack-sources",
        // add all the node in-built modules list here which are used
        "node:path",
        "node:fs",
      ],

      output: {
        entryFileNames: "[name].js",
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.startsWith("transpile")) {
            return "core-[hash].js";
          }
          // default fallback for other chunks (if any)
          return "[name]-[hash].js";
        },
      },
    },
  },

  /* ==============================================================================================
		ALIASE
	============================================================================================== */

  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },

  /* ==============================================================================================
		PLUGINS
	============================================================================================== */

  plugins: [
    //
    dts(),

    //
    copyFolders(import.meta.dirname, [
      {
        src: "./src/styles",
        dest: "./dist/styles",
      },
    ]),
  ],
});

/* ============================================================================================= */

export default viteConfig;
