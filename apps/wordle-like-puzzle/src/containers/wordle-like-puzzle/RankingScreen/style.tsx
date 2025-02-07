import styled from "@todo/shared/styled";
import { Button } from "@todo/ui";

interface TabButtonProps {
  isActive: boolean;
}

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const TabButton = styled(({ ...rest }) => (
  <Button {...rest} />
))<TabButtonProps>`
  background-color: transparent;
  color: ${({ isActive }: TabButtonProps) =>
    isActive ? "#1890ff" : "#888"}; // Active tab in blue, inactive in grey
  font-size: 16px;
  font-weight: ${({ isActive }: TabButtonProps) =>
    isActive ? "600" : "400"}; // Active tab has bolder text
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: ${({ isActive }: TabButtonProps) =>
    isActive ? "2px solid #1890ff" : "none"}; // Blue underline for active tab

  &:active,
  &:hover {
    color: #1890ff;
    background-color: rgba(24, 144, 255, 0.1); // Light blue background on hover
  }

  &:active,
  &:focus {
    outline: none;
    background-color: rgba(24, 144, 255, 0.1); // Light blue background on hover
    box-shadow: none;
  }
`;

export const TabContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
`;

export const TabContent = styled.div`
  text-align: center;
  h2 {
    margin-bottom: 10px;
    font-size: 24px;
  }
  p {
    font-size: 18px;
    color: #666;
  }
`;

export const StyledLoading = styled.div`
  & .loading {
    justify-content: center;
  }
`;

export const StyledRankItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StyledUserName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

export const StyledScore = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1976cd;
`;

export const StyledNoRankingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #888;
  font-style: italic;
`;
