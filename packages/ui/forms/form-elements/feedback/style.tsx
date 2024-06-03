import styled, { themeGet, css } from "@todo/shared/styled";
import { IFeedback } from "../types";

export const StyledFeedback = styled.div<IFeedback>`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: red;
  ${({ $state, $showErrorOnly }: any) =>
    $state !== "error" &&
    $showErrorOnly &&
    css`
      display: none;
    `}
  ${({ $state, $showState, $showErrorOnly }: any) =>
    $state === "success" &&
    $showState &&
    !$showErrorOnly &&
    css`
      color: ${themeGet("colors.success")};
    `};
  ${({ $state, $showState, $showErrorOnly }: any) =>
    $state === "warning" &&
    $showState &&
    !$showErrorOnly &&
    css`
      color: ${themeGet("colors.warning")};
    `};

  ${({ $state, $showState, $showErrorOnly }: any) =>
    $state === "error" &&
    $showState &&
    $showErrorOnly &&
    css`
      color: ${themeGet("colors.danger")};
    `};
`;
