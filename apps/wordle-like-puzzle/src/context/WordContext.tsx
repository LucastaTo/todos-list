import React, { createContext, useReducer } from "react";

import type {
  IWordContextModel,
  IWordAction,
  IWordState,
} from "@/@types/Words";

const defaultState: IWordState = {
  words: [],
  themes: [],
  selectedTheme: "",
  type: "",
};

const wordReducer = (state: IWordState, action: IWordAction): IWordState => {
  switch (action.type) {
    case "SET_WORDS":
      return {
        ...state,
        words: action.payload as string[],
      };

    case "SET_THEMES":
      return {
        ...state,
        themes: action.payload as string[],
      };

    case "SET_SELECTED_THEME":
      return {
        ...state,
        selectedTheme: action.payload as string,
      };

    case "SET_TYPE":
      return {
        ...state,
        type: action.payload as string,
      };

    default:
      return state;
  }
};

// Create the context
export const WordContext = createContext({} as IWordContextModel);

// Create context provider
export const WordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wordReducer, defaultState);

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  );
};
