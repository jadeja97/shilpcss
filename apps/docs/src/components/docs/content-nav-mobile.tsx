import Button from "@/components/button";
import ScrollToActiveTopic from "@/components/docs/scroll-to-active-topic";
import TOCComponent from "@/components/docs/toc";
import Topics from "@/components/docs/topics";
import { SheetContent, SheetHeader, SheetRoot, SheetTitle, SheetTrigger } from "@/components/sheet";

import type { ReactElement } from "react";

import type { Tree } from "@/types/lib/content";
import type { TOC } from "@/types/lib/docs";

/* ============================================================================================= */

interface ContentNavMobileProps {
  topics: Tree;
  toc: TOC[];
}

const ContentNavMobile = ({ topics, toc }: ContentNavMobileProps): ReactElement<HTMLDivElement> => (
  <div className="content-nav__wrapper--mobile">
    <div className="content-nav container">
      <MobileTopics topics={topics} />
      <MobileTOC toc={toc} />
    </div>
  </div>
);

/* ============================================================================================= */

type MobileTopicsProps = Pick<ContentNavMobileProps, "topics">;

const MobileTopics = ({ topics }: MobileTopicsProps): ReturnType<typeof SheetRoot> => (
  <SheetRoot>
    <SheetTrigger render={<Button variant="ghost" />}>Topics</SheetTrigger>
    <SheetContent side="left" hideCloseButton={false} className="content-nav__topics-content">
      <SheetHeader>
        <SheetTitle>Topics</SheetTitle>
      </SheetHeader>

      <div className="topics__wrapper--mobile scroll-fade">
        <Topics tree={topics} />
        <ScrollToActiveTopic isMobile />
      </div>
    </SheetContent>
  </SheetRoot>
);
/* ============================================================================================= */

type MobileTOCProps = Pick<ContentNavMobileProps, "toc">;

const MobileTOC = ({ toc }: MobileTOCProps): ReturnType<typeof SheetRoot> => (
  <SheetRoot>
    <SheetTrigger render={<Button variant="ghost" />}>On This Page</SheetTrigger>
    <SheetContent side="right" hideCloseButton={false} className="content-nav__toc-content">
      <SheetHeader>
        <SheetTitle>On This Page</SheetTitle>
      </SheetHeader>

      <div className="toc__wrapper--mobile scroll-fade">
        <TOCComponent toc={toc} isMobile />
      </div>
    </SheetContent>
  </SheetRoot>
);

/* ============================================================================================= */

export default ContentNavMobile;
