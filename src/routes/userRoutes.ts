import { Router } from 'express';
import { validate } from '../middleware/ValidationMiddleware.js';
import { createUserSchema } from '../schemas/UserControllerSchema.js';
import userController from '../controllers/UserController';
import CategoryController from '../controllers/CategoryController.js';

const userRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get('/', userController.getUsers);
userRouter.post('/register', validate(createUserSchema), userController.create); // POST request for creating a user registration
userRouter.get('/viewcategory', CategoryController.getCategory);
// userRouter.post('/create-session', userController.otpgenerate);
userRouter.post('/validate', userController.verifyOtp);


export default userRouter;
