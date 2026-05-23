import CopyToClipboard from "@/components/copy-to-clipboard";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

type CodeBlockProps = ComponentProps<"div"> & {
  lang?: string;
  title?: string;
  children: string;
};

const CodeBlock = ({ lang, title, children }: CodeBlockProps) => {
  //
  if (!lang) {
    return <code>{children}</code>;
  }

  return (
    <div className="code-block" data-lang={lang}>
      <CodeBlockHead title={title} content={children} />
      <CodeBlockBody>{children}</CodeBlockBody>
    </div>
  );
};

/* ============================================================================================= */

type CodeBlockHeadProps = ComponentProps<"div"> & {
  title?: string;
  content: string;
};

const CodeBlockHead = ({
  title,
  content,
}: CodeBlockHeadProps): null | ReactElement<HTMLDivElement> => {
  //
  if (!title) {
    return null;
  }

  return (
    <div className="code-block__header">
      {/*  */}
      <span>{title}</span>

      <CopyToClipboard>{content}</CopyToClipboard>
    </div>
  );
};

/* ============================================================================================= */

type CodeBlockBodyProps = ComponentProps<"div">;

const CodeBlockBody = ({ children }: CodeBlockBodyProps): ReactElement<HTMLDivElement> => (
  <div className="code-block__body">
    <pre>
      <code>{children}</code>
    </pre>
  </div>
);

/* ============================================================================================= */

export default CodeBlock;
