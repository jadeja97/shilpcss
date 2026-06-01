import { throwError, deepMergeObj, isFn, isStr } from "@jadeja/ts/lib";

import { IMPORT_COMPONENTS_PLACEHOLDER } from "@/config/components/constants";

import type {
  ComponentsComposeCSSOptions,
  ComponentsGenerateCSSOptions,
  ComponentsResolveCSSOptions,
} from "@/types/config/components";

/* ================================================================================================
	COMPOSE GENERATED CSS
================================================================================================ */

/**
 * compose generated CSS from a tree structure.
 *
 * @param options - Options for generating css from object tree.
 * @param options.config - The shilp config object.
 * @param options.componentName - The name of the component.
 * @param options.tree - The tree structure to generate CSS from.
 *
 * @returns The generated CSS string.
 */
const composeGeneratedCSS = ({ config, componentName, tree }: ComponentsComposeCSSOptions) => {
  //
  let css = "";

  for (const branch in tree) {
    // remove branch (componentConfig.mergeTree.*)
    if (!Object.hasOwn(tree, branch) || !tree[branch]) {
      continue;
    }

    css += resolveTree({
      config,
      componentName,
      branch,
      twig: tree[branch],
    });
  }

  return css;
};

/* ================================================================================================
	GENERATE DYNAMIC COMPONENTS
================================================================================================ */

/**
 * generates CSS for all components in the configuration.
 *
 * @param options - Options for generating component.
 * @param options.config - The shilp config object.
 * @param options.content - The content to inject dynamically generated components.
 *
 * @returns The content with component CSS injected.
 */
// oxlint-disable import/prefer-default-export
export const generateComponents = ({ config, content }: ComponentsGenerateCSSOptions) =>
  content.replace(IMPORT_COMPONENTS_PLACEHOLDER, () => {
    //
    let defineComponents = "";

    for (const key in config.components) {
      //
      if (!Object.hasOwn(config.components, key)) {
        continue;
      }

      const componentName = key;

      const componentConfig = config.components[componentName];

      // remove component
      if (componentConfig.disable) {
        continue;
      }

      /* ======================================================================================= */

      // get component as string
      if (isFn(componentConfig.resolve)) {
        defineComponents +=
          componentConfig.resolve({
            config,
            content,
            componentName,
            componentConfig,
          }) || "";

        break;
        //
      }

      /* ======================================================================================= */

      // get component tree and convert to string
      if (isFn(componentConfig.generateTree)) {
        //
        const generatedTree =
          componentConfig.generateTree({
            config,
            content,
            componentName,
            componentConfig,
          }) || {};

        const mergeTree =
          componentConfig.mergeTree?.({
            config,
            content,
            componentName,
            componentConfig,
            generatedTree,
          }) ?? {};

        deepMergeObj(generatedTree, mergeTree);

        defineComponents += composeGeneratedCSS({
          config,
          componentName,
          tree: generatedTree,
        });

        break;
        //
      }

      /* ======================================================================================= */

      throwError(
        `COMPONENTS: ${componentName} requires either \`generateTree\` or \`resolve\` function!`,
      );
    }

    return defineComponents;
  });

/* ================================================================================================
	RESOLVE TREE
================================================================================================ */

/**
 * resolves the CSS tree structure for a component.
 *
 * @param options - Options for resolving object tree to css properties.
 * @param options.config - The shilp config object.
 * @param options.componentName - The name of the component.
 * @param options.branch - The CSS branch (e.g., ".my-component").
 * @param options.twig - The twig or tree structure to resolve.
 *
 * @returns The resolved CSS string for the component.
 */
const resolveTree = ({ config, componentName, branch, twig }: ComponentsResolveCSSOptions) => {
  //
  if (!isStr(twig)) {
    return `${branch} { ${composeGeneratedCSS({
      config,
      componentName,
      tree: twig,
    })} }`;
  }

  // if branch starts with `@` then it is intent
  // intent -> { "@text" : "size-sm;" }
  // this is completely sepearate from mixins as it have object as value and never reaches at this point
  // mixin -> { "@theme dark" : { "@bg": "color-black;" } }
  if (branch.startsWith("@")) {
    // NOTE: make sure the intent is not repeated, otherwise overrided
    // branch - intent
    // twig - utilities
    return `${branch} ${twig}${twig.endsWith(";") ? "" : ";"}`;
  }

  // NOTE: inline theme is supported
  return `${branch}: ${twig}${twig.endsWith(";") ? "" : ";"}`;
};
