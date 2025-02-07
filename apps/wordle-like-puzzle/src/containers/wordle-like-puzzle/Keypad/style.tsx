import styled from "@todo/shared/styled";
import { Button, Col } from "@todo/ui";

export const StyledCol = styled(({ ...rest }) => <Col {...rest} />)`
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

export const StyledKeypadRow = styled.div`
  gap: 4px;
  display: flex;
  flex-wrap: wrap; /* Ensure buttons wrap in a row on small screens */
  justify-content: center;

  @media (max-width: 600px) {
    gap: 6px;
  }
`;

export const StyledKeypad = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

export const StyledSubmitButton = styled(({ ...rest }) => <Button {...rest} />)`
  padding: 12px;
  font-size: 20px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #2196f3;
    color: white;
    transform: scale(1.1);
  }

  &:focus {
    background-color: #2196f3;
    color: white;
    box-shadow: none;
  }

  &.submit-btn {
    width: auto;
    margin: 0 auto;
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #388e3c;
    }
  }

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 16px;
    width: 40px;
    height: 40px;
  }
`;

export const StyledKeypadButton = styled(({ ...rest }) => <Button {...rest} />)`
  padding: 12px;
  font-size: 20px;
  width: 50px;
  height: 50px;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #c1c1c1;
    color: white;
    transform: scale(1.1);
  }

  &:focus {
    background-color: #2196f3;
    color: white;
    border: none;
    box-shadow: none;
  }

  &.submit-btn {
    width: auto;
    margin: 0 auto;
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #388e3c;
    }
  }

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 16px;
    width: 40px;
    height: 40px;
  }
`;
