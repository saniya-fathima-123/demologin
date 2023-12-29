import Joi from 'joi';

export const createCategorySchema = {
  categoryName: Joi.string().required(),
};
