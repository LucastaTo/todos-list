import { NextFunction, Request, Response } from "express";
import Score from "../models/Score";

const createScore = async (req: Request, res: Response, next: NextFunction) => {
  const { authorName, type, score, time } = req.body;

  if (!authorName || !type) {
    return res
      .status(400)
      .json({ error: "Author name and score type are required" });
  }

  if (type === "score" && (score === undefined || score === null)) {
    return res
      .status(400)
      .json({ error: "Score is required for 'score' type" });
  }

  if (type === "time" && (time === undefined || time === null)) {
    return res.status(400).json({ error: "Time is required for 'time' type" });
  }

  try {
    const newScore = new Score({
      authorName,
      type,
      score: type === "score" ? score : undefined,
      time: type === "time" ? time : undefined,
    });

    const savedScore = await newScore.save();
    return res.status(201).json({ score: savedScore });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getScoresByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorId } = req.params;

  try {
    const scores = await Score.find({ authorId });
    return res.status(200).json({ scores });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scores = await Score.find();
    return res.status(200).json({ scores });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTopScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type } = req.query; // Get the type (score or time) from the query

  // Dynamically determine sort order based on 'type'
  const sortField = type === "score" ? "score" : "time"; // Use 'score' or 'time' field
  const sortOrder = type === "score" ? -1 : 1; // If type is score, sort by descending; else ascending for time

  try {
    // Fetch the top 10 based on the sorting
    const topScores = await Score.find({ type })
      .sort({ [sortField]: sortOrder }) // Correct dynamic sorting
      .limit(10); // Get the top 10

    return res.status(200).json({ topScores });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  createScore,
  getScoresByAuthor,
  getAllScores,
  getTopScores, // New method to fetch top scores or fastest times
};
