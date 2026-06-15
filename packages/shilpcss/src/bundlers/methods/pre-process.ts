import { error, printBlankLine, printSeparator, throwError } from "@jadeja/ts/lib/logger";
// oxlint-disable-next-line import/no-namespace
import * as sass from "sass";

import { generateComponents } from "@/config/components/methods";
import { SCSS_IMPORTS } from "@/config/index/constants";
import resolveConfig from "@/config/index/methods";
import { resolveMixins } from "@/config/mixins/methods";
import { resolveInlineTheme } from "@/config/theme/methods";

import type { StringOptions } from "sass";

import type { PreProcessOptions } from "@/types/bundlers/methods/pre-process";

/* ============================================================================================= */

/**
 * pre-process the content before compilation by SCSS.
 *
 * Resolves configuration, generates components, and compiles SCSS.
 *
 * @param options - Options for pre-processing the content.
 * @param options.config - The shilp config object.
 * @param options.content - The css content to pre-process.
 * @param options.filePath - The file path for error logging.
 *
 * @returns The pre-processed content.
 *
 * @throws { Error } If an error occurs during pre-processing.
 */
const preProcess = ({ config, content, filePath }: PreProcessOptions) => {
  //
  try {
    //

    /* ==========================================================================================
			RESOLVE CONFIG
		========================================================================================== */

    // resolves in order:
    // values, theme, properties, intents, components, mixins
    resolveConfig(config);

    /* ============================================================================================
			RESOLVE CONTENT - COMPONENTS AND MIXINS
		============================================================================================ */

    const contentWithComponents = generateComponents({ config, content });
    const contentWithMixins = resolveMixins({ config, content: contentWithComponents, filePath });

    /* ============================================================================================
			RESOLVE INLINE THEME
		============================================================================================ */

    // NOTE: this is added here to prevent scss compilation error
    // one is already at the process method return statement.
    // 1. before scss compilation
    // 2. after processing all utilities
    const contentWithoutInlineTheme = resolveInlineTheme({
      config,
      content: contentWithMixins,
      filePath,
    });

    /* ============================================================================================
			SCSS COMPILATION
		============================================================================================ */

    const scssImports = config.scss?.imports?.(SCSS_IMPORTS) ?? SCSS_IMPORTS;
    const uniqueImports = new Set(scssImports.split(";") || []);

    const resolvedContent = [...uniqueImports].join(";") + contentWithoutInlineTheme;

    // TODO: add mapping
    const defaultOptions: StringOptions<"sync"> = {};

    const compiledCSS = sass.compileString(
      resolvedContent,
      config.scss?.options?.({
        defaultOptions,
        css: resolvedContent,
        filePath,
      }) ?? defaultOptions,
    )?.css;

    return compiledCSS || content;
    //
  } catch (err) {
    //
    printSeparator();
    printBlankLine();
    error(`Error: Pre-processing :: ${filePath}`);
    printBlankLine();
    printSeparator();
    return throwError(err);
  }
};

/* ============================================================================================= */

export default preProcess;
