import { BannerRoot, Banner as BannerEl } from "@jadeja/docs/components/layout/banner";
import { Link } from "@jadeja/docs/components/link";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Banner = (): ReactElement<HTMLDivElement> => {
  return (
    <BannerRoot>
      <BannerEl className="container">
        <p className="limit-lines">Frontend Engineer, available for Product Teams</p>
        <Link href="/work-with-me">[ Work With Me ]</Link>
      </BannerEl>
    </BannerRoot>
  );
};

/* ============================================================================================= */

export default Banner;
