import React, { useReducer } from "react";
import {
  IContextModel,
  ICounterAction,
  ICounterState,
} from "src/@types/Author";

const defaultState: ICounterState = {
  authorId: {
    _id: "",
  },
};

const reducer = (
  state: ICounterState,
  action: ICounterAction
): ICounterState => {
  switch (action.type) {
    case "SET_AUTHOR":
      return {
        authorId: action.payload,
      };
    default:
      return state;
  }
};

export const Context = React.createContext({} as IContextModel);

export const Provider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
