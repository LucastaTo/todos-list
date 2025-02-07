import { Router } from "express";
import WordController from "../controllers/Word";

const router = Router();

router.post("/", WordController.createWord);
router.post("/mutiple", WordController.createMultipleWords);
router.get("/:difficulty", WordController.getWordsByDifficulty);
router.post("/seed", WordController.seedWords);

export default router;
