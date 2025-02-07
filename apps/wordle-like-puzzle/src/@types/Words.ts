export interface IWordItem {
  _id?: string;
  theme: string;
  difficulty: "easy" | "medium" | "hard"; // easy (3-4 char) - medium (5-6 char) - hard (7 char)
  word: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWordItem {
  word: string;
  theme: string;
}

export interface IWordState {
  words: string[];
  themes: string[];
  selectedTheme: string;
  type: string;
}

export interface IWordAction {
  type: "SET_WORDS" | "SET_THEMES" | "SET_SELECTED_THEME" | "SET_TYPE";
  payload: string[] | string;
}

export interface IWordContextModel {
  state: IWordState;
  dispatch: React.Dispatch<IWordAction>;
}

export enum WORD_RESULTS {
  ABSENT = "absent",
  PRESENT = "present",
  CORRECT = "correct",
}
export type WordResultType = "absent" | "present" | "correct";

export type HistoryWordState = {
  slot: number;
  result: WordResultType;
  guess: string;
};

export type DifficultyType = "easy" | "medium" | "hard";
