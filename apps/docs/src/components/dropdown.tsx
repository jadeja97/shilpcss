import { Menu } from "@base-ui/react/menu";

import { CheckIcon, ChevronRightIcon, CircleIcon } from "@/components/assets/icons";
import { cls } from "@/lib/utils";

import type { ComponentProps, ReactElement } from "react";

/* ============================================================================================= */

// NOTE: not a dom element
export const DropdownRoot = Menu.Root;

/* ============================================================================================= */

// NOTE: not a dom element
export const DropdownPortal = Menu.Portal;
/* ============================================================================================= */

// NOTE: not a dom element
export const DropdownSub = Menu.SubmenuRoot;

/* ============================================================================================= */

type DropdownTriggerProps = Menu.Trigger.Props;

export const DropdownTrigger = ({
  className,
  ...rest
}: DropdownTriggerProps): ReactElement<HTMLButtonElement> => (
  <Menu.Trigger {...rest} className={cls("dropdown__trigger", className)} />
);

/* ============================================================================================= */

type DropdownContentProps = Menu.Popup.Props & {
  portal?: Menu.Portal.Props;
  positioner?: Menu.Positioner.Props;
  align?: Menu.Positioner.Props["align"];
  alignOffset?: Menu.Positioner.Props["alignOffset"];
  side?: Menu.Positioner.Props["side"];
  sideOffset?: Menu.Positioner.Props["sideOffset"];
  inset?: boolean;
};

export const DropdownContent = ({
  portal = {},
  positioner = {},
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ref,
  ...rest
}: DropdownContentProps): ReactElement<HTMLDivElement> => (
  <DropdownPortal {...portal}>
    <Menu.Positioner
      {...positioner}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cls("dropdown__content-positioner", positioner.className)}
    >
      <Menu.Popup {...rest} className={cls("dropdown__content", className)} ref={ref} />
    </Menu.Positioner>
  </DropdownPortal>
);

/* ============================================================================================= */

type DropdownGroupProps = Menu.Group.Props;

export const DropdownGroup = ({
  className,
  ...rest
}: DropdownGroupProps): ReactElement<HTMLDivElement> => (
  <Menu.Group {...rest} className={cls("dropdown__group", className)} />
);

/* ============================================================================================= */

type DropdownItemProps = Menu.Item.Props & { inset?: boolean };

export const DropdownItem = ({
  className,
  inset = false,
  ...rest
}: DropdownItemProps): ReactElement<HTMLDivElement> => (
  <Menu.Item {...rest} className={cls("dropdown__item", { inset }, className)} />
);

/* ============================================================================================= */

type DropdownCheckboxItemProps = Menu.CheckboxItem.Props;

export const DropdownCheckboxItem = ({
  children,
  className,
  ...rest
}: DropdownCheckboxItemProps): ReactElement<HTMLDivElement> => (
  <Menu.CheckboxItem {...rest} className={cls("dropdown__checkbox-item", className)}>
    <span className="dropdown__checkbox-item-wrapper">
      <Menu.CheckboxItemIndicator>
        <CheckIcon />
      </Menu.CheckboxItemIndicator>
    </span>

    {children}
    {/*  */}
  </Menu.CheckboxItem>
);

/* ============================================================================================= */

type DropdownRadioGroupProps = Menu.RadioGroup.Props;

export const DropdownRadioGroup = ({
  className,
  ...rest
}: DropdownRadioGroupProps): ReactElement<HTMLDivElement> => (
  <Menu.RadioGroup {...rest} className={cls("dropdown__radio-group", className)} />
);

/* ============================================================================================= */

type DropdownRadioItemProps = Menu.RadioItem.Props;

export const DropdownRadioItem = ({
  children,
  className,
  ...rest
}: DropdownRadioItemProps): ReactElement<HTMLDivElement> => (
  <Menu.RadioItem {...rest} className={cls("dropdown__radio-item", className)}>
    <span className="dropdown__radio-item-wrapper">
      <Menu.RadioItemIndicator>
        <CircleIcon />
      </Menu.RadioItemIndicator>
    </span>

    {children}
    {/*  */}
  </Menu.RadioItem>
);

/* ============================================================================================= */

type DropdownLabelProps = Menu.GroupLabel.Props & { inset?: boolean };

export const DropdownLabel = ({
  className,
  inset = false,
  ...rest
}: DropdownLabelProps): ReactElement<HTMLDivElement> => (
  <Menu.GroupLabel {...rest} className={cls("dropdown__label", { inset }, className)} />
);

/* ============================================================================================= */

type DropdownSeparatorProps = Menu.Separator.Props;

export const DropdownSeparator = ({
  className,
  ...rest
}: DropdownSeparatorProps): ReactElement<HTMLDivElement> => (
  <Menu.Separator {...rest} className={cls("dropdown__separator", className)} />
);

/* ============================================================================================= */

type DropdownShortcutProps = ComponentProps<"kbd">;

export const DropdownShortcut = ({
  className,
  ...rest
}: DropdownShortcutProps): ReactElement<HTMLElement> => (
  <kbd {...rest} className={cls("dropdown__shortcut", className)} />
);

/* ============================================================================================= */

type DropdownSubTriggerProps = Menu.SubmenuTrigger.Props & { inset?: boolean };

export const DropdownSubTrigger = ({
  children,
  className,
  inset,
  ...rest
}: DropdownSubTriggerProps): ReactElement<HTMLDivElement> | ReactElement<HTMLButtonElement> => (
  <Menu.SubmenuTrigger {...rest} className={cls("dropdown__sub-trigger", { inset }, className)}>
    {children}

    <ChevronRightIcon />
  </Menu.SubmenuTrigger>
);

/* ============================================================================================= */

type DropdownSubContentProps = DropdownContentProps;

export const DropdownSubContent = ({
  className,
  inset,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  ...rest
}: DropdownSubContentProps): ReactElement<HTMLDivElement> => (
  <DropdownContent
    {...rest}
    align={align}
    alignOffset={alignOffset}
    side={side}
    sideOffset={sideOffset}
    inset={inset}
    className={cls("dropdown__sub-content", className)}
  />
);
