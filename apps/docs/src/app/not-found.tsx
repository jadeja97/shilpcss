import { buttonVariants } from "@jadeja/docs/components/button";
import { Link } from "@jadeja/docs/components/link";
import { LiveStar } from "@jadeja/docs/components/loaders/live-star";

import type { Metadata } from "next";
import type { ReactElement } from "react";

/* ============================================================================================= */

export const metadata: Metadata = {
  title: "Page Not Found",
};

/* ============================================================================================= */

const NotFound = (): ReactElement<HTMLElement> => {
  return (
    <main id="not-found" className="container page-layout">
      {/*  */}
      <div className="not-found-loader__wrapper">
        <LiveStar />
      </div>

      <p>
        404 <br /> Page Not Found
      </p>

      <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })} replace>
        Home
      </Link>
    </main>
  );
};

/* ============================================================================================= */

export default NotFound;
