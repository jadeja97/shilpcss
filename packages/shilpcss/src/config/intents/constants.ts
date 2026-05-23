/**
 * extract intent name and utilities
 *
 * @example
 *   -`@intent-name utility-1! utility-2/50 ... utility-n;`;
 */
// oxlint-disable import/prefer-default-export
export const INTENT_PATTERN = /@([a-z-!]+?)\s(.+);/g;
