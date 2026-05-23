import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { cls } from "@/lib/utils";

import type { ReactElement } from "react";

/* ============================================================================================= */

type SeparatorProps = BaseSeparator.Props & {
  vertical?: boolean;
};

const Separator = ({
  className,
  vertical = false,
  ...rest
}: SeparatorProps): ReactElement<HTMLDivElement> => (
  <BaseSeparator
    {...rest}
    orientation={vertical ? "vertical" : "horizontal"}
    className={cls("separator", className)}
  />
);

/* ============================================================================================= */

export default Separator;
