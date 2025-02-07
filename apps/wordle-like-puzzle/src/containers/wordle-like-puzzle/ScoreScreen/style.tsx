import styled from "@todo/shared/styled";
import { Col, Row } from "@todo/ui";

export const StyledGameBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  background-color: #282c34; // Dark background for contrast
  padding: 20px;
  border-radius: 10px;
`;

export const StyledRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const StyledCell = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  border: 2px solid #ccc;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: ${(props: any) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
  &:focus {
  &:hover {
    color: rgb(71, 196, 228);
    background-color: ${(props: any) =>
      props.disabled ? "#e0e0e0" : "#b0b0b0"}; // Slight hover effect
    transform: ${(props: any) =>
      props.disabled ? "none" : "scale(1.05)"}; // Slight zoom effect on hover

  }

  ${(props: any) =>
    props.result === "correct"
      ? `background-color: #4caf50; color: white;` // Green for correct
      : props.result === "present"
        ? `background-color: #ff9800; color: white;` // Yellow for present
        : props.result === "absent"
          ? `background-color: #f44336; color: white;` // Red for absent
          : ""}
`;

export const StyledWrapperRow = styled(({ ...rest }) => <Row {...rest} />)`
  flex: 1;
  margin-top: 16px;
`;

export const StyledCol = styled(({ ...rest }) => <Col {...rest} />)`
  display: flex;
  justify-content: center;
`;

export const StyledMessage = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #4caf50; // Green color for success messages
  text-align: center;
`;
