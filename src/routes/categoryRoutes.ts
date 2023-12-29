import { Router } from 'express';
import { validate } from '../middleware/ValidationMiddleware.js';
import { createCategorySchema } from '../schemas/CategorySchema.js';
import CategoryController from '../controllers/CategoryController.js';


const categoryRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises

categoryRouter.post('/create', validate(createCategorySchema), CategoryController.create);
categoryRouter.put('/update', CategoryController.updateCategory);
categoryRouter.get('/read', CategoryController.getCategory);
categoryRouter.delete('/delete', CategoryController.deleteCategory);



export default categoryRouter;
