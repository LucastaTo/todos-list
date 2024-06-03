import mongoose, { Document, Schema } from "mongoose";

export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
}
export interface ITodo {
  title: string;
  desc: string;
  color: string;
  author: string;
  status: Status;
  dueDate?: Date;
}
export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    color: { type: String, required: true, default: "#00edf1" },
    status: {
      type: String,
      required: true,
      default: Status.PENDING,
      enum: Status,
    },
    author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
    dueDate: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITodoModel>("Todo", TodoSchema);
