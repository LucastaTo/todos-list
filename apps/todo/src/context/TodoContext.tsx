// TodoContext.tsx

import React, { createContext, useReducer } from "react";
import { IContextModel, ICounterAction, ICounterState } from "src/@types/Todo";

// Define your initial state
const defaultState: ICounterState = {
  todos: [],
};

// Define your reducer function
const reducer = (
  state: ICounterState,
  action: ICounterAction
): ICounterState => {
  switch (action.type) {
    case "SET_TODOS_LIST":
      return {
        ...state,
        todos: action.payload,
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

// Create context
export const TodoContext = createContext({} as IContextModel);

// Create context provider
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
