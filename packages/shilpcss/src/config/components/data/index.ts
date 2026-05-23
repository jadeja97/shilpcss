import container from "./container";

import type { Components } from "@/types/config/components";

/* ============================================================================================= */

// dynamically generated components
// typically injected at `shilpcss/styles/components.css`
const components = {
  container,
} as const satisfies Components;

/* ============================================================================================= */

export default components;

export type AvailableComponents = keyof typeof components;
