import Link from "@/components/link";
import List from "@/components/list";

import type { ReactElement } from "react";

import type { FileMeta, FolderMeta, Tree } from "@/types/lib/content";

/* ============================================================================================= */

interface TopicsProps {
  tree: Tree;
}

const Topics = ({ tree }: TopicsProps): ReactElement<HTMLDivElement> => (
  <div className="topics">
    {tree.map((folder) => (
      <Folder key={folder.label} meta={folder as FolderMeta} />
    ))}
  </div>
);

/* ============================================================================================= */

interface FolderProps {
  meta: FolderMeta;
}

const Folder = ({ meta }: FolderProps): ReactElement<HTMLDivElement> => (
  <div data-folder={meta.label}>
    <span className="folder__label">{meta.label}</span>

    <List unstyled>
      {meta.childs.map((child) => (
        <li key={child.label}>
          <RenderChild meta={child} />
        </li>
      ))}
    </List>
  </div>
);

/* ============================================================================================= */

type FolderPageProps = FolderProps;

const FolderPage = ({ meta }: FolderPageProps): ReactElement<HTMLDivElement> => (
  <div data-folder-page={meta.label}>
    {/*  */}
    <RenderChild meta={{ ...meta, type: "file" }} />

    <List unstyled>
      {meta.childs.map((child) => (
        <li key={child.label}>
          <RenderChild meta={child} />
        </li>
      ))}
    </List>
  </div>
);

/* ============================================================================================= */

interface RenderChildProps {
  meta: FileMeta | FolderMeta;
}

const RenderChild = ({
  meta,
}: RenderChildProps): null | ReturnType<typeof Link | typeof Folder | typeof FolderPage> => {
  // render file as page
  if (meta.type === "file") {
    return (
      <Link href={meta.url} title={meta.title}>
        {meta.label}
      </Link>
    );
  }

  // render nested folder
  if (meta.type === "folder") {
    const Component = meta.isPage ? FolderPage : Folder;
    return <Component meta={meta} />;
  }

  return null;
};

/* ============================================================================================= */

export default Topics;
