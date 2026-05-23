import { ChevronLeftIcon, ChevronRightIcon } from "@icons";

import { variants as btnVariants } from "@/components/button";
import Link from "@/components/link";
import { cls } from "@/lib/utils";

import type { ReactElement } from "react";

import type { Neighbours } from "@/types/lib/content";

/* ============================================================================================= */

type NeighboursProps = Neighbours;

const Neighbours = ({ prev, next }: NeighboursProps): ReactElement<HTMLDivElement> => (
  //

  <div className="page__neighbours">
    {prev && (
      <Link
        className={cls("prev-btn", btnVariants({ variant: "outline" }))}
        href={prev.url}
        title={prev.title}
      >
        <ChevronLeftIcon /> {prev.title ?? prev.label}
      </Link>
    )}

    {next && (
      <Link
        className={cls("next-btn", btnVariants({ variant: "outline" }))}
        href={next.url}
        title={next.title}
      >
        {next.title ?? next.label} <ChevronRightIcon />
      </Link>
    )}
  </div>
);

/* ============================================================================================= */

export default Neighbours;
