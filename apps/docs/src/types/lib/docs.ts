import type { FC } from "react";

import type Content from "@/lib/content";
import type { FileInfo, Neighbours } from "@/types/lib/content";

/* ============================================================================================= */

export interface LoadDocsModuleOptions {
  content: Content;
  slugs: string[];
}

export type Metadata = {
  title: string;
  description: string;
  keywords: string;
} & Record<string, string>;

export interface TOC {
  level: number;
  text: string;
  id: string;
}

export interface DocsModule {
  MDXComponent: FC;
  metadata: Metadata;
  toc: TOC[];
}

export type DocsModuleOutput = FileInfo &
  DocsModule & {
    neighbours: Neighbours;
  };

export type LoadDocsModuleOutput = Promise<DocsModuleOutput | null>;
