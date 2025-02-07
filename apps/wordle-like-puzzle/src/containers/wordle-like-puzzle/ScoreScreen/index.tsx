import {
  FC,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";

import classNames from "classnames";
import axios from "axios";

import {
  StyledGameBoard,
  StyledRow,
  StyledCell,
  StyledWrapperRow,
  StyledCol,
} from "./style";

import { useToast } from "@/components/custom-toastify/ToastProvider";
import { WordContext } from "@/context/WordContext";
import apiUrl, { wordleVoteeApiUrl } from "@/config";

import { ProgressBar } from "@todo/ui";

import {
  type HistoryWordState,
  WORD_RESULTS,
  type WordResultType,
} from "@/@types/Words";

import Keypad from "../Keypad";
import FinishWordleLike from "../FinishWordleLike";
import { generateColor } from "@/helpers";

const ScoreScreen: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state } = useContext(WordContext);
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [historyWord, setHistoryWord] = useState<string[][] | null>(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [correctWord, setCorrectWord] = useState("");
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(600);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const { showToast } = useToast();

  const handleClearStorage = useCallback(() => {
    setCurrentRow(0);
    setHistoryWord(null);
    setGuesses([]);
    localStorage.clear();
  }, []);

  const fetchWord = useCallback(async () => {
    try {
      const randomIndex = Math.floor(Math.random() * state.words.length);
      const word = state.words[randomIndex].toUpperCase();
      setCorrectWord(word);
      setSelectedCell({ row: 0, col: 0 });
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  }, [state.words]);

  useEffect(() => {
    if (state.words.length > 0) {
      fetchWord();
    }
  }, [fetchWord, state.words]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (currentRow < 5) {
        setPopupMessage("You have failed to guess the word!");
        setIsFailed(true);
        setIsPopupVisible(true);
      }
      return;
    }

    intervalIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
          return 0;
        }
        return prevTime - 1;
      });

      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
          return 0;
        }
        return prevProgress - 100 / 600;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [timeLeft, currentRow]);

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

  const handleKeyPress = (letter: string) => {
    if (currentRow < 5) {
      const newGuesses = [...guesses];
      if (!newGuesses[currentRow]) {
        newGuesses[currentRow] = Array(correctWord.length).fill("");
      }

      const currentGuess = [...newGuesses[currentRow]];
      if (selectedCell?.col !== undefined) {
        currentGuess[selectedCell.col] = letter;
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);
        localStorage.setItem("guesses", JSON.stringify(newGuesses));
      }

      if (selectedCell) {
        setSelectedCell({
          ...selectedCell,
          col:
            selectedCell.col + 1 === correctWord.length
              ? selectedCell.col
              : selectedCell.col + 1,
        });
      }
    }
  };

  const handleGuessSubmit = () => {
    if (currentRow < 5) {
      const guess = guesses[currentRow].join("");
      if (guess.length === correctWord.length) {
        checkGuess(guess);
        setCurrentRow((prevRow) => prevRow + 1);
        setSelectedCell({ row: currentRow + 1, col: 0 });
      } else {
        showToast("Please complete the guess before submitting.", "error");
      }
    }
  };

  const checkGuess = async (guess: string) => {
    try {
      const response = await axios.get(
        `${wordleVoteeApiUrl}/word/${correctWord}?guess=${guess}`
      );
      const result: WordResultType[] = response.data.map(
        (wlp: HistoryWordState) => wlp.result
      );
      setHistoryWord((prevHistory) => {
        const updatedHistory = prevHistory ? [...prevHistory] : [];
        updatedHistory[currentRow] = result;
        return updatedHistory;
      });

      if (result.every((r) => r === WORD_RESULTS.CORRECT)) {
        setSelectedCell(null);
        setPopupMessage("Congratulations, you've guessed the word!");
        setIsFailed(false);
        setIsPopupVisible(true);

        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      }
    } catch (error) {
      showToast("Error checking guess", "error");
    }
  };

  const calculateScore = (timeLeft: number, currentRow: number) => {
    const timeBasedScore = (timeLeft / 600) * 80;
    const rowBasedScore = Math.max(0, 20 - currentRow);
    const totalScore = (timeBasedScore + rowBasedScore).toFixed(1);
    return totalScore;
  };

  const generateProgressColor = (progress: number) => {
    if (progress > 50) return "green";
    if (progress > 35) return "yellow";
    return "red";
  };

  const formattedTimeLeft = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (isPopupVisible && isFailed) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isPopupVisible, isFailed, onClose]);

  const handleSaveScore = async (name: string) => {
    const score = calculateScore(timeLeft, currentRow);
    const scorePayload = {
      authorName: name,
      type: "score",
      score: score,
    };

    try {
      await axios.post(`${apiUrl}/scores`, scorePayload);
      onClose();
    } catch (error) {
      showToast("Error saving score", "error");
    }
  };

  return (
    <>
      {isPopupVisible && (
        <div className="popup">
          {isFailed ? (
            <div>
              <p>{popupMessage}</p>
              <button onClick={onClose}>Redirect</button>
            </div>
          ) : (
            <FinishWordleLike
              message={popupMessage || ""}
              onSaveScore={handleSaveScore}
              onClose={onClose}
            />
          )}
        </div>
      )}
      <p style={{ textAlign: "center", fontSize: "20px" }}>
        {formattedTimeLeft}
      </p>
      <ProgressBar
        percent={progress}
        status={
          progress > 50 ? "active" : progress <= 15 ? "exception" : "normal"
        }
        strokeColor={generateProgressColor(progress)}
        strokeWidth={10}
        showInfo={true}
        type="line"
        format={() => `${Math.floor(timeLeft / 60)} min`}
      />

      <StyledWrapperRow gutters={8}>
        <StyledCol sm={12}>
          <StyledGameBoard>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <StyledRow key={rowIndex}>
                {Array.from({ length: correctWord.length }).map(
                  (_, colIndex) => (
                    <StyledCell
                      key={colIndex}
                      onClick={() =>
                        rowIndex === currentRow &&
                        setSelectedCell({ row: rowIndex, col: colIndex })
                      }
                      style={{
                        border:
                          selectedCell?.row === rowIndex &&
                          selectedCell?.col === colIndex
                            ? "2px solid #2196f3"
                            : "none",
                        backgroundColor: historyWord
                          ? generateColor(
                              historyWord[rowIndex]?.[
                                colIndex
                              ] as WordResultType
                            )
                          : "#e0e0e0",
                        color: historyWord ? "#fff" : "rgb(51, 51, 51)",
                      }}
                      className={classNames({
                        disabled: rowIndex > currentRow,
                      })}
                      disabled={rowIndex !== currentRow}
                    >
                      {guesses[rowIndex]?.[colIndex] || ""}
                    </StyledCell>
                  )
                )}
              </StyledRow>
            ))}
          </StyledGameBoard>
        </StyledCol>

        <Keypad onGuess={handleGuessSubmit} onKeyPress={handleKeyPress} />
      </StyledWrapperRow>
    </>
  );
};

export default ScoreScreen;
