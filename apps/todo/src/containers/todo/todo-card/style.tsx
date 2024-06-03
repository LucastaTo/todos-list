import styled from "@todo/shared/styled";
import { Button, Card, CardBody, CardTitle } from "@todo/ui";

export const StyledWrapTodoCard = styled((rest: any) => <Card {...rest} />)<{
  $color: string;
  $status: "pending" | "completed";
}>`
  position: relative;
  width: 100%;
  z-index: 1;
  max-height: 250px;
  min-height: 250px;
  border-radius: 8px;
  opacity: ${(props: any) => (props.$status === "pending" ? 0.3 : 1)};
  background: ${(props: any) => props.$color};
  border: 1px solid transparent;
  cursor: pointer;
  & .completed-button,
  & .delete-button {
    background: transparent;
    border: none;
    &:focus {
      border: none;
    }
  }
  &:hover {
    opacity: 1;
  }
`;

export const StyleWrapperButton = styled.div`
  opacity: 1;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 2;
  background: rgba(255, 255, 255, 0);
`;

export const StyledButon = styled(({ ...rest }) => <Button {...rest} />)``;

export const StyledTodoCardTitle = styled((rest: any) => (
  <CardTitle {...rest} />
))`
  margin: 0.5rem 1.5rem;
  max-height: 80px;
`;

export const StyledTodoCardBody = styled(({ ...rest }) => (
  <CardBody {...rest} />
))`
  padding: 0.5rem 1.5rem;
  max-height: 150px;
`;
