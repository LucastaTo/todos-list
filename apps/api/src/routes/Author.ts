import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(Schemas.author.create),
  controller.createAuthor
);

export = router;
