"use client";

import { usePathname, useRouter } from "next/navigation";

import type { ComponentProps, JSX, ReactElement } from "react";

/* ============================================================================================= */

type HeadingTag = keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

type HeadingsProps = ComponentProps<HeadingTag> & {
  as: HeadingTag;
};

const Headings = ({ as: Component, ...rest }: HeadingsProps): ReactElement<HTMLHeadingElement> => {
  //
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    //
    if (!rest.id) {
      return;
    }

    // new page navigation must start from top (scroll position `0`)
    router.push(`${pathname}#${rest.id}`, { scroll: true });
  };

  return <Component {...rest} onClick={handleClick} />;
};

/* ============================================================================================= */

export default Headings;
