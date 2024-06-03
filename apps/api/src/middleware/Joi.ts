import Joi, { ObjectSchema, object } from "joi";
import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../models/Author";
import { ITodo, Status } from "../models/Todo";
import Logging from "../library/Logging";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      objectId: Joi.string().required(),
    }),
  },
  todo: {
    create: Joi.object<ITodo>({
      title: Joi.string().required(),
      desc: Joi.string(),
      color: Joi.string(),
      status: Joi.string().valid(...Object.values(Status)),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<ITodo>({
      title: Joi.string().required(),
      desc: Joi.string(),
      color: Joi.string().required(),
    }),
    updateStatus: Joi.object<ITodo>({
      status: Joi.string().valid(...Object.values(Status)),
    }),
  },
};
