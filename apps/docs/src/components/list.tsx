import { useId } from "react";

import type { OlHTMLAttributes, HTMLAttributes, ReactElement } from "react";

/* ============================================================================================= */

interface SharedProps {
  unstyled?: boolean;
  caption?: string;
}

type ULProps = SharedProps &
  HTMLAttributes<HTMLUListElement> & {
    ordered?: false;
  };

export type OLProps = SharedProps &
  OlHTMLAttributes<HTMLOListElement> & {
    ordered: true;
  };

export type ListProps = OLProps | ULProps;

const List = ({
  ordered = false,
  unstyled = false,
  caption,
  ...rest
}: ListProps):
  | ReactElement<HTMLUListElement>
  | ReactElement<HTMLOListElement>
  | ReactElement<HTMLDivElement> => {
  //
  const Component = ordered ? "ol" : "ul";
  const unstyledProps = unstyled ? { role: "list" as const, "data-unstyled": true as const } : {};

  if (caption) {
    return (
      <ListWithCaption
        unstyledProps={unstyledProps}
        {...rest}
        caption={caption}
        component={Component}
      />
    );
  }

  return <Component {...unstyledProps} {...rest} />;
};

/* ============================================================================================= */

interface SharedPropsForCaptionList {
  caption: string;
  unstyledProps: Partial<{
    role: "list";
    "data-unstyled": true;
  }>;
}

type OrderedProps = SharedPropsForCaptionList &
  OlHTMLAttributes<HTMLOListElement> & {
    component: "ol";
  };

type UnorderedProps = SharedPropsForCaptionList &
  HTMLAttributes<HTMLUListElement> & {
    component: "ul";
  };

type ListWithCaptionProps = OrderedProps | UnorderedProps;

const ListWithCaption = ({
  component: Component,
  caption,
  unstyledProps,
  ...rest
}: ListWithCaptionProps) => {
  //
  const uid = useId();

  return (
    <div className="list">
      <p id={uid} className="list__caption">
        {caption}
      </p>
      <Component {...unstyledProps} {...rest} aria-labelledby={uid} />
    </div>
  );
};

/* ============================================================================================= */

export default List;
