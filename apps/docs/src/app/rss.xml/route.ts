import { SITE_URL } from "@/lib/constants";
import Content from "@/lib/content";
import loadDocsModule from "@/lib/load-docs-module";

/* ============================================================================================= */

// docs content info
const content = Content.create("src/content", "docs");

/* ============================================================================================= */

// to make file run at build time
export const dynamic = "force-static";
export const revalidate = false;

/* ============================================================================================= */

/**
 * generates RSS feed for documentation updates
 */
export const GET = async () => {
  // RSS items from changelog pages
  const items = [];

  // changelog slugs
  const changelogSlugs = content
    .getAllSlugs()
    .filter(({ slugs }) => slugs[0] === "changelog" && slugs.length > 1);

  for (const changelogSlug of changelogSlugs) {
    const item = await getRSSItemsMeta(changelogSlug.slugs);
    items.push(item);
  }

  // changelogs sorted by descending date
  const sortedItems = items.toSorted((a, b) => Number(b.date) - Number(a.date));

  // generate RSS XML
  const rss = generateRSSFeed(sortedItems.map((x) => createRSSItem(x)).join("\n"));

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};

/* ============================================================================================= */

interface RSSItemMeta {
  title: string;
  description: string;
  url: string;
  guid: string;
  date: Date;
}

const getRSSItemsMeta = async (slugs: string[]): Promise<RSSItemMeta> => {
  //
  const docsModule = await loadDocsModule({
    content,
    slugs,
  });

  if (!(docsModule && docsModule.meta?.url)) {
    return {} as RSSItemMeta;
  }

  const { metadata, meta } = docsModule;

  return {
    title: (metadata.title || meta?.metaTitle) ?? "UNTITLED",
    description: (metadata.description || meta?.metaDescription) ?? "UNDESCRIBED",
    url: `${SITE_URL}${meta.url}/`,
    guid: slugs.join(""),
    date: metadata.date ? new Date(metadata.date) : new Date(),
  };
};

/* ============================================================================================= */

type CreateRSSItemProps = RSSItemMeta;

const createRSSItem = ({ title, description, url, guid, date }: CreateRSSItemProps) => `
		<item>
			<title>${escapeXML(title || "Untitled")}</title>
			<description>${escapeXML(description ?? `content for ${title}`)}</description>
			<link>${escapeXML(url)}</link>
			<guid>${escapeXML(guid || url)}</guid>
			<pubDate>${date.toUTCString()}</pubDate>
		</item>
`;

/* ============================================================================================= */

/**
 * generates RSS XML feed
 *
 * @param items - RSS feed items
 */
const generateRSSFeed = (items: string) => {
  //
  const feedDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Shilp CSS Changelog</title>
		<link>${SITE_URL}/docs/changelog/</link>
		<description>Latest updates and announcements for Shilp CSS</description>
		<language>en-us</language>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
		<lastBuildDate>${feedDate}</lastBuildDate>
		<ttl>3600</ttl>
    ${items}
	</channel>
</rss>`;
};

/* ============================================================================================= */

/**
 * escapes XML special characters
 *
 * @param str - string to escape XML special characters
 */
const escapeXML = (str: string) => {
  //
  if (!str) {
    return "";
  }

  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
};
