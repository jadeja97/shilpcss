import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

export type SVGProps = ComponentProps<"svg">;
export type SVGEl = ReactElement<SVGElement>;

const SVG = (props: SVGProps): SVGEl => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" {...props} />
);

/* ============================================================================================= */

export default SVG;
