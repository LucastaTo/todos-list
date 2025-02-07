import mongoose, { Schema, Document } from "mongoose";

interface IScore extends Document {
  authorName: string;
  score?: number;
  type: "time" | "score"; // New field to specify the type of record
  time?: number; // Time in milliseconds, optional
}

const scoreSchema = new Schema<IScore>(
  {
    authorName: { type: String, required: true },
    score: {
      type: Number,
      required: function () {
        return this.type === "score";
      }, // Score is required only when type is "score"
    },
    type: {
      type: String,
      enum: ["time", "score"],
      required: true,
    },
    time: {
      type: Number,
      required: function () {
        return this.type === "time";
      }, // Time is required only when type is "time"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Score = mongoose.model<IScore>("Score", scoreSchema);
export default Score;
