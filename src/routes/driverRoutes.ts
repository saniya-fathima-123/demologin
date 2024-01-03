import { Router } from 'express';
import { validate } from '../middleware/ValidationMiddleware.js';
import DriverController from '../controllers/DriverController.js';
import { createDriverSchema } from '../schemas/DriverSchema.js';

const driverRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises

driverRouter.post('/create', validate(createDriverSchema), DriverController.create);
driverRouter.put('/update', DriverController.updateDriver);
driverRouter.get('/read', DriverController.getDriver);
driverRouter.delete('/delete', DriverController.deleteDriver);

export default driverRouter;
