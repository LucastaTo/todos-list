import { NextFunction, Request, Response } from "express";
import * as spellchecker from "simple-spellchecker";
import Word from "../models/Word";

const dictionary = spellchecker.getDictionarySync("en-US");

const checkSpelling = (word: string): boolean => {
  const isCorrect = dictionary.spellCheck(word);
  return isCorrect;
};

const createWord = async (req: Request, res: Response, next: NextFunction) => {
  const { word, theme, difficulty } = req.body;

  if (!checkSpelling(word)) {
    return res.status(400).json({ error: "Spelling error in the word." });
  }

  const existingWord = await Word.findOne({ word });

  if (existingWord) {
    return res
      .status(400)
      .json({ error: "Word already exists in the database." });
  }

  const newWord = new Word({
    word,
    theme,
    difficulty,
  });

  try {
    const savedWord = await newWord.save();
    return res.status(201).json({ word: savedWord });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createMultipleWords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { words, theme, difficulty } = req.body;

  const invalidWords = [];
  const validWords = [];
  for (const word of words) {
    if (!checkSpelling(word)) {
      return res.status(400).json({ error: "Spelling error in the word." });
    }

    const existingWord = await Word.findOne({ word });

    if (existingWord) {
      invalidWords.push({
        word,
        error: "Word already exists in the database.",
      });
      continue;
    }

    validWords.push(word);
  }

  if (validWords.length === 0) {
    return res
      .status(400)
      .json({ error: "No valid words to save.", invalidWords });
  }

  const newWords = validWords.map((word) => ({
    word,
    theme,
    difficulty,
  }));

  try {
    const savedWords = await Word.insertMany(newWords);
    return res.status(201).json({ words: savedWords, invalidWords });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getWordsByDifficulty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { difficulty } = req.params;

  try {
    const words = await Word.find({ difficulty });
    return res.status(200).json({ words });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const seedWords = async (req: Request, res: Response, next: NextFunction) => {
  const wordsData = [
    { word: "cat", theme: "animals", difficulty: "easy" },
    { word: "dog", theme: "animals", difficulty: "easy" },
    { word: "apple", theme: "fruits", difficulty: "medium" },
    { word: "mountain", theme: "nature", difficulty: "medium" },
    { word: "sunflower", theme: "nature", difficulty: "hard" },
    { word: "television", theme: "objects", difficulty: "hard" },
  ];

  try {
    await Word.insertMany(wordsData);
    return res.status(200).json({ message: "Words seeded successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  createWord,
  getWordsByDifficulty,
  createMultipleWords,
  seedWords,
};
