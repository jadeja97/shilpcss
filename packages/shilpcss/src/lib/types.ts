/**
 * checks if the provided data is a string.
 *
 * @param arg - The data to check.
 *
 * @returns `true` if the data is a string, otherwise `false`.
 */
export const isStr = <T>(arg: T) => typeof arg === "string";

/* ============================================================================================= */

/**
 * checks if the provided data is a number.
 *
 * @param arg - The data to check.
 *
 * @returns `true` if the data is a number, otherwise `false`.
 */
export const isNum = <T>(arg: T) => typeof arg === "number";

/* ============================================================================================= */

/**
 * checks if the provided data is a function.
 *
 * @param arg - The data to check.
 *
 * @returns `true` if the data is a function, otherwise `false`.
 */
export const isFn = <T>(arg: T) => typeof arg === "function";

/* ============================================================================================= */

/**
 * checks if the provided data is an array.
 *
 * @param arg - The data to check.
 *
 * @returns `true` if the data is an array, otherwise `false`.
 */
export const isArr = <T>(arg: T) => Array.isArray(arg);

/* ============================================================================================= */

/**
 * checks if the provided data is an object (not an array, or null).
 *
 * @param arg - The data to check.
 *
 * @returns `true` if the data is an object, otherwise `false`.
 */
export const isObj = <T>(arg: T) => Boolean(arg) && typeof arg === "object" && !isArr(arg);
