// oxlint-disable eslint/max-lines

import { existsSync, readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { cwd } from "node:process";

import { throwError } from "@jadeja/ts/lib";
import frontMatter from "front-matter";

import Search from "@/lib/search";
import Singleton from "@/lib/singleton";

import type {
  AddMetaOptions,
  CreateFileMetaOptions,
  CreateFolderMetaOptions,
  CreateTreeOptions,
  FileInfo,
  FileMeta,
  Folder,
  FolderMeta,
  FullMeta,
  List,
  Meta,
  Neighbours,
  Paths,
  Slugs,
  Tree,
} from "@/types/lib/content";
import type { Metadata } from "@/types/lib/docs";

/* ============================================================================================= */

/**
 * builds the documentation tree from the content directory.
 *
 * exposed methods:
 *
 * - `instance.getTree`
 * - `instance.getAllSlugs`
 * - `instance.getFileInfo`
 * - `instance.getNeighbours`
 */
class Content {
  //
  private paths!: Paths;
  private slugs!: Slugs;
  private list!: List;
  private tree!: Tree;
  private search!: Search & Singleton;

  public static create(path: string, dir: string) {
    return new this().init(path, dir);
  }

  private init(path: string, dir: string) {
    //
    const paths = this.getPaths(path, dir);

    const instance = Singleton.get<Content & Singleton>(paths.ROOT);

    const registerMethods = instance.registerMethods.bind(instance, this);

    if (!instance.paths) {
      instance.paths = paths;
    }

    // register methods, so `this` would point to singleton instance and not this class
    registerMethods([
      "readFile",
      "readMeta",
      "createTree",
      "createFileMeta",
      "createFolderMeta",
      "addMeta",
      "buildSearchIndex",
      "getNavigationURL",
      "getURLSafeFilePath",
      "getTree",
      "getAllSlugs",
      "getFileInfo",
      "getNeighbours",
    ]);

    if (!instance.slugs) {
      instance.slugs = new Map();
    }

    // TODO: use tree structure to reduce the memory
    if (!instance.list) {
      instance.list = new Map();
    }

    if (!instance.tree) {
      instance.tree = instance.createTree({});
    }

    // create search index
    if (!instance.search) {
      instance.search = Search.create(paths.ROOT);
      instance.buildSearchIndex();
    }

    return instance;
  }

  private getPaths(path: string, dir: string): Paths {
    // path from project root: {path}{dir}
    const root = join(path, dir);

    return {
      // relative path from project root: src/content
      path,
      // working directory: docs
      dir,
      // relative path from project root: src/content/docs
      root,
      // absolute path: {pathFromDrive}/shilpcss/apps/docs/src/content/docs
      ROOT: join(cwd(), root),
    };
  }

  /* =========================
		READ FILE
	========================= */

  private readFile(file: string) {
    //
    const isFileExist = existsSync(file);

    if (!isFileExist) {
      return null;
    }

    return readFileSync(file, "utf8");
  }

  private readMeta(dir: string): Meta {
    //
    const file = this.readFile(join(dir, "meta.json"));

    if (!file) {
      return {} as Meta;
    }

    return JSON.parse(file) as Meta;
  }

  /* ===========================
		NAVIGATION URL & FILE PATH
	=========================== */

  // create navigation url from slugs
  private getNavigationURL(slugs: string[]) {
    return [`/${this.paths.dir}`, ...slugs].join("/");
  }

  // get path for dynamic import
  private getURLSafeFilePath(...args: string[]) {
    return join(...args)
      .split(sep)
      .join("/");
  }

  /* =========================
		NAVIGATION TREE
	========================= */

  private createTree({ dir = this.paths.ROOT, parentSlugs = [] }: CreateTreeOptions): Tree {
    //
    const meta = this.readMeta(dir);

    if (!meta.items) {
      return [];
    }

    // all the files in current folder is processed first
    // so, creating a queue to hold folders
    const folderQueue: Folder[] = [];

    // get files meta only, queue the folders
    const files: (FileMeta | null)[] = meta.items.map((item) => {
      // remove hidden files
      if (item.hidden) {
        return null;
      }

      // file meta
      if (!item.type || item.type === "file") {
        return this.createFileMeta({ dir, parentSlugs, file: item });
      }

      // queue folder - processed last
      if (item.type === "folder") {
        folderQueue.push(item);
      }

      return null;
    });

    // get folders meta
    const folders = folderQueue.map((folder) =>
      this.createFolderMeta({ dir, parentSlugs, folder }),
    );

    return [...files.filter((x) => x !== null), ...folders];
  }

  private createFileMeta({ dir, parentSlugs, file }: CreateFileMetaOptions) {
    // create file metadata
    const fileFromMeta = typeof file === "string" ? { name: file } : file;

    const slug = fileFromMeta.slug ?? fileFromMeta.name;

    let slugs = parentSlugs;

    if (slug !== "index") {
      slugs = [...parentSlugs, slug];
    }

    const label = fileFromMeta.label ?? slug.replaceAll("-", " ");
    const { title } = fileFromMeta;

    const fileMeta: FileMeta = {
      type: "file",
      // text
      label,
      // title
      title,
      // link
      url: this.getNavigationURL(slugs),
    };

    this.addMeta({ dir, slugs, file: `${fileFromMeta.name}.mdx`, meta: fileMeta });

    return fileMeta;
  }

  private createFolderMeta({ dir, parentSlugs, folder }: CreateFolderMetaOptions) {
    //
    const rawFolderName = folder.name;
    let folderName = folder.name;

    // example: "(root)", "(core-concepts)"
    const isVirtual = /^\(.*\)$/.test(rawFolderName);

    if (isVirtual) {
      folderName = rawFolderName.replace(/^\(|\)$/, "");
    }

    const folderPath = join(dir, rawFolderName);

    const childMeta = this.readMeta(folderPath) || {};

    const isPage = childMeta.page;

    // will be ignored if virtual
    const slug = childMeta.slug ?? folderName;

    const label = childMeta.label ?? slug.replaceAll("-", " ");
    const { title } = childMeta;

    let slugs = parentSlugs;

    if (!isVirtual && slug !== "index") {
      slugs = [...parentSlugs, slug];
    }

    const folderMeta: FolderMeta = {
      type: "folder",
      isPage,
      // text
      label,
      // attr
      title,
      // link
      url: this.getNavigationURL(slugs),
      // childs
      childs: this.createTree({ dir: folderPath, parentSlugs: slugs }),
    };

    if (isPage) {
      if (!childMeta.name) {
        return throwError(`"name" property is missing at "${folderPath}${sep}meta.json"`);
      }

      this.addMeta({
        dir,
        slugs,
        file: `${rawFolderName}${sep}${childMeta.name}.mdx`,
        meta: folderMeta,
      });
    }

    return folderMeta;
  }

  private addMeta({ dir, slugs, file, meta }: AddMetaOptions) {
    //
    const index = this.slugs.size;

    const relativePath = relative(this.paths.ROOT, dir);

    const fullMeta: FullMeta = { ...meta, id: index };

    // get data for search
    try {
      const filePath = resolve(dir, file);

      const fileContent = this.readFile(filePath);

      if (fileContent) {
        //
        const { attributes, body } = frontMatter<Metadata>(fileContent);

        Object.assign(fullMeta, {
          metaTitle: attributes.title,
          metaDescription: attributes.description,
          metaKeywords: attributes.keywords,
          content: body,
        });
      }
      //
    } catch {
      throwError(`Error: process search data at ${resolve(dir, file)} with index ${index}`);
    }

    // get index from slug - O(1)
    this.slugs.set(slugs.join("/"), {
      index,
      filePath: this.getURLSafeFilePath(relativePath, file),
    });

    // get file metadata with index - O(1)
    this.list.set(index, fullMeta);
  }

  public getTree() {
    return this.tree;
  }

  /* =========================
		SEARCH
	========================= */

  private buildSearchIndex() {
    const documents = [...this.list.values()];
    this.search.ingest(documents);
  }

  /* =========================
    SLUGS & FILE INFO
	========================= */

  public getAllSlugs() {
    return [...this.slugs.keys()].map((slugs) => ({
      slugs: slugs.split("/"),
    }));
  }

  public getFileInfo(slugs = [] as string[]): FileInfo {
    //
    const fileInfo = this.slugs.get(slugs.join("/"));

    if (!fileInfo) {
      return {} as FileInfo;
    }

    return {
      ...fileInfo,
      meta: this.list.get(fileInfo.index),
    };
  }

  /* =========================
    NEIGHBOURS
	========================= */

  public getNeighbours(index: number): Neighbours {
    //
    return {
      prev: index > 0 ? this.list.get(index - 1) : null,
      next: index < this.list.size - 1 ? this.list.get(index + 1) : null,
    };
  }
}

/* ============================================================================================= */

export default Content;
