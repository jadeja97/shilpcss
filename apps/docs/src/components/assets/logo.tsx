import type { ReactElement } from "react";

/* ============================================================================================= */

const Logo = (): ReactElement<HTMLImageElement> => {
  return (
    // TODO: this image needs optimzation (affecting web vitals)
    // oxlint-disable-next-line next/no-img-element
    <img src="/logo.png" width={40} height={40} alt="shilp css logo" />
  );
};

/* ============================================================================================= */

export default Logo;
