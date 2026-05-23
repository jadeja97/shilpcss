import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "@icons";

import Button from "@/components/button";
import { cls } from "@/lib/utils";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

// NOTE: not a dom element
export const DialogRoot = Dialog.Root;

/* ============================================================================================= */

// NOTE: not a dom element
export const DialogPortal = Dialog.Portal;

/* ============================================================================================= */

type DialogTriggerProps = Dialog.Trigger.Props;

export const DialogTrigger = ({
  className,
  ...rest
}: DialogTriggerProps): ReactElement<HTMLButtonElement> => (
  <Dialog.Trigger {...rest} className={cls("dialog__trigger", className)} />
);

/* ============================================================================================= */

type DialogCloseProps = Dialog.Close.Props & {
  hideCloseButton?: boolean;
  isWrapper?: boolean;
  hideFocus?: boolean;
};

export const DialogClose = ({
  className,
  hideCloseButton = false,
  isWrapper = false,
  hideFocus = false,
  ...rest
}: DialogCloseProps): null | ReactElement<HTMLButtonElement> => {
  //
  if (hideCloseButton) {
    return null;
  }

  return (
    <Dialog.Close
      {...rest}
      {...(hideFocus ? { tabIndex: -1 } : {})}
      className={cls("dialog__close", { wrapper: isWrapper }, className)}
    />
  );
};

/* ============================================================================================= */

type DialogOverlayProps = Dialog.Backdrop.Props;

export const DialogOverlay = ({
  className,
  ...rest
}: DialogOverlayProps): ReactElement<HTMLDivElement> => (
  <Dialog.Backdrop {...rest} className={cls("dialog__overlay", className)} />
);

/* ============================================================================================= */

type DialogContentProps = Dialog.Popup.Props & {
  portal?: Dialog.Portal.Props;
  hideCloseButton?: boolean;
  overlay?: DialogOverlayProps;
  close?: DialogCloseProps;
};

export const DialogContent = ({
  children,
  portal = {},
  hideCloseButton = true,
  overlay = {},
  close = {},
  className,
  ref,
  ...rest
}: DialogContentProps): ReactElement<HTMLDivElement> => (
  <DialogPortal {...portal}>
    <DialogOverlay {...overlay} />
    <Dialog.Popup {...rest} className={cls("dialog__content", className)} ref={ref}>
      {/*  */}
      {children}

      <DialogClose
        hideCloseButton={hideCloseButton}
        render={<Button variant="ghost" size="icon-sm" />}
        {...close}
      >
        <XIcon />
        <span className="screen-reader">Close</span>
      </DialogClose>
    </Dialog.Popup>
  </DialogPortal>
);

/* ============================================================================================= */

type DialogHeaderProps = ComponentProps<"div">;

export const DialogHeader = ({
  className,
  ...rest
}: DialogHeaderProps): ReactElement<HTMLDivElement> => (
  <div {...rest} className={cls("dialog__header", className)} />
);

/* ============================================================================================= */

type DialogFooterProps = ComponentProps<"div">;

export const DialogFooter = ({
  className,
  ...rest
}: DialogFooterProps): ReactElement<HTMLDivElement> => (
  <div {...rest} className={cls("dialog__footer", className)} />
);

/* ============================================================================================= */

type DialogTitleProps = Dialog.Title.Props;

export const DialogTitle = ({
  className,
  ...rest
}: DialogTitleProps): ReactElement<HTMLHeadingElement> => (
  <Dialog.Title {...rest} className={cls("dialog__title", className)} />
);

/* ============================================================================================= */

type DialogDescriptionProps = Dialog.Description.Props;

export const DialogDescription = ({
  className,
  ...rest
}: DialogDescriptionProps): ReactElement<HTMLParagraphElement> => (
  <Dialog.Description {...rest} className={cls("dialog__description", className)} />
);
