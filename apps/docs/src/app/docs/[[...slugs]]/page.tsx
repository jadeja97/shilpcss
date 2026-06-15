import { resolve } from "node:path";

import { docsConfig, contentConfig } from "@docs";
import { ContentNavMobile } from "@jadeja/docs/components/docs/content-nav-mobile";
import { Neighbours } from "@jadeja/docs/components/docs/neighbours";
import { TOC } from "@jadeja/docs/components/docs/toc";
import { Separator } from "@jadeja/docs/components/separator";
import { getPageSEO } from "@jadeja/docs/lib/app/seo";
import { getLastModified, getMostRecentDateTime } from "@jadeja/docs/lib/date-time";
import { loadModule } from "@jadeja/docs/lib/load-module";
import { notFound } from "next/navigation";

import DateTime from "@/components/docs/date-time";

import type { Metadata } from "next";
import type { ReactElement } from "react";

/* ============================================================================================= */

// by marking dynamicParams as false,
// accessing a path not defined in `generateStaticParams` will 404
export const dynamicParams = false;

interface Params {
  slugs: string[];
}

// generate all paths at build time
export const generateStaticParams = (): Params[] => {
  return contentConfig.docs.getAllSlugs();
};

/* ============================================================================================= */

interface GenerateMetadataOptions {
  params: Promise<Params>;
}

export const generateMetadata = async ({ params }: GenerateMetadataOptions): Promise<Metadata> => {
  //
  const { slugs = [] } = await params;

  const docsModule = await loadModule({ content: contentConfig.docs, slugs });

  if (!docsModule) {
    return notFound();
  }

  const { meta, filePath } = docsModule;

  // oxlint-disable-next-line typescript/no-non-null-assertion
  const { frontMatter, url } = meta!;

  return getPageSEO({
    app: docsConfig.app,
    authors: docsConfig.authors,
    // oxlint-disable-next-line typescript/no-non-null-assertion
    canonicalURL: url!,
    // oxlint-disable-next-line typescript/no-non-null-assertion
    url: url!,
    frontMatter: {
      ...frontMatter,
      lastModifiedAt: getMostRecentDateTime([
        frontMatter.lastModifiedAt,
        getLastModified(resolve("./page.tsx")),
        getLastModified(resolve("../layout.tsx")),
      ]),
    },
    SITE_URL: docsConfig.constants.SITE_URL,
    trailingSlash: docsConfig.trailingSlash,
    markdown: `https://raw.githubusercontent.com/JadejaHQ/shilpcss/refs/heads/main/apps/docs/src/content/docs/${filePath}`,
  });
};

/* ============================================================================================= */

interface DocsPageProps {
  params: Promise<Params>;
}

const DocPage = async ({ params }: DocsPageProps): Promise<ReactElement> => {
  // determine slug array
  // empty string in array is `/docs` page
  const { slugs = [] } = await params;

  const docsModule = await loadModule({ content: contentConfig.docs, slugs });

  if (!docsModule) {
    return notFound();
  }

  const { MDXComponent, toc, neighbours, meta } = docsModule;

  return (
    <>
      <div className="content__wrapper">
        {/* mobile navigation */}
        <ContentNavMobile topics={contentConfig.docs.getTree()} toc={toc} />

        {/* render mdx content */}
        <main>
          <article className="typography">
            <MDXComponent />
          </article>

          <Separator />

          <DateTime
            publishedAt={meta?.frontMatter.publishedAt}
            lastModifiedAt={meta?.frontMatter.lastModifiedAt}
          />

          <Separator />

          <Neighbours {...neighbours} />
        </main>
      </div>

      {/* table of content (list actually) */}
      <aside className="toc__wrapper--desktop scroll-fade">
        <TOC toc={toc} />
      </aside>
    </>
  );
};

/* ============================================================================================= */

export default DocPage;
