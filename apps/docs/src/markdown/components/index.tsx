import Link from "@/components/link";
import List from "@/components/list";

import Alert from "./alert";
import CodeBlock from "./code-block";
import Heading from "./heading";
import Table from "./table";

import type { ComponentProps } from "react";

import type { OLProps } from "@/components/list";

/* ================================================================================================
	HTML Elements
================================================================================================ */

const HTMLElements = {
  /* link */
  a: Link,

  /* headings */
  h1: (props: ComponentProps<"h1">) => <Heading {...props} as="h1" />,
  h2: (props: ComponentProps<"h2">) => <Heading {...props} as="h2" />,
  h3: (props: ComponentProps<"h3">) => <Heading {...props} as="h3" />,
  h4: (props: ComponentProps<"h4">) => <Heading {...props} as="h4" />,
  h5: (props: ComponentProps<"h5">) => <Heading {...props} as="h5" />,
  h6: (props: ComponentProps<"h6">) => <Heading {...props} as="h6" />,

  /* code */
  // pre: don't use `pre` custom component
  code: CodeBlock,

  /* list */
  ul: List,
  ol: (props: OLProps) => <List {...props} ordered />,

  /* table */
  table: Table,
};

/* ================================================================================================
	JSX Components
================================================================================================ */

const components = {
  Alert,
};

/* ================================================================================================
	MDX Components
================================================================================================ */

const mdxComponents = {
  ...HTMLElements,
  ...components,
};

/* ============================================================================================= */

export default mdxComponents;
