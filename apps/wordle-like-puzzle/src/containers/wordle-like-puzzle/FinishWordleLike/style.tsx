import styled from "@todo/shared/styled";
import { Button, Input } from "@todo/ui";

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
`;

export const Message = styled.h2`
  margin-bottom: 10px;
`;

export const NameInput = styled(
  ({ id, name, ...rest }: { id: string; name: string }) => (
    <Input id={id} name={name} {...rest} />
  )
)`
  padding: 10px;
  width: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledButton = styled(({ ...rest }) => <Button {...rest} />)`
  padding: 10px;
  width: 100%;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: #45a049;
  }
`;
