// https://v3.tailwindcss.com/docs/container#using-the-container
// https://getbootstrap.com/docs/5.3/layout/containers/

/* ============================================================================================= */

import type { NestedObject } from "@/types";
import type { ComponentConfig, ComponentGenerateTreeOptions } from "@/types/config/components";

/* ================================================================================================
	GENERATE TREE
================================================================================================ */

interface ContainerConfig {
  display?: string;
  innerPadding?: Record<string, string>;
  spacing?: Record<string, string>;
  align?: "left" | "right" | "center";
}

type Container = {
  width: string;
  display?: string;
  "padding-left"?: string;
  "padding-right"?: string;
  "margin-left": string;
  "margin-right": string;
  "max-width"?: string;
} & NestedObject<string>;

/**
 * generates container component CSS from a tree structure.
 *
 * @param options - Options for generating component classes from object tree.
 * @param options.config - The shilp config object.
 * @param options.componentName - The name of the component.
 *
 * @returns The generated componet classes CSS string.
 */
const generateTree = ({ config }: ComponentGenerateTreeOptions) => {
  //

  const containerConfig = config.theme?.[
    "container" as keyof typeof config.theme
  ] as unknown as ContainerConfig;

  // order matters: ascending
  const breakpoints = config.theme?.["screens" as keyof typeof config.theme] as unknown as Record<
    string,
    string
  >;

  const modifiedBreakpoints = { DEFAULT: "", ...breakpoints };

  const containerTree: Record<string, Container> = {};

  for (const breakpoint in modifiedBreakpoints) {
    //
    if (!Object.hasOwn(modifiedBreakpoints, breakpoint)) {
      continue;
    }

    const container: Container = {
      width: "100%",
      "margin-left": "auto",
      "margin-right": "auto",
    };

    /* ============================================================================================
			BASE
		============================================================================================ */

    if (containerConfig.innerPadding?.DEFAULT) {
      container["padding-left"] = containerConfig.innerPadding.DEFAULT;
      container["padding-right"] = containerConfig.innerPadding.DEFAULT;
    }

    if (containerConfig.display) {
      container.display = containerConfig.display;
    }

    if (containerConfig.align === "left") {
      container["margin-left"] = "unset";
      container["margin-right"] = "auto";
    } else if (containerConfig.align === "right") {
      container["margin-left"] = "auto";
      container["margin-right"] = "unset";
    }

    /* ============================================================================================
			BREAKPOINTS
		============================================================================================ */

    const trackExisting = [];

    // order matters: ascending
    for (const trackerBreakpoint in breakpoints) {
      if (!Object.hasOwn(breakpoints, trackerBreakpoint)) {
        continue;
      }

      if (trackerBreakpoint === breakpoint) {
        break;
      }
      trackExisting.push(trackerBreakpoint);
    }

    // add padding and margin per breakpoint
    for (const mediaBreakpoint in breakpoints) {
      //
      if (!Object.hasOwn(breakpoints, mediaBreakpoint)) {
        continue;
      }

      const mediaContainer: Omit<Container, "width"> = {};

      if (containerConfig.innerPadding?.[mediaBreakpoint]) {
        mediaContainer["padding-left"] = containerConfig.innerPadding[mediaBreakpoint];
        mediaContainer["padding-right"] = containerConfig.innerPadding[mediaBreakpoint];
      }

      if (containerConfig.spacing?.[mediaBreakpoint]) {
        if (breakpoint === "DEFAULT" || !trackExisting.includes(mediaBreakpoint)) {
          mediaContainer["max-width"] =
            `calc(${breakpoints[mediaBreakpoint]} - 2 * ${containerConfig.spacing[mediaBreakpoint]})`;
        }
      }

      trackExisting.push(mediaBreakpoint);

      container[`@screen ${mediaBreakpoint}`] = mediaContainer;
    }

    // add a breakpoint class
    containerTree[`.container${breakpoint === "DEFAULT" ? "" : `-${breakpoint}`}`] = container;
  }

  return containerTree;
};

/* ================================================================================================
	COMPONENT CONFIG
================================================================================================ */

const container: ComponentConfig = {
  generateTree,
};

/* ============================================================================================= */

export default container;
