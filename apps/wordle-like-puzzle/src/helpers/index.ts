import { WORD_RESULTS, type WordResultType } from "@/@types/Words";

export const formatTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const generateColor = (result: WordResultType) => {
  switch (result) {
    case WORD_RESULTS.ABSENT:
      return "#d32f2f";
    case WORD_RESULTS.PRESENT:
      return "#fbc02d";
    case WORD_RESULTS.CORRECT:
      return "#388e3c";
    default:
      return "#9e9e9e";
  }
};

export const formatCountTime = (seconds: number, milliseconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  const ms = milliseconds.toString().padStart(3, "0");
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")},${ms}`;
};
