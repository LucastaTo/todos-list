import { FC } from "react";
import { SpaceProps } from "@todo/shared/styled";
import classnames from "classnames";
import { StyledGroup } from "./style";
import React from "react";

interface IProps extends SpaceProps {
  className?: string;
  children: React.ReactNode;
}

export const FormGroup: FC<IProps> = ({ children, className, ...rest }) => {
  return (
    <StyledGroup className={classnames(className, "form-group")} {...rest}>
      {children}
    </StyledGroup>
  );
};
