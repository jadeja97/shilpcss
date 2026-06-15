import type mixins from "@/config/mixins/data";
import type { ShilpConfig } from "@/types/config";
import type { PreventReservedKeys } from "@/types/utils";

/* ================================================================================================
	MIXIN METHODS
================================================================================================ */

/**
 * options used to resolve mixin usage from source content.
 */
export interface ResolveMixinOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * raw source content to scan.
   */
  content: string;
  /**
   * path of the file being scanned.
   */
  filePath: string;
}

/**
 * alias used when creating a single mixin result.
 */
export type CreateMixinOptions = MixinConfigResolveOptions;

/* ================================================================================================
	MIXIN CONFIG
================================================================================================ */

/**
 * variants object for a mixin.
 */
export type MixinVariants = Record<string, string | string[] | readonly string[]>;

/**
 * options passed to a custom mixin resolve method.
 */
export interface MixinConfigResolveOptions {
  /**
   * raw source content.
   */
  content: string;
  /**
   * path of the file being processed.
   */
  filePath: string;
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * mixin key being resolved.
   */
  mixinName: keyof Mixins;
  /**
   * variant key selected for this mixin.
   */
  variantName: keyof MixinVariants;
  /**
   * current mixin config object.
   */
  mixinConfig: MixinConfig;
  /**
   * raw mixin function arguments.
   */
  fn: string;
  /**
   * raw mixin token from source content.
   */
  raw: string;
}

/**
 * output returned by a custom mixin resolve method.
 */
export interface MixinConfigResolveOutput {
  /**
   * optional CSS definition block to prepend.
   */
  definition?: string;
  /**
   * final selector output.
   */
  selector: string;
}

/**
 * mixin config variant that resolves output with a custom method.
 */
export interface MixinConfigWithResolve {
  /**
   * disables this mixin when true.
   */
  disable?: boolean;
  /**
   * custom resolver that returns selector output.
   */
  resolve: (options: MixinConfigResolveOptions) => MixinConfigResolveOutput;
  /**
   * optional variants object consumed by the resolver.
   */
  variants?: MixinVariants;
}

/**
 * mixin config variant that only uses static variants.
 */
export interface MixinConfigWithoutResolve {
  /**
   * disables this mixin when true.
   */
  disable?: boolean;
  /**
   * [without `resolve`] Not allowed in static-variant mixins.
   */
  resolve?: never;
  /**
   * variants object used to generate selectors.
   */
  variants: MixinVariants;
}

/**
 * supported mixin config type.
 */
export type MixinConfig = MixinConfigWithResolve | MixinConfigWithoutResolve;

/* ================================================================================================
	MIXINS DEFINITIONS
================================================================================================ */

/**
 * object with all mixin configs by mixin key.
 */
export type Mixins = Record<string, MixinConfig> & PreventReservedKeys;

/**
 * type of ShilpCSS built-in `mixins` config.
 */
export type MixinsShape = typeof mixins;

/**
 * union of built-in mixin keys.
 */
export type { AvailableMixins } from "@/config/mixins/data";
