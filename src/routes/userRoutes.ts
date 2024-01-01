import { Router } from 'express';
import { validate } from '../middleware/ValidationMiddleware.js';
import { createOtpSchema, createUserSchema, loginSchema } from '../schemas/UserControllerSchema.js';
import userController from '../controllers/UserController.js';
import { authenticateJWT } from '../middleware/AuthMiddleware.js';

const userRouter: Router = Router();

userRouter.get('/', authenticateJWT, userController.getUsers);
userRouter.post('/register', validate(createUserSchema), userController.create);
userRouter.post('/login', validate(loginSchema), userController.login);
userRouter.post('/otp', validate(createOtpSchema), userController.createSession);

export default userRouter;
