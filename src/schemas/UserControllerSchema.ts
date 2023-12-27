import Joi from 'joi';

export const createUserSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().required(),
};
