import { FC } from "react";
import classnames from "classnames";
import { SpaceProps, TypographyProps, LayoutProps } from "@todo/shared/styled";
import { StyledLabel } from "./style";
import React from "react";

interface IProps extends SpaceProps, TypographyProps, LayoutProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: FC<IProps> = ({
  children,
  htmlFor,
  className,
  ...rest
}) => {
  return (
    <StyledLabel
      htmlFor={htmlFor}
      className={classnames(className, "label")}
      {...rest}
    >
      {children}
    </StyledLabel>
  );
};
