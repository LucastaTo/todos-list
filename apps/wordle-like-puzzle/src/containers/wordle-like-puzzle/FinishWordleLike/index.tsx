import { FC, useState } from "react";
import {
  StyledButton,
  Message,
  NameInput,
  PopupContainer,
  PopupContent,
} from "./style";
import { useToast } from "@/components/custom-toastify/ToastProvider";

type FinishWordleLikeProps = {
  message: string;
  onSaveScore: (name: string) => void;
  onClose: () => void;
};

const FinishWordleLike: FC<FinishWordleLikeProps> = ({
  message,
  onSaveScore,
  onClose,
}) => {
  const { showToast } = useToast();
  const [playerName, setPlayerName] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName);
      onClose();
    } else {
      showToast("Please enter a valid name!", "error");
    }
  };

  return (
    <PopupContainer>
      <PopupContent>
        <Message>{message}</Message>
        <NameInput
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={handleNameChange}
        />
        <StyledButton onClick={handleSave}>Save Score</StyledButton>
      </PopupContent>
    </PopupContainer>
  );
};

export default FinishWordleLike;
