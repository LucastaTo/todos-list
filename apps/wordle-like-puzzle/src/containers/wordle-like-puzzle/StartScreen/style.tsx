import styled from "@todo/shared/styled";
import { Button } from "@todo/ui";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const ModalContent = styled.div``;

export const StyledMenuWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 16px;
  width: 100%;
`;

export const StyledButtonMenu = styled(({ ...rest }) => <Button {...rest} />)`
  background-color: #1976cd;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #0d47a1;
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
  }
`;

export const DifficultyGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const DifficultyButton = styled(({ ...rest }) => <Button {...rest} />)<{
  isSelected: boolean;
}>`
  padding: 10px 20px;
  background-color: ${(props: any) =>
    props.isSelected ? "#4CAF50" : "#f0f0f0"};
  color: ${(props: any) => (props.isSelected ? "white" : "black")};
  font-size: 16px;
  border: 2px solid #ddd;
  display: block;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
    color: #fff;
    border: none;
  }

  &:focus {
    background-color: #45a049;
    border: none;
  }
`;

export const StyledBackButton = styled(({ ...rest }) => <Button {...rest} />)`
  margin-top: 16px;
  margin-left: auto;
  background-color: #f50057; // Secondary color
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #c51162; // Slightly darker secondary color
    transform: translateY(-2px);
  }

  &:active {
    background-color: #880e4f; // Even darker on active
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
  }
`;
