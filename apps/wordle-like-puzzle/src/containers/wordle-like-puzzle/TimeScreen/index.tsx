import React, { FC, useState, useEffect, useCallback } from "react";

import {
  StyledGameBoard,
  StyledRow,
  StyledCell,
  StyledWrapperRow,
  StyledCol,
} from "./style";

import axios from "axios";

import apiUrl, { wordleVoteeApiUrl } from "@/config";
import { useToast } from "@/components/custom-toastify/ToastProvider";

import { WORD_RESULTS, type WordResultType } from "@/@types/Words";

import FinishWordleLike from "../FinishWordleLike";
import Keypad from "../Keypad";
import { formatCountTime, generateColor } from "@/helpers";

const TimeScreen: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { showToast } = useToast();

  const [guesses, setGuesses] = useState<string[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [timer, setTimer] = useState<{ seconds: number; milliseconds: number }>(
    {
      seconds: 0,
      milliseconds: 0,
    }
  );
  const [wordLength, setWordLength] = useState<number>(0);
  const [results, setResults] = useState<WordResultType[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const intervalIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleClearStorage = useCallback(() => {
    setSelectedCell(null);
    setTimer({
      seconds: 0,
      milliseconds: 0,
    });
    setGuesses([]);
    localStorage.clear();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const confirmationMessage =
        "Are you sure you want to reload? Your progress will be lost.";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleClearStorage);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleClearStorage);
    };
  }, [handleClearStorage]);

  useEffect(() => {
    const savedTimer = localStorage.getItem("timer");
    if (savedTimer) {
      const parsedTimer = JSON.parse(savedTimer);
      setTimer(parsedTimer);
    }

    setTimeout(() => {
      const randomLength = Math.floor(Math.random() * 4) + 4;
      setWordLength(randomLength);
    }, 500);

    intervalIdRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        const newMilliseconds = prevTimer.milliseconds + 1;
        const newSeconds =
          newMilliseconds >= 1000 ? prevTimer.seconds + 1 : prevTimer.seconds;
        const newTimer = {
          seconds: newSeconds,
          milliseconds: newMilliseconds >= 1000 ? 0 : newMilliseconds,
        };
        localStorage.setItem("timer", JSON.stringify(newTimer));
        return newTimer;
      });
    }, 1);

    setSelectedCell(0);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const handleKeyPress = (letter: string) => {
    const newGuesses = [...guesses];
    if (selectedCell !== null && selectedCell !== -1) {
      newGuesses[selectedCell] = letter;
      setGuesses(newGuesses);
      localStorage.setItem("guesses", JSON.stringify(newGuesses));
    }

    setSelectedCell((prevCell) =>
      prevCell !== null && prevCell + 1 < wordLength ? prevCell + 1 : prevCell
    );
  };

  const handleGuessSubmit = async () => {
    const guess = guesses.join("");

    if (guess.length === wordLength) {
      try {
        const response = await axios.get(
          `${wordleVoteeApiUrl}/daily?guess=${guess}&size=${wordLength}`
        );
        const result: WordResultType[] = response.data.map(
          (wlp: { result: WordResultType }) => wlp.result
        );

        setResults(result);

        if (result.every((r) => r === WORD_RESULTS.CORRECT)) {
          showToast("Successfully guessed all letters!", "success");
          setIsPopupVisible(true);
          setGuesses([]);
          setSelectedCell(null);
          setResults([]);
          localStorage.removeItem("timer");

          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
          return;
        }
      } catch (error) {
        showToast("Error checking guess", "error");
      }
    } else {
      showToast("Please complete the guess before submitting.", "error");
    }
  };

  const handleSaveScore = async (name: string) => {
    const timeInMilliseconds = timer.seconds * 1000 + timer.milliseconds;
    const scorePayload = {
      authorName: name,
      type: "time",
      time: timeInMilliseconds,
    };

    try {
      await axios.post(`${apiUrl}/scores`, scorePayload);
      onClose(); // Only close after saving the score
    } catch (error) {
      showToast("Error saving score", "error");
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <StyledWrapperRow gutters={8}>
        {wordLength > 0 && (
          <>
            <StyledCol sm={12}>
              <p className="time">
                {formatCountTime(timer.seconds, timer.milliseconds)}
              </p>
            </StyledCol>
            <StyledCol sm={12}>
              <StyledGameBoard>
                <StyledRow>
                  {Array.from({ length: wordLength }).map((_, colIndex) => (
                    <StyledCell
                      key={colIndex}
                      onClick={() => setSelectedCell(colIndex)}
                      style={{
                        border:
                          selectedCell === colIndex
                            ? "2px solid #2196f3"
                            : "none",
                        backgroundColor:
                          results.length > 0
                            ? generateColor(results[colIndex])
                            : "",
                      }}
                    >
                      {guesses[colIndex] || ""}
                    </StyledCell>
                  ))}
                </StyledRow>
              </StyledGameBoard>
            </StyledCol>
          </>
        )}
        <Keypad onGuess={handleGuessSubmit} onKeyPress={handleKeyPress} />
      </StyledWrapperRow>

      {isPopupVisible && (
        <FinishWordleLike
          message="Congratulations, you've guessed the word!"
          onSaveScore={handleSaveScore}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default TimeScreen;
