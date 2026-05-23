import createMDX from "@next/mdx";

/* remark plugins */
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// oxlint-disable import/no-relative-parent-imports
import remarkCodeMeta from "../plugins/remark-code-meta";
// oxlint-disable import/no-relative-parent-imports
import remarkTOC from "../plugins/remark-toc";

/* rehype plugins */
import rehypeSlug from "rehype-slug";

/* ============================================================================================= */

/**
 * configures the MDX parser with Markdown and HTML processing plugins.
 */
const processMDX = createMDX({
  options: {
    /* process markdown */
    remarkPlugins: [
      remarkFrontmatter,
      // named export `metadata` from `.mdx` files
      [remarkMdxFrontmatter, { name: "metadata" }],
      remarkGfm,
      remarkCodeMeta,
      remarkTOC,
    ],

    /* process html */
    rehypePlugins: [rehypeSlug],
  },
});

/* ============================================================================================= */

export default processMDX;
