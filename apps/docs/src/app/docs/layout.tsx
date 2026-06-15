import { contentConfig } from "@docs";
import { ScrollToActiveTopic } from "@jadeja/docs/components/docs/scroll-to-active-topic";
import { Topics } from "@jadeja/docs/components/docs/topics";

import type { ReactElement, ReactNode } from "react";

/* ============================================================================================= */

interface DocsLayoutProps {
  children: ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps): ReactElement<HTMLDivElement> => {
  return (
    //

    <div id="docs" className="container">
      {/*  */}

      <div className="topics__wrapper--desktop scroll-fade">
        <Topics tree={contentConfig.docs.getTree()} />
        <ScrollToActiveTopic />
      </div>

      {children}

      {/*  */}
    </div>
  );
};

/* ============================================================================================= */

export default DocsLayout;
