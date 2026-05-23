import ScrollToActiveTopic from "@/components/docs/scroll-to-active-topic";
import Topics from "@/components/docs/topics";
import { SITE_URL } from "@/lib/constants";
import Content from "@/lib/content";

import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

/* ============================================================================================= */

// docs content info
const content = Content.create("src/content", "docs");

/* ============================================================================================= */

export const metadata: Metadata = {
  alternates: {
    canonical: "/docs",
    types: {
      "text/plain": `${SITE_URL}/llms.txt`,
    },
  },
};

/* ============================================================================================= */

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps): ReactElement<HTMLDivElement> => (
  //

  <div id="docs" className="container">
    {/*  */}

    <div className="topics__wrapper--desktop scroll-fade">
      <Topics tree={content.getTree()} />
      <ScrollToActiveTopic />
    </div>

    {children}

    {/*  */}
  </div>
);

/* ============================================================================================= */

export default DocsLayout;
