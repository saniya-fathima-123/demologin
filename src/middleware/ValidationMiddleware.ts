import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type JoiSchema = Record<string, Joi.Schema>;

export const validate = (schema: JoiSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(schema, req.body);
    const { error } = Joi.object(schema).validate(req.body, { abortEarly: false });

    if (error !== null) {
      const errorMessage = error?.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
