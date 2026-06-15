import { docsConfig } from "@docs";
import { BannerRoot, Banner as BannerEl } from "@jadeja/docs/components/layout/banner";
import { Link } from "@jadeja/docs/components/link";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Banner = (): ReactElement<HTMLDivElement> => {
  return (
    <BannerRoot>
      <BannerEl className="container">
        <p className="limit-lines">Senior Software Engineer, available for Product Teams</p>
        <Link href={docsConfig.authors.jadeja.socials.github.url}>[ Work With Me ]</Link>
      </BannerEl>
    </BannerRoot>
  );
};

/* ============================================================================================= */

export default Banner;
