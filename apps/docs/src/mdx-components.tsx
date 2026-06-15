import { docsConfig } from "@docs";

/* ============================================================================================= */

// handled by `@next/mdx` module

export const useMDXComponents = () => {
  return {
    ...docsConfig.mdxComponents?.HTMLElements,
    ...docsConfig.mdxComponents?.TSXComponents,
  };
};
