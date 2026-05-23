import type { RESERVED_NAMES } from "@/config/index/constants";

/* ============================================================================================= */

/**
 * blocks reserved internal keys in user config objects.
 *
 * Primarily used for intents and mixins.
 */
export type PreventReservedKeys = Partial<Record<(typeof RESERVED_NAMES)[number], never>>;

/**
 * recursive object where each key maps to a nested object or a final value.
 */
export interface NestedObject<T> {
  /**
   * dynamic key for a nested branch or leaf value.
   */
  [key: string]: NestedObject<T> | T;
}

/**
 * primitive data types
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * widen any type to primitive
 */
export type WidenPrimitive<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends bigint
        ? bigint
        : T extends symbol
          ? symbol
          : T;

/**
 * enhance auto-complete
 *
 * TODO: fina a better and correct way
 */
export type PrimitiveWithAutocomplete<T> = T extends string
  ?
      // oxlint-disable typescript/ban-types
      T | (string & {})
  : T extends number
    ?
        // oxlint-disable typescript/ban-types
        T | (number & {})
    : T extends boolean
      ? T
      : T extends bigint
        ?
            // oxlint-disable typescript/ban-types
            T | (bigint & {})
        : T extends symbol
          ?
              // oxlint-disable typescript/ban-types
              T | (symbol & {})
          : T;
/**
 * extend the narrow types
 *
 * TODO: find a better and correct way
 */
// oxlint-disable typescript/no-explicit-any
export type Extend<T> = T extends (...args: any[]) => any
  ? T
  : T extends (infer U)[]
    ? Extend<U>[]
    : T extends object
      ? {
          -readonly [K in keyof T]?: Extend<T[K]>;
        } & {
          [key: string]: Extend<WidenPrimitive<T[keyof T]>> | Primitive;
        }
      : PrimitiveWithAutocomplete<T>;
