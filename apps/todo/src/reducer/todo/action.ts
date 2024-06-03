import { ICounterAction, ITodoItem } from "src/@types/Todo";

export const setTodosList = (todos: ITodoItem[]): ICounterAction => ({
  type: "SET_TODOS_LIST",
  payload: todos, // Payload is an object with cb property
});

export const addTodo = (todo: ITodoItem): ICounterAction => ({
  type: "ADD_TODO",
  payload: todo,
});

export const updateTodo = (todo: ITodoItem): ICounterAction => ({
  type: "UPDATE_TODO",
  payload: todo,
});

export const deleteTodo = (id: string): ICounterAction => ({
  type: "DELETE_TODO",
  payload: id,
});
