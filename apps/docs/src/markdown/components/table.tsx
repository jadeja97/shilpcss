import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

type TableProps = ComponentProps<"table">;

const Table = ({ children, ...rest }: TableProps): ReactElement<HTMLDivElement> => (
  <div className="table">
    <table {...rest}>{children}</table>
  </div>
);

/* ============================================================================================= */

export default Table;
