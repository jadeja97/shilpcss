import { variants as btnVariants } from "@/components/button";
import Link from "@/components/link";
import LiveStar from "@/components/loaders/live-star";

import type { Metadata } from "next";
import type { ReactElement } from "react";

/* ============================================================================================= */

export const metadata: Metadata = {
  title: "Page Not Found",
};

/* ============================================================================================= */

const NotFound = (): ReactElement<HTMLElement> => (
  <main id="not-found" className="container page-layout">
    {/*  */}
    <div className="not-found-loader__wrapper">
      <LiveStar />
    </div>

    <p>
      404 <br /> Page Not Found
    </p>

    <Link href="/" className={btnVariants({ variant: "outline", size: "lg" })} replace>
      Home
    </Link>
  </main>
);

/* ============================================================================================= */

export default NotFound;
