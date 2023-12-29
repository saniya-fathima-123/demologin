import { Router } from 'express';
import { validate } from '../middleware/ValidationMiddleware.js';
import CityController from '../controllers/CityController.js';
import {createCitySchema} from '../schemas/CitySchema.js'

const cityRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises

cityRouter.post('/create', validate(createCitySchema), CityController.create());
cityRouter.put('/update', CityController.updateCity);
cityRouter.get('/read', CityController.getCity);
cityRouter.delete('/delete', CityController.deleteCity);



export default cityRouter;
