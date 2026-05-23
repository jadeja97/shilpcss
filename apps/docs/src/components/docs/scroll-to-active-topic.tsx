"use client";

/* ============================================================================================= */

import { useEffect, startTransition } from "react";

import jumpScroll from "@/lib/jump-scroll";

/* ============================================================================================= */

interface ScrollToActiveTopicProps {
  isMobile?: boolean;
}

const ScrollToActiveTopic = ({ isMobile = false }: ScrollToActiveTopicProps) => {
  //
  useEffect(() => {
    startTransition(() => {
      //
      const container = document.querySelector(
        `.topics__wrapper--${isMobile ? "mobile" : "desktop"}`,
      );
      const activeElements = container?.querySelector(`[data-active]`);

      jumpScroll({
        container,
        element: activeElements,
      });
    });
  }, [isMobile]);

  return null;
};

/* ============================================================================================= */

export default ScrollToActiveTopic;
