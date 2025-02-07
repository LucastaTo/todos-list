import { Router } from "express";
import ScoreController from "../controllers/Score";

const router = Router();

router.post("/", ScoreController.createScore);
router.get("/:authorId", ScoreController.getScoresByAuthor);
router.get("/", ScoreController.getAllScores);
router.get("/top", ScoreController.getTopScores);

export default router;
