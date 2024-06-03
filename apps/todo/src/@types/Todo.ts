import { IAuthorId } from "./Author";

// Todo interface
export interface ITodoItem {
  _id?: string;
  title: string;
  desc: string;
  color: string;
  dueDate?: Date;
  isBlockedBy?: string | null;
  status: "pending" | "completed";
  author?: IAuthorId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICounterState {
  todos: ITodoItem[];
}

export interface IContextModel {
  state: ICounterState;
  dispatch: React.Dispatch<ICounterAction>;
}

export type ICounterAction =
  | { type: "SET_TODOS_LIST"; payload: ITodoItem[] }
  | { type: "ADD_TODO"; payload: ITodoItem }
  | { type: "UPDATE_TODO"; payload: ITodoItem }
  | { type: "DELETE_TODO"; payload: string };
