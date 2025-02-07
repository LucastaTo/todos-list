import { IWordAction } from "@/@types/Words";

export const setWords = (words: string[]): IWordAction => ({
  type: "SET_WORDS",
  payload: words,
});

export const setThemes = (themes: string[]): IWordAction => ({
  type: "SET_THEMES",
  payload: themes,
});

export const setSelectedTheme = (theme: string): IWordAction => ({
  type: "SET_SELECTED_THEME",
  payload: theme,
});

export const setType = (type: string): IWordAction => ({
  type: "SET_TYPE",
  payload: type,
});
