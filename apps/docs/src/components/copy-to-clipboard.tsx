"use client";

/* ============================================================================================= */

import { CheckIcon, CopyIcon } from "@icons";
import { debounce } from "@jadeja/ts/lib";
import { useState } from "react";

import Button from "@/components/button";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

type CopyToClipboardProps = ComponentProps<"button">;

const CopyToClipboard = ({
  children,
}: CopyToClipboardProps): null | ReactElement<HTMLButtonElement> => {
  //
  const [copied, setCopied] = useState<boolean | Promise<boolean>>(false);

  if (!children) {
    return null;
  }

  // handle copy (including avoiding rage clicks)
  const handleCopy = () => {
    //
    setCopied(async (prev) => {
      //
      if (!prev) {
        //
        await navigator.clipboard.writeText(children as string);

        return true;
      }

      return prev;
    });

    // delay the reset
    debounce(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={handleCopy}
      title={copied ? undefined : "copy to clipboard"}
      className="copy-to-clipboard"
      data-copied={copied ? true : undefined}
    >
      {/*  */}
      {copied ? <CheckIcon /> : <CopyIcon />}

      <span className="screen-reader">{copied ? "copied" : "copy"} to clipboard</span>
    </Button>
  );
};

/* ============================================================================================= */

export default CopyToClipboard;
