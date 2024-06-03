import styled, { space, SpaceProps } from "@todo/shared/styled";
import React from "react";

export const StyledGroup = styled(({ mb, mt, ...rest }) => (
  <div {...rest} />
))<SpaceProps>`
  ${space}
`;
