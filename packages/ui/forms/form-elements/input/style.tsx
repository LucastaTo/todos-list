import styled, { SpaceProps, BorderProps } from "@todo/shared/styled";
import { IFeedback, TCustomStyle } from "../types";
import {
  InputStyles,
  SuccessInputStyles,
  WarningInputStyles,
  ErrorInputStyles,
  allowedProps,
} from "../style";

interface IInput extends IFeedback, SpaceProps, BorderProps {
  $width?: string | any[];
  $height?: string | any[];
  $customStyle?: TCustomStyle;
}

export const StyledInput = styled("input").withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => {
    if (defaultValidatorFn && typeof defaultValidatorFn === "function") {
      return ![...allowedProps].includes(prop) && defaultValidatorFn(prop);
    } else {
      return ![...allowedProps].includes(prop);
    }
  },
})<IInput>`
  ${InputStyles};
  ${({ $state, $showState, $showErrorOnly }) =>
    $state === "success" &&
    $showState &&
    !$showErrorOnly &&
    SuccessInputStyles};
  ${({ $state, $showState, $showErrorOnly }) =>
    $state === "warning" &&
    $showState &&
    !$showErrorOnly &&
    WarningInputStyles};
  ${({ $state, $showState, $showErrorOnly }) =>
    $state === "error" && $showState && $showErrorOnly && ErrorInputStyles};
`;
