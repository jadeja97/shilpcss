import Link from "@/components/link";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Banner = (): ReactElement<HTMLDivElement> => (
  <div className="banner__wrapper">
    <div className="banner container">
      <p className="limit-lines">Frontend Engineer, available for Product Teams</p>
      <Link href="/work-with-me">[ Work With Me ]</Link>
    </div>
  </div>
);

/* ============================================================================================= */

export default Banner;
