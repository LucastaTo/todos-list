// Todo interface
export interface IAuthorId {
  _id: string;
}

export interface ICounterState {
  authorId: IAuthorId;
}

export interface IContextModel {
  state: ICounterState;
  dispatch: React.Dispatch<ICounterAction>;
}

export type ICounterAction = { type: "SET_AUTHOR"; payload: IAuthorId };
