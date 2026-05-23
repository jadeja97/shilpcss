"use client";

/* ============================================================================================= */

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

import { sanitizePathname } from "@/lib/utils";

import type { ReactElement } from "react";

/* ============================================================================================= */

const addDataAttrToHTML = (pathname: string) => {
  //
  const path = sanitizePathname(pathname);
  const [_emptyString, root] = path.split("/");

  const html = document.documentElement;

  // trailing slash added for github pages,
  // so we need to remove it for normal path
  const isTrailingSlash = path.endsWith("/");

  html.dataset.path = (isTrailingSlash ? path.slice(0, -1) : path) || "/";
  html.dataset.root = root || "home";
  //
};

/* ============================================================================================= */

/**
 * adds `data-page` attr to html on initial load (before dom paint)
 */
export const Routing = () => {
  //
  const pathname = usePathname();

  useLayoutEffect(() => {
    //
    addDataAttrToHTML(pathname);
    //
  }, [pathname]);

  return null;
};

/* ============================================================================================= */

/**
 * adds `data-page` attr to html on client navigation (before dom paint)
 */
export const InitialLoad = (): ReactElement<HTMLScriptElement> => (
  <script
    suppressHydrationWarning
    // oxlint-disable react/no-danger
    dangerouslySetInnerHTML={{
      // oxlint-disable typescript/restrict-template-expressions
      __html: `
				(function(pathname, addDataAttrToHTML) {
					//
					addDataAttrToHTML(pathname);
					//
				})(location.pathname, ${addDataAttrToHTML})
			`,
    }}
  />
);
