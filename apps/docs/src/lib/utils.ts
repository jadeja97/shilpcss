import { SITE_URL } from "@/lib/constants";

/* ============================================================================================= */

export { default as cls } from "clsx";

/* ============================================================================================= */

export { cva } from "class-variance-authority";

/* ============================================================================================= */

export const sanitizePathname = (path: string) => {
  //
  const { pathname } = new URL(path, SITE_URL);

  return (
    pathname
      // collapse slashes
      .replaceAll(/\/+/g, "/")
      // remove traversal
      .replaceAll("..", "") || "/"
  );
};
