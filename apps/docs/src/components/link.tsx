"use client";

/* ============================================================================================= */

import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";

import type { LinkProps as NextLinkProps } from "next/link";
import type { ReactElement, ComponentProps } from "react";

/* ============================================================================================= */

type LinkProps = ComponentProps<"a"> &
  NextLinkProps & {
    navLink?: boolean;
    "data-active"?: boolean;
  };

type LinkAttrs = ComponentProps<"a"> & {
  href: LinkProps["href"];
};

const Link = ({ href, navLink, ...rest }: LinkProps): ReactElement<HTMLAnchorElement> => {
  //
  const pathname = usePathname();

  if (!href) {
    throw new Error("`href` prop is missing!");
  }

  // open external link in new tab
  const handleExternalLink = () => {
    //
    const attrs: LinkAttrs = { href };

    if (href.startsWith("https://")) {
      attrs.rel = "noopener noreferrer";
      attrs.target = "_blank";
    }

    return attrs;
  };

  // add `data-active` attr to active url
  const handleActiveLink = () => {
    //
    if (rest["data-active"]) {
      return {};
    }

    // trailing slash added for github pages,
    // so we need to remove it for active link check
    const isTrailingSlash = pathname.endsWith("/");

    let isActive = (isTrailingSlash ? pathname.slice(0, -1) : pathname) === href;

    if (navLink) {
      isActive = pathname.includes(href);
    }

    return {
      "data-active": (isActive && href !== "/") || undefined,
    };
  };

  return (
    <NextLink
      // new page navigation start from top
      scroll
      {...rest}
      {...handleExternalLink()}
      {...handleActiveLink()}
    />
  );
};

/* ============================================================================================= */

export default Link;
