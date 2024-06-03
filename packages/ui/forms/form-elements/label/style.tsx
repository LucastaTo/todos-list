/* eslint-disable jsx-a11y/label-has-associated-control */
import styled, {
  SpaceProps,
  TypographyProps,
  LayoutProps,
} from "@todo/shared/styled";
import React from "react";

interface IProps extends SpaceProps, TypographyProps, LayoutProps {}

export const StyledLabel = styled(
  ({ mb, display, fontSize, fontWeight, ...rest }) => <label {...rest} />
)<IProps>`
  ${({ mb, display, fontSize, fontWeight }) => `
    margin-bottom: ${mb || 0};
    display: ${display || `inline-block`};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
  `}
`;
