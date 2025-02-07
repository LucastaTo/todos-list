// React Imports
import React from "react";

// Style Imports
import {
  DifficultyButton,
  DifficultyGrid,
  ModalContent,
  ModalWrapper,
  StyledBackButton,
  StyledButtonMenu,
  StyledMenuWrapper,
} from "./style";

// Component Imports
import RankingScreen from "../RankingScreen";

// Component Imports
import axios from "axios";

// Component Imports
import apiUrl from "@/config";
import type { DifficultyType, IWordItem } from "@/@types/Words";

// Component Imports
import { WordContext } from "@/context/WordContext";
import { setThemes, setWords } from "@/reducer/word/action";
import { useToast } from "@/components/custom-toastify/ToastProvider";

const DifficultySelection: React.FC<{
  onSelect: (level: DifficultyType) => void;
}> = ({ onSelect }) => (
  <DifficultyGrid>
    {[
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
    ].map((level) => (
      <DifficultyButton
        key={level}
        onClick={() => onSelect(level.value as DifficultyType)}
      >
        {level.label.toUpperCase()}
      </DifficultyButton>
    ))}
  </DifficultyGrid>
);

const ThemesSelection: React.FC<{
  themes: string[];
  onSelect: (theme: string) => void;
}> = ({ themes, onSelect }) => (
  <DifficultyGrid>
    {themes.map((th) => (
      <DifficultyButton key={th} onClick={() => onSelect(th)}>
        {th.toUpperCase()}
      </DifficultyButton>
    ))}
  </DifficultyGrid>
);

const StartScreen: React.FC<{ onStartGame: () => void }> = ({
  onStartGame,
}) => {
  const { showToast } = useToast();
  const { state, dispatch } = React.useContext(WordContext);
  const [step, setStep] = React.useState<"menu" | "mode" | "ranking">("menu");
  const [difficulty, setDifficulty] = React.useState<string | null>(null);
  const [listWords, setListWords] = React.useState<IWordItem[]>([]);

  const handleChangeMode = (mode: "score" | "time") => {
    dispatch({ type: "SET_TYPE", payload: mode });
    mode === "score" ? setStep("mode") : onStartGame();
  };

  const handleNext = async (diff: DifficultyType) => {
    setDifficulty(diff);

    try {
      const response = await axios
        .get(`${apiUrl}/words/${diff}`)
        .then((response) => response.data)
        .catch((error) => showToast(error, "error"));

      setListWords(response.words);

      const themeList = [
        ...new Set(response.words.map((w: IWordItem) => w.theme)),
      ];

      dispatch(setThemes(themeList as string[]));
    } catch (error) {
      showToast(`Error fetching word: ${error}`, "error");
    }
  };

  const handleStartGame = (topic: string) => {
    const wordList = listWords
      .filter((y) => y.theme === topic)
      .map((w: IWordItem) => w.word);
    dispatch(setWords(wordList));

    onStartGame();
  };

  return (
    <>
      <ModalWrapper>
        <ModalContent>
          <h2>Wordle-like Game</h2>
          {step === "menu" && (
            <StyledMenuWrapper>
              <StyledButtonMenu onClick={() => handleChangeMode("score")}>
                Score Mode
              </StyledButtonMenu>
              <StyledButtonMenu onClick={() => handleChangeMode("time")}>
                Timer Mode
              </StyledButtonMenu>
              <StyledButtonMenu onClick={() => setStep("ranking")}>
                Rankings
              </StyledButtonMenu>
            </StyledMenuWrapper>
          )}

          {step === "mode" &&
            (!difficulty ? (
              <DifficultySelection onSelect={handleNext} />
            ) : (
              <ThemesSelection
                themes={state.themes}
                onSelect={handleStartGame}
              />
            ))}

          {step === "ranking" && <RankingScreen />}

          {step !== "menu" && (
            <div
              style={{
                display: "flex",
              }}
            >
              <StyledBackButton
                onClick={() => {
                  setDifficulty(null);
                  setStep("menu");
                }}
              >
                Back
              </StyledBackButton>
            </div>
          )}
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default StartScreen;
