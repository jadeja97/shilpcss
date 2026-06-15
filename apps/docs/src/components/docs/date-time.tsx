import { cls } from "@jadeja/docs/lib/dom/utils";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

export type DateTimeProps = Omit<ComponentProps<"div">, "children"> & {
  publishedAt: string | undefined;
  lastModifiedAt: string | undefined;
};

const DateTime = ({
  publishedAt,
  lastModifiedAt,
  className,
  ...rest
}: DateTimeProps): ReactElement<HTMLDivElement> => {
  //
  return (
    <div className={cls("date-time", className)} {...rest}>
      <p className="date-time__published">
        <b>Published at</b>: <time dateTime={publishedAt}>{getDateTime(publishedAt)}</time>
      </p>
      <p className="date-time__modified">
        <b>Last updated at</b>: <time dateTime={lastModifiedAt}>{getDateTime(lastModifiedAt)}</time>
      </p>
    </div>
  );
};

/* ============================================================================================= */

const getDateTime = (dateTime?: string) => {
  //
  return new Date(dateTime ?? "").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/* ============================================================================================= */

export default DateTime;
