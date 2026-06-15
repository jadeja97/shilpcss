import { docsConfig } from "@docs";
import { createLLMsFile } from "@jadeja/docs/lib/app/llms";
import { cleanURL } from "@jadeja/docs/lib/dom/utils";

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

/**
 * add `llms.txt` file to public folder at build time
 */
export const GET = () => {
  return createLLMsFile(getContent().trim());
};

/* ============================================================================================= */

// oxlint-disable-next-line eslint/func-style
function getContent() {
  //

  const { SITE_URL, SEARCH_INDEX_FILE_NAME } = docsConfig.constants;

  const createURL = (url: string) => {
    return cleanURL(SITE_URL, url, docsConfig.trailingSlash);
  };

  return `

# Shilp CSS

> an Intent-first, CSS-centric, styling engine and framework. You compose **intent-based styles inside CSS**, and apply them through named classes like traditional CSS. This keeps HTML semantic, readable, smaller in size, and build styling systems meant to last.

It is designed for engineers, who care, where decisions live, who want styles to
remain understandable years later, and who prefer ownership over convenience.

---

## Docs
${createURL("/docs")}

> **These docs are meant to be read, not skimmed.**

### Getting Started

Shilp CSS becomes clear to you, once you understand, where it places
responsibility.

Read docs in following order:

**Basics**:

1. [Why Shilp CSS?](${createURL("/docs/why-shilp-css")})
2. [Mental Model](${createURL("/docs/mental-model")})
3. [Quick Overview](${createURL("/docs/quick-overview")})
4. [Benchmarks](${createURL("/docs/benchmarks")})

**Must Read**:

1. [Credits](${createURL("/docs/credits")})
2. [Status](${createURL("/docs/status")})

Once you’ve read the above, you can [Setup Shilp CSS](${createURL("/docs/setup")}) to start
using it in practice, or move on to the other sections to deepen your
understanding.

### Begin Your Journey

- [Core Concepts](${createURL("/docs/core-concepts")}): Understand the foundation of Shilp CSS and key ideas for scalable design systems
	 - [Browser Compatibility](${createURL("/docs/browser-compatibility")}): Clear and intentional browser compatibility baseline
	 - [Styling With Intent](${createURL("/docs/styling-with-intent")}): Styles expressed through a dedicated intent. This keeps related decisions together.
	 - [Colors](${createURL("/docs/colors")}): Shilp CSS includes a vast, beautiful color palette out of the box. All the colors are in \`oklch\` format and looks more vivid on supported displays.
	 - [Dark Mode](${createURL("/docs/dark-mode")}): Shilp CSS supports **class-based dark mode by default**, with full control over how it is applied and customized.
	 - [Responsive Design](${createURL("/docs/responsive-design")}): Shilp CSS provides a small, intentional set of breakpoints and a clear, mobile-first approach to help you handle this cleanly.
	 - [Theming](${createURL("/docs/theming")}): Shilp CSS includes a vast, predefined set of default styles that can be used to build beautiful custom design systems. Possibilities are endless with Shilp CSS. From basic colors, fonts to building a component libray or a full design system.
- [Configurations](${createURL("/docs/config")}): Deep dive into \`shilp.config.js\`, its structure, customization, and defaults
- [Life Cycle](${createURL("/core/life-cycle")}): Learn how Shilp CSS processes and transforms **intent into CSS**
- [Default Styles](${createURL("/docs/default-styles")}): Optional default styles provided for a quick start and easier setup
- [Best Practices](${createURL("/docs/best-practices")}): Recommendations for writing efficient and maintainable Shilp CSS

---

## Source Content (MDX)

If deeper context or raw content is required, the documentation source files are available at: https://raw.githubusercontent.com/JadejaHQ/shilpcss/refs/heads/main/apps/docs/src/content/docs/**/*.mdx

**Note:** The path or slug derived from a documentation URL may not always match the exact \`.mdx\` filename in the repository. If the \`.mdx\` file cannot be located using the derived path or slug, retrieve the metadata from the corresponding public documentation page instead (for example, \`${createURL("/docs/colors")}\`). The page \`<head>\` contains a \`<meta>\` tag with \`type="text/markdown"\` whose \`href\` attribute points to the URL where the actual MDX content is hosted.

---

## Sitemap
${SITE_URL}/sitemap.xml

---

## RSS Feed
${SITE_URL}/rss.xml

---

## Search
${SITE_URL}/${SEARCH_INDEX_FILE_NAME}

Note: the search index filename contains app version number. please verify the latest one from \`https://raw.githubusercontent.com/JadejaHQ/shilpcss/refs/heads/main/apps/docs/package.json\` file.

---

## License
https://github.com/JadejaHQ/shilpcss/LICENSE.md

---

Thank you 🫶🏻🫰🏻❤️

`;
}
