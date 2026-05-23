import { notFound } from "next/navigation";

import ContentNavMobile from "@/components/docs/content-nav-mobile";
import Neighbours from "@/components/docs/neighbours";
import TOC from "@/components/docs/toc";
import Separator from "@/components/separator";
import { authorLinks } from "@/data/links";
import Content from "@/lib/content";
import loadDocsModule from "@/lib/load-docs-module";

import type { Metadata } from "next";
import type { ReactElement } from "react";

/* ============================================================================================= */

// docs content info
const content = Content.create("src/content", "docs");

/* ============================================================================================= */

// by marking dynamicParams as false,
// accessing a path not defined in `generateStaticParams` will 404
export const dynamicParams = false;

interface Params {
  slugs: string[];
}

// generate all paths at build time
export const generateStaticParams = (): Params[] => content.getAllSlugs();

/* ============================================================================================= */

interface GenerateMetadataOptions {
  params: Promise<Params>;
}

export const generateMetadata = async ({ params }: GenerateMetadataOptions): Promise<Metadata> => {
  //
  const { slugs = [] } = await params;

  const docsModule = await loadDocsModule({
    content,
    slugs,
  });

  if (!docsModule) {
    return notFound();
  }

  const { metadata, meta, filePath } = docsModule;

  const title = metadata.title || meta?.metaTitle;
  const description = (metadata.description || meta?.metaDescription) ?? "";

  return {
    title,
    description,
    keywords: (metadata.keywords || meta?.metaKeywords) ?? [],

    authors: [
      {
        name: metadata.author || authorLinks.jadeja.name,
        url: metadata.url || authorLinks.jadeja.url,
      },
    ],

    alternates: {
      canonical: meta?.url,
      types: {
        "text/markdown": `https://raw.githubusercontent.com/JadejaHQ/shilpcss/refs/heads/main/apps/docs/src/content/docs/${filePath}`,
      },
    },

    openGraph: {
      title,
      description,
      url: meta?.url,
      type: "article",
      siteName: "Shilp CSS",
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ["/og.png"],
      site: "@shilpcss",
      siteId: "2030301913112285184",
      creator: "@jadeja97_",
      creatorId: "1951893079608160256",
    },
  };
};

/* ============================================================================================= */

interface DocsPageProps {
  params: Promise<Params>;
}

const DocPage = async ({ params }: DocsPageProps): Promise<ReactElement> => {
  // determine slug array
  // empty string in array is `/docs` page
  const { slugs = [] } = await params;

  const docsModule = await loadDocsModule({
    content,
    slugs,
  });

  if (!docsModule) {
    return notFound();
  }

  const { MDXComponent, toc, neighbours } = docsModule;

  return (
    <>
      <div className="content__wrapper">
        {/* mobile navigation */}
        <ContentNavMobile topics={content.getTree()} toc={toc} />

        {/* render mdx contetn */}
        <main>
          <article className="typography">
            <MDXComponent />
          </article>

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
