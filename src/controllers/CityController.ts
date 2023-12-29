import type { Request, Response } from 'express';
import CityService from '../services/City.service.js';
import { City } from '../models/City.js';

class CityController {
  async getCity(req: Request, res: Response): Promise<void> {
    try {
      const cities = await City.find({}, { _id: 0, cityName: 1 });
      console.log('Cities:', cities);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  create = () => {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const city = await CityService.createCity(req.body);
        res.status(201).send(city);
      } catch (error) {
        res.status(400).send(error);
        res.status(400).send('Error processing the request.');
      }
    };
  };

  deleteCity = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;

    try {
      await CityService.deleteCity(id);
      res.json({ message: 'City deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateCity = async (req: Request, res: Response): Promise<void> => {
    const { id, cityName } = req.body;
    console.log(id);

    try {
      const result = await CityService.updateCity(id, cityName);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
export default new CityController();
