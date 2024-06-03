import styled from "@todo/shared";
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalFooter,
  ModalHeader,
} from "@todo/ui";

export const StyledClose = styled(({ ...rest }) => <ModalClose {...rest} />)`
  font-weight: 300;
  font-size: 28px;
  line-height: 0.87;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const StyledModal = styled(({ ...rest }) => <Modal {...rest} />)`
  & .modal-content {
    border-radius: 10px;
  }
`;

export const StyledModalHeader = styled(({ ...rest }) => (
  <ModalHeader {...rest} />
))`
  & .modal-title {
    font-size: 16px;
    margin-top: 0;
  }
`;

export const StyledFooter = styled(({ ...rest }) => <ModalFooter {...rest} />)`
  & .btn-confirm {
    &:focus,
    &:hover {
      background: #0e405f;
      color: white;
    }
  }
`;

export const StyledBody = styled(({ ...rest }) => <ModalBody {...rest} />)`
  display: grid;
  textarea,
  input {
    border-radius: 0.5rem;
    box-sizing: border-box;
  }

  textarea {
    margin-top: 1rem;
    resize: vertical;
    max-height: 160px;
    overflow-y: auto;
  }

  input,
  textarea {
    &.isBlock {
      pointer-events: none;
      background: #bbbbbb;
      opacity: 0.5;
    }
  }
`;

export const StyledWrapColors = styled.div<{
  $color: string;
  $isActive: boolean;
}>`
  margin-top: 1rem;
  display: flex;
  height: 50px;
  gap: 0.2rem;
`;

export const StyledColor = styled.span<{ $color: string; $isActive: boolean }>`
  background: ${({ $color }: any) => $color};
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: ${({ $isActive }: any) => ($isActive ? 0.4 : "none")};
`;
