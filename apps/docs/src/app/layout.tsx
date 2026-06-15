import "@/styles/main.css";
import { resolve } from "node:path";

import { docsConfig } from "@docs";
import { MicrosoftClarity, GoogleAnalytics } from "@jadeja/docs/components/misc/analytics";
import { InitialLoad, Routing } from "@jadeja/docs/components/misc/page-aware";
import { ThemeProvider } from "@jadeja/docs/components/theme/provider";
import { getHomePageSEO } from "@jadeja/docs/lib/app/seo";
import { getLastModified, getMostRecentDateTime } from "@jadeja/docs/lib/date-time";
import { cls } from "@jadeja/docs/lib/dom/utils";

import Banner from "@/components/layout/banner";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { body, code, display } from "@/lib/fonts";

import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

/* ============================================================================================= */

export const metadata: Metadata = getHomePageSEO({
  app: docsConfig.app,
  authors: docsConfig.authors,
  frontMatter: {
    authors: ["jadeja"],
    title: docsConfig.app.name,
    description: docsConfig.app.description,
    keywords: docsConfig.app.keywords,
    publishedAt: "2026-04-20T05:11:25Z",
    lastModifiedAt: getMostRecentDateTime([
      getLastModified(resolve("./layout.tsx")),
      getLastModified(resolve("./page.tsx")),
    ]),
  },
  SITE_URL: docsConfig.constants.SITE_URL,
  trailingSlash: docsConfig.trailingSlash,
});

/* ============================================================================================= */

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): ReactElement<HTMLHtmlElement> => {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cls(display.variable, body.variable, code.variable)}
    >
      <head>
        {/* adds `data-path` and `data-root` attr to html on initial load (before dom paint) */}
        <InitialLoad SITE_URL={docsConfig.constants.SITE_URL} />

        {/* analytics scripts added at the end of body */}
      </head>

      <body>
        {/* adds ``data-path` and `data-root` attr to html on client navigation (before dom paint) */}
        <Routing SITE_URL={docsConfig.constants.SITE_URL} />

        <ThemeProvider>
          <div id="root">
            {/*  */}

            <Banner />
            <Header />

            <div id="main">{children}</div>

            <Footer />

            {/*  */}
          </div>
        </ThemeProvider>

        {/* google analytics (GoogleAnalytics) */}
        <GoogleAnalytics
          PROD={docsConfig.constants.PROD}
          id={docsConfig.analytics?.googleAnalytics}
        />
        {/* microsoft clarity */}
        <MicrosoftClarity
          PROD={docsConfig.constants.PROD}
          id={docsConfig.analytics?.microsoftClarity}
        />
      </body>
    </html>
  );
};

/* ============================================================================================= */

export default RootLayout;
