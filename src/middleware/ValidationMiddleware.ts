import type { Request, Response, NextFunction } from 'express';
import type Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error !== null && error !== undefined) {
      const errorMessage = error?.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
