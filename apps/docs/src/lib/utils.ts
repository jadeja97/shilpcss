import { SITE_URL } from "@/lib/constants";

/* ============================================================================================= */

export { default as cls } from "clsx";

/* ============================================================================================= */

export { cva } from "class-variance-authority";

/* ============================================================================================= */

/**
 * throws an error with the provided message.
 *
 * @param err - The error message to throw.
 */
export const throwError = <T>(err: T) => {
  //
  let errMsg: string;

  if (err instanceof Error) {
    errMsg = err.message;
  } else if (typeof err === "string") {
    errMsg = err;
  } else {
    errMsg = String(err);
  }

  throw new Error(errMsg);
};

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

/* ============================================================================================= */

/**
 * put the app to sleep for defined time for artificial delay to improve the UX
 *
 * @param time - time for artificial delay (default `250)
 */
// oxlint-disable eslint/require-await
export const sleep = async (time = 250): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
