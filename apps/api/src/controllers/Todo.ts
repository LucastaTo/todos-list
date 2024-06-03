import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Todo, { Status } from "../models/Todo";

const createTodo = (req: Request, res: Response, next: NextFunction) => {
  const { author, title, desc, color, dueDate, status } = req.body;

  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
    desc,
    color,
    dueDate,
    status,
  });

  return todo
    .save()
    .then((todo) => res.status(201).json({ todo }))
    .catch((error) => res.status(500).json({ error }));
};

const readTodo = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.todoId;

  return Todo.findById(todoId)
    .populate("author")
    .then((todo) =>
      todo
        ? res.status(200).json({ todo })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.query.authorId;
  return Todo.find({ author: authorId })
    .then((todos) => {
      return res.status(200).json({ todos });
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.todoId;

  return Todo.findById(todoId)
    .then((todo) => {
      if (todo) {
        todo.set(req.body);

        return todo
          .save()
          .then((todo) => res.status(201).json({ todo }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateStatusTodo = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.todoId;

  return Todo.findById(todoId)
    .then((todo) => {
      if (todo) {
        todo.set(req.body);

        return todo
          .save()
          .then((todo) => res.status(201).json({ todo }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  const todoId = req.params.todoId;

  return Todo.findByIdAndDelete(todoId)
    .then((todo) =>
      todo
        ? res.status(201).json({ todo, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createTodo,
  readTodo,
  readAll,
  updateTodo,
  deleteTodo,
  updateStatusTodo,
};
