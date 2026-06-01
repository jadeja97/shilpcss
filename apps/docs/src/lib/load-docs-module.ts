import { throwError } from "@jadeja/ts/lib";

import type { FC } from "react";

import type { DocsModule, LoadDocsModuleOptions, LoadDocsModuleOutput } from "@/types/lib/docs";

/* ============================================================================================= */

/**
 * load `mdx` file as module with additional information
 *
 * @param options - Options for the loading docs module
 * @param options.content - the content class instance
 * @param options.slugs - segments for the current module
 */
const loadDocsModule = async ({ content, slugs }: LoadDocsModuleOptions): LoadDocsModuleOutput => {
  // get current page info
  const { filePath, index, ...fileInfo } = content.getFileInfo(slugs);

  if (typeof index !== "number" || !filePath) {
    return null;
  }

  // get previous and next page info
  const neighbours = content.getNeighbours(index);

  let docsModule: DocsModule;

  try {
    // dynamically import `.mdx` file as module
    // oxlint-disable typescript/no-unsafe-assignment
    const dynamicModule: Omit<DocsModule, "MDXComponent"> & {
      default: FC;
    } = await import(`@/content/docs/${filePath}`);

    if (!dynamicModule?.default) {
      throw new Error(`Module not found :: "@/content/docs/${filePath}"`);
    }

    const { default: MDXComponent, ...rest } = dynamicModule;

    docsModule = {
      MDXComponent,
      ...rest,
    };
  } catch (error) {
    return throwError(error);
  }

  return {
    filePath,
    index,
    neighbours,
    ...fileInfo,
    ...docsModule,
  };
};

/* ============================================================================================= */

export default loadDocsModule;
