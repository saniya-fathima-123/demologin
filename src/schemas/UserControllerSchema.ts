import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().required(),
});

export const createOtpSchema = Joi.object({
  mobileNumber: Joi.string().required(),
});

// Define a base schema for user registration
export const loginSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  mobileNumber: Joi.string().when(Joi.ref('email'), {
    // Conditional rule based on 'email' presence
    is: Joi.exist(),
    then: Joi.forbidden(), // If 'email' exists, 'mobileNumber' is forbidden
    otherwise: Joi.string().required(), // If 'email' doesn't exist, 'mobileNumber' is required
  }),
  otp: Joi.string().min(6),
})
  .or('email', 'mobileNumber')
  .with('email', 'password')
  .with('mobileNumber', 'otp'); // At least one of 'email' or 'mobileNumber' is required, if 'email' then 'password' is required
