import { PurgeCSS } from "purgecss";

import { PURGECSS_SOURCE_FOR_FRAMEWORK } from "@/config/index/constants";
import { logDivider, logNewLine, throwError, warnNewLine } from "@/lib/logger";
import { fresh } from "@/lib/operations";
import { isArr, isStr } from "@/lib/types";

import type { UserDefinedOptions } from "purgecss";

import type { PurgeConfigOutput, PurgeOptions } from "@/types/bundlers/methods/purge";

/* ============================================================================================= */

/**
 * purge (remove) unused CSS.
 *
 * use `.purge-ignore-<start|end> { all: unset; }` to prevent styles block from purging.
 *
 * @param options - Options for removing the redundant css.
 * @param options.css - The CSS to be purged.
 * @param options.options - Replace default options for purging.
 * @param options.filePath - The file path of the content for error logging.
 * @param options.source - The framework name or custom source to scan files for purging. can be
 *   overrided by `shilpConfig.purge().content`.
 *
 * @returns An object containing the purged CSS and rejected CSS.
 *
 * @throws If an error occurs during purging.
 */
const purge = async ({
  css,
  options,
  filePath,
  source,
}: PurgeOptions): Promise<PurgeConfigOutput> => {
  //
  if (!source) {
    return { css };
  }

  try {
    //

    /* ============================================================================================
			DEFAULT OPTIONS
		============================================================================================ */

    const defaultOptions: UserDefinedOptions = {
      // source files for scanning styles
      content: [],
      // styles to be purged
      css: [{ raw: css }],
      safelist: [],

      // NOTE: false because of purging do not honor ignore blocks (misconfiguration?)
      // NOTE: encountered that this can remove necessary styles (misconfiguration?)
      // TODO: need to investigate this further though
      variables: false,
      keyframes: false,
      fontFace: false,
    };

    /* ============================================================================================
			OPTIONS - CONTENT  (markup files to scan)
		============================================================================================ */

    // add purge sources to scan
    const preDefinedSource = isStr(source)
      ? PURGECSS_SOURCE_FOR_FRAMEWORK[source as keyof typeof PURGECSS_SOURCE_FOR_FRAMEWORK]
      : source;
    if (isArr(preDefinedSource) && preDefinedSource.length > 0) {
      defaultOptions.content = preDefinedSource;
    }

    /* ============================================================================================
			FINAL OPTIONS  (provided by user using `shilpConfig.purge`?)
		============================================================================================ */

    // finalizing the purge options
    const finalOptions = options?.({ defaultOptions, css, filePath }) ?? defaultOptions;

    if (finalOptions.content?.length === 0) {
      return throwError(
        "`content` is expected for scaning files for purging. The output will be empty!",
      );
    }

    // @ts-expect-error type issue here
    if (!isStr(finalOptions.css?.[0]?.raw)) {
      return throwError("CSS string is expected as: `css: [{ raw: 'your css here' }]`");
    }

    if (
      // @ts-expect-error type issue here
      finalOptions.css[0].raw
        // oxlint-disable typescript/no-unsafe-member-access, typescript/no-unsafe-call
        .trim() === ""
    ) {
      logDivider();
      warnNewLine(`Warning: Empty CSS file :: ${filePath}`);
      return { css: "" };
    }

    /* ============================================================================================
			FINAL PURGE OPTIONS - RAW CSS TEXT WITH IGNORE BLOCK COMMENTS
		============================================================================================ */

    finalOptions.css = [
      {
        // @ts-expect-error type issue here
        raw: finalOptions.css[0].raw
          // oxlint-disable typescript/no-unsafe-member-access, typescript/no-unsafe-assignment
          .replace(fresh(/\.purge-ignore-start\s*\{[\s\S]*?\}/g), "/* purgecss start ignore */")
          // oxlint-disable typescript/no-unsafe-member-access, typescript/no-unsafe-call, typescript/no-unsafe-assignment
          .replace(fresh(/\.purge-ignore-end\s*\{[\s\S]*?\}/g), "/* purgecss end ignore */"),
      },
    ];

    /* ============================================================================================
			EXECUTE PURGE CSS
		============================================================================================ */

    // TODO: use mapping
    const purged = await new PurgeCSS().purge(finalOptions);

    const purgedCSS = purged[0]?.css;
    const rejectedCSS = purged[0]?.rejectedCss;

    if (rejectedCSS) {
      logDivider();
      warnNewLine("Warning: Rejected CSS while Purging");
      warnNewLine(rejectedCSS);
    }

    if (!(isStr(purgedCSS) && purgedCSS.trim().length > 0)) {
      return throwError("Error: CSS Purge failed!");
    }

    return { css: purgedCSS, rejectedCSS };
    //
  } catch (error) {
    //
    logDivider();
    logNewLine(`Error: Purging :: ${filePath}`);
    logDivider();
    return throwError(error);
  }
};

/* ============================================================================================= */

export default purge;
