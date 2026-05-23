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

/**
 * logs a message to the console.
 *
 * @param msg - The message to log.
 */
export const { log } = console;

/* ============================================================================================= */

/**
 * logs a divider line to the console.
 *
 * @param divider - The character to use for the divider (default is "-").
 * @param count - The number of times to repeat the divider character (default is 50).
 */
export const logDivider = (divider = "-", count = 50) => {
  log(divider.repeat(count));
};

/* ============================================================================================= */

/**
 * logs a new line with an optional message to the console.
 *
 * @param msg - The message to include in the new line (optional).
 */
export const logNewLine = <T>(msg?: T) => {
  // oxlint-disable typescript/restrict-template-expressions
  log(`\n${msg}\n`);
};

/* ============================================================================================= */

/**
 * logs a warning message to the console.
 *
 * @param msg - The warning message to log.
 */
export const { warn } = console;

/* ============================================================================================= */

/**
 * logs a new line with an optional warning message to the console.
 *
 * @param msg - The warning message to include in the new line (optional).
 */
export const warnNewLine = <T>(msg?: T) => {
  // oxlint-disable typescript/restrict-template-expressions
  warn(`\n${msg}\n`);
};
