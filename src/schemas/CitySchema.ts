import Joi from 'joi';

export const createCitySchema = Joi.object({
  cityName: Joi.string().required(),
  cityCode: Joi.string().required(),
});
