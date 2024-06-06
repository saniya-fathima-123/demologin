import { Router } from 'express';

import DriverController from '../controllers/DriverController.js';

const driverRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises

driverRouter.post('/create', DriverController.create);
driverRouter.put('/update', DriverController.updateDriver);
driverRouter.get('/read', DriverController.getDriver);
driverRouter.delete('/delete', DriverController.deleteDriver);

export default driverRouter;
