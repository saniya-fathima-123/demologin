import Joi from 'joi';

export const createCitySchema = {
  cityName: Joi.string().required(),
  cityCode: Joi.string().required(),
};
