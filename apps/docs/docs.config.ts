import { defineConfig } from "@jadeja/docs";
import { GithubIcon, LinkedInIcon, TwitterXIcon } from "@jadeja/docs/components/assets/icons";
import { Content } from "@jadeja/docs/lib/content";

import pkg from "./package.json";

import type { DocsConfig } from "@jadeja/docs/types/config";
import type { ContentBaseOptions } from "@jadeja/docs/types/content";

/* ============================================================================================= */

export const docsConfig: DocsConfig = defineConfig({
  //
  trailingSlash: true,

  app: {
    name: "Shilp CSS",
    description: "an Intent-first, CSS-centric, styling engine and framework",
    keywords: [
      "shilp css",
      "framework",
      "library",
      "styling engine",
      "intent-first css",
      "css-centric styling",
    ],
    publisher: "Jadeja",
    creator: "Pradipsinh Jadeja",
    country: "India",
    locale: "en_US",
    home: {
      title: {
        default: "Shilp CSS",
        template: "%s | Shilp CSS",
      },
      alternates: {
        canonical: "/",
        types: {
          "application/rss+xml": "https://shilpcss.com/rss.xml",
          "text/plain": "https://shilpcss.com/llms.txt",
          "text/x-sitemap+xml": "https://shilpcss.com/sitemap.xml",
        },
      },
    },
    images: {
      og: {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    },
    x: {
      site: "@shilpcss",
      siteId: "2030301913112285184",
    },
  },

  authors: {
    jadeja: {
      name: "Pradipsinh Jadeja",
      link: "https://github.com/jadeja97",
      jobTitle: "Senior Software Engineer",
      location: "Kutch, Gujarat, India",
      x: {
        creator: "@jadeja97_",
        creatorId: "1951893079608160256",
      },
      socials: {
        github: {
          label: "Github",
          url: "https://github.com/Jadeja97",
        },
        x: {
          label: "X",
          url: "https://x.com/@jadeja97_",
        },
        linkedIn: {
          label: "LinkedIn",
          url: "https://linkedin.com/in/jadeja97",
        },
      },
    },
  },

  analytics: {
    googleAnalytics: "G-QFX24FX5X6",
    microsoftClarity: "wf6b8hbm1j",
  },

  constants: {
    SITE_URL: "https://shilpcss.com",
    VERSION: pkg.version,
    // oxlint-disable-next-line node/no-process-env
    PROD: process.env.NODE_ENV === "production",
    // oxlint-disable-next-line node/no-process-env
    DEV: process.env.NODE_ENV === "development",
  },

  links: {
    navigations: {
      docs: {
        label: "Docs",
        url: "/docs",
        title: "documentation",
      },
    },

    socials: {
      github: {
        label: "Github",
        url: "https://github.com/JadejaHQ/shilpcss",
        icon: GithubIcon,
      },
      x: {
        label: "X",
        url: "https://x.com/shilpcss",
        icon: TwitterXIcon,
      },
      linkedIn: {
        label: "LinkedIn",
        url: "https://linkedin.com/showcase/shilpcss",
        icon: LinkedInIcon,
      },
    },
  },
});

/* ============================================================================================= */

export const contentBaseOptions: ContentBaseOptions = {
  fetchAlwaysLastModified: false,
  frontMatterFormatting: { indent: 2, lineWidth: 100, quotingType: '"' },
  search: {
    SEARCH_INDEX_FIELDS: docsConfig.constants.SEARCH_INDEX_FIELDS,
    SEARCH_INDEX_FILE_NAME: docsConfig.constants.SEARCH_INDEX_FILE_NAME,
    SEARCH_INDEX_RETURN_FIELDS: docsConfig.constants.SEARCH_INDEX_RETURN_FIELDS,
  },
  trailingSlash: docsConfig.trailingSlash,
};

export const docsContentOptions = { ...contentBaseOptions };

/* ============================================================================================= */

export const contentConfig = {
  docs: Content.create("docs", docsContentOptions),
};
