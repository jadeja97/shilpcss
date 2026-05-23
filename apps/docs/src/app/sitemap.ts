import { SITE_URL } from "@/lib/constants";
import Content from "@/lib/content";

/* ============================================================================================= */

// docs content info
const content = Content.create("src/content", "docs");

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

const sitemap = () => {
  //
  const slugsWrapper = content.getAllSlugs();

  // create sitemap entries for docs pages
  // here trailing slash is important for correct URL structure and SEO for github pages,
  // as it treats URLs with and without trailing slash as different pages
  const docsPages = slugsWrapper.map(({ slugs }) => ({
    url: slugs[0] === "" ? `${SITE_URL}/docs/` : `${SITE_URL}/docs/${slugs.join("/")}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // trailing slash is important for correct URL structure and SEO for github pages,
  // as it treats URLs with and without trailing slash as different pages
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work-with-me/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docsPages,
  ];
};

/* ============================================================================================= */

export default sitemap;
