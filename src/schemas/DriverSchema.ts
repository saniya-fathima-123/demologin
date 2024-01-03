import Joi from 'joi';

export const createDriverSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobileNumber: Joi.string()
    .length(10) // Ensure the length is 10
    .pattern(/^[0-9]+$/) // Ensure it contains only numeric digits
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: ['in', 'com'] } }) // Using Joi's built-in email validation with custom allowed TLDs
    .required(),
};
