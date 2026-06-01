/* ================================================================================================
  PATHS
================================================================================================ */

export interface Paths {
  path: string;
  dir: string;
  root: string;
  ROOT: string;
}

/* ================================================================================================
  SLUGS
================================================================================================ */

export type Slugs = Map<
  string,
  {
    index: number;
    filePath: string;
  }
>;

/* ================================================================================================
  LIST
================================================================================================ */

export type List = Map<number, FullMeta>;

/* ================================================================================================
  TREE
================================================================================================ */

export type Tree = (FileMeta | FolderMeta)[];

export interface CreateTreeOptions {
  dir?: string;
  parentSlugs?: string[];
  reservedIndex?: number;
}

/* ================================================================================================
  META
================================================================================================ */

export interface Meta {
  page?: boolean;
  slug?: string;
  label?: string;
  title?: string;
  name?: string;
  items: (File | Folder)[];
}

export type FullMeta = (FileMeta | FolderMeta) & {
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  content?: string;
};

export interface AddMetaOptions {
  dir: string;
  slugs: string[];
  file: string;
  meta: FileMeta | FolderMeta;
  reservedIndex?: number;
}

/* ================================================================================================
  FILE
================================================================================================ */

export interface File {
  type?: "file";
  hidden?: boolean;
  name: string;
  slug?: string;
  label?: string;
  title?: string;
}

export interface FileMeta {
  type: "file";
  /**
   * text
   */
  label: string;
  /**
   * attr
   */
  title?: string;
  /**
   * link
   */
  url: string;
}

export interface CreateFileMetaOptions {
  dir: string;
  parentSlugs: string[];
  file: File;
  reservedIndex?: number;
}

export interface FileInfo {
  meta?: FullMeta;
  index?: number;
  filePath?: string;
}

/* ================================================================================================
  FOLDER
================================================================================================ */

export interface Folder {
  type: "folder";
  hidden?: boolean;
  name: string;
}

export interface FolderMeta {
  type: "folder";
  isPage?: boolean;
  /**
   * text
   */
  label: string;
  /**
   * attr
   */
  title?: string;
  /**
   * link
   */
  url: string;
  /**
   * childs
   */
  childs: Tree;
}

export interface CreateFolderMetaOptions {
  dir: string;
  parentSlugs: string[];
  folder: Folder;
}

/* ================================================================================================
  NEIGHBOURS
================================================================================================ */

export interface Neighbours {
  prev?: FullMeta | null;
  next?: FullMeta | null;
}
