import type { NestedObject } from "@jadeja/ts/types/data";

import type components from "@/config/components/data";
import type { ShilpConfig } from "@/types/config";

/* ================================================================================================
	COMPONENT METHODS
================================================================================================ */

/**
 * options used to generate component CSS from content.
 */
export interface ComponentsGenerateCSSOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * raw content to scan for component usage.
   */
  content: string;
}

/**
 * options used to compose CSS from a generated component tree.
 */
export interface ComponentsComposeCSSOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * component key being composed.
   */
  componentName: keyof Components;
  /**
   * nested tree of generated CSS parts.
   */
  tree: NestedObject<string>;
}

/**
 * options used to resolve a single branch or twig in component trees.
 */
export interface ComponentsResolveCSSOptions {
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * component key being resolved.
   */
  componentName: keyof Components;
  /**
   * current tree branch key.
   */
  branch: string;
  /**
   * current twig value or nested tree.
   */
  twig: string | NestedObject<string>;
}

/* ================================================================================================
	COMPONENT CONFIG
================================================================================================ */

/**
 * shared options used by component config methods.
 */
export interface ComponentConfigMethodBaseOptions {
  /**
   * raw content to evaluate.
   */
  content: string;
  /**
   * your `shilp.config` object.
   */
  config: ShilpConfig;
  /**
   * component key being processed.
   */
  componentName: keyof Components;
  /**
   * current component config object.
   */
  componentConfig: ComponentConfig;
}

/**
 * options passed to component resolve methods.
 */
export type ComponentResolveOptions = ComponentConfigMethodBaseOptions;

/**
 * options passed to component tree generation methods.
 */
export type ComponentGenerateTreeOptions = ComponentConfigMethodBaseOptions;

/**
 * options passed to component tree merge methods.
 */
export interface ComponentMergeTreeOptions extends ComponentConfigMethodBaseOptions {
  /**
   * generated tree that should be converted to CSS.
   */
  generatedTree: NestedObject<string | null | undefined>;
}

/**
 * component config variant that resolves directly to CSS.
 */
export interface ComponentConfigWithResolve {
  /**
   * disables this component when true.
   */
  disable?: boolean;
  /**
   * method that returns final CSS for the component.
   */
  resolve: (options: ComponentResolveOptions) => string;
  /**
   * [with `resolve`] Not allowed when `resolve` is used.
   */
  generateTree?: never;
  /**
   * [with `resolve`] Not allowed when `resolve` is used.
   */
  mergeTree?: never;
}

/**
 * component config variant that builds and optionally merges a tree.
 */
export interface ComponentConfigWithoutResolve {
  /**
   * disables this component when true.
   */
  disable?: boolean;
  /**
   * [with `generateTree`] Not allowed in tree-based component configs.
   */
  resolve?: never;
  /**
   * method that builds a nested component tree.
   */
  generateTree: (options: ComponentGenerateTreeOptions) => NestedObject<string>;
  /**
   * optional method that merges a generated tree into final CSS.
   */
  mergeTree?: (options: ComponentMergeTreeOptions) => string;
}

/**
 * supported component config type.
 */
export type ComponentConfig = ComponentConfigWithResolve | ComponentConfigWithoutResolve;

/* ================================================================================================
	COMPONENTS DEFINITIONS
================================================================================================ */

export type Components = Record<string, ComponentConfig>;

/**
 * type of ShilpCSS built-in `components` config.
 */
export type ComponentsShape = typeof components;

/**
 * union of built-in component keys.
 */
export type { AvailableComponents } from "@/config/components/data";
