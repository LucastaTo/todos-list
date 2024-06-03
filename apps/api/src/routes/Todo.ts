import express from "express";
import controller from "../controllers/Todo";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post("/create", ValidateJoi(Schemas.todo.create), controller.createTodo);
router.get("/get/:todoId", controller.readTodo);
router.get("/get/", controller.readAll);
router.patch(
  "/update/:todoId",
  ValidateJoi(Schemas.todo.update),
  controller.updateTodo
);
router.patch(
  "/updateStatus/:todoId",
  ValidateJoi(Schemas.todo.updateStatus),
  controller.updateTodo
);
router.delete("/delete/:todoId", controller.deleteTodo);

export = router;
