import mongoose, { Schema, Document } from "mongoose";

interface IWord extends Document {
  word: string;
  theme: string;
  difficulty: "easy" | "medium" | "hard";
}

const wordSchema = new Schema<IWord>({
  word: { type: String, required: true },
  theme: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
});

const Word = mongoose.model<IWord>("Word", wordSchema);
export default Word;
