import type { Request, Response } from 'express';
import DriverService from '../services/Driver.service.js';
import { Driver } from '../models/Driver.js';
import { createDriverSchema } from '../schemas/DriverSchema.js';
import { validate } from '../middleware/ValidationMiddleware';

class DriverController {
  async getDriver(req: Request, res: Response): Promise<void> {
    try {
      const drivers = await Driver.find({}, { _id: 0, firstName: 1, lastName: 1, mobileNumber: 1, email: 1 });
      console.log('Driver:', drivers);
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      validate(createDriverSchema)(req, res, () => {});
      const driver = await DriverService.createDriver(req.body);
      res.status(201).json(driver);
    } catch (error) {
      res.status(400).send(error.message || 'bad request');
    }
  };

  deleteDriver = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      await DriverService.deleteDriver(id);
      res.json({ message: 'Driver deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateDriver = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      // Validate if id is provided
      if (!id) {
        res.status(400).json({ error: 'Driver ID is required.' });
        return;
      }

      const updatedDriver = await DriverService.updateDriver(id, req.body);

      res.json(updatedDriver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
export default new DriverController();
