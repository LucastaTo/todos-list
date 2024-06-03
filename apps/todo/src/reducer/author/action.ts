import { IAuthorId, ICounterAction } from "src/@types/Author";

export const setAuthor = (authorId: IAuthorId): ICounterAction => ({
  type: "SET_AUTHOR",
  payload: authorId,
});
