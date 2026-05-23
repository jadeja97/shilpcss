/**
 * insert dynamic value for css property (define anywhere).
 *
 * @example
 *   - `theme(colors-red-400)` or `theme(color|colors-red-400)`
 */
// oxlint-disable import/prefer-default-export
export const INLINE_THEME_PATTERN = /theme\((?:([a-zA-Z]+)\|)?([a-zA-Z0-9./-]+)\)/g;
