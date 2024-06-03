import mongoose, { Document, Schema } from "mongoose";

export interface IAuthor {
  objectId: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    objectId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IAuthorModel>("Author", AuthorSchema);
