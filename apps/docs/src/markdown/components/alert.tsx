import {
  CheckSquareIcon,
  JournalTextIcon,
  MegaphoneFillIcon,
  RadioActiveFillIcon,
  TrafficConeFillIcon,
} from "@icons";

import { cls, cva } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactElement } from "react";

import type { SVGEl, SVGProps } from "@/components/svg";

/* ============================================================================================= */

export const variants = cva("alert", {
  variants: {
    //
    variant: {
      success: "alert--success",
      info: "alert--info",
      warning: "alert--warning",
      danger: "alert--danger",
    },

    hasIcon: {
      false: null,
      true: "has-icon",
    },

    defaultVariants: {
      hasIcon: true,
    },
  },
});

/* ============================================================================================= */

type AlertProps = RootProps;

// NOTE: add `has-icon` class. this will help with `:has`.
// `:has` not supported yet in Shilp CSS baseline.
const Alert = ({
  variant,
  hasIcon = true,
  title,
  children,
  ...rest
}: AlertProps): ReactElement<ReturnType<typeof Root>> => (
  <Root {...rest} hasIcon={hasIcon} variant={variant}>
    {/*  */}
    {hasIcon && <Icon variant={variant} />}

    <Title variant={variant}>{title}</Title>

    {children && <Description>{children}</Description>}
  </Root>
);

/* ============================================================================================= */

type RootProps = ComponentProps<"div"> & VariantProps<typeof variants>;

// NOTE: add `has-icon` class. this will help with `:has`.
// `:has` not supported yet in Shilp CSS baseline.
export const Root = ({
  className,
  variant,
  hasIcon,
  ...rest
}: RootProps): ReactElement<HTMLDivElement> => (
  <div {...rest} role="alert" className={cls(variants({ variant, hasIcon }), className)} />
);

/* ============================================================================================= */

type IconProps = ComponentProps<"svg"> & Pick<VariantProps<typeof variants>, "variant">;

const getIcon = <T,>(variant: T): ((props: SVGProps) => SVGEl) => {
  switch (variant) {
    case "info":
      return MegaphoneFillIcon;
    case "warning":
      return TrafficConeFillIcon;
    case "success":
      return CheckSquareIcon;
    case "danger":
      return RadioActiveFillIcon;
    default:
      return JournalTextIcon;
  }
};

export const Icon = ({ variant, ...rest }: IconProps): SVGEl => {
  // oxlint-disable react-hooks-js/static-components
  const Component = getIcon(variant);

  return <Component {...rest} />;
};

/* ============================================================================================= */

type TitleProps = ComponentProps<"div"> & Pick<VariantProps<typeof alert>, "variant">;

export const Title = ({
  children,
  className,
  variant,
  ...rest
}: TitleProps): ReactElement<HTMLDivElement> => (
  <div {...rest} className={cls("alert__title limit-lines", className)}>
    {children ?? variant ?? "Note"}
  </div>
);

/* ============================================================================================= */

type DescriptionProps = ComponentProps<"div">;

export const Description = ({
  className,
  ...rest
}: DescriptionProps): ReactElement<HTMLDivElement> => (
  <div {...rest} className={cls("alert__description", className)} />
);

/* ============================================================================================= */

export default Alert;
