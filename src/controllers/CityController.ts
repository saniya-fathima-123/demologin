import type { Request, Response } from 'express';
import CityService from '../services/City.service';
import { City } from '../models/City';
import { createCitySchema } from '../schemas/CitySchema';
import Joi from 'joi';
import { validate } from '../middleware/ValidationMiddleware';

class CityController {

    async getCity(req: Request, res: Response): Promise<void> {
      try {
        const cities = await City.find({}, { _id: 0, cityName: 1 });
          console.log('Cities:', cities);
          res.json(cities);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  create = () => {
    return async (req: Request, res: Response): Promise<void> => {
      console.error("saniya");
      
      try {

        const city = await CityService.createCity(req.body);
        res.status(201).send(city);

        console.log('Created City:', city.cityName);
         console.log('City Object:', city);
      
        
      } catch (error) {
        res.status(400).send(error);
        res.status(400).send('Error processing the request.');
      }
    };
  };

  // delete= () =>{
  //   return  async deleteCity(req: Request, res: Response): Promise<void> {
  //   try {
  //         const { id } = req.body;
  //         console.log(id);
    
  //         // Validate if id is a valid MongoDB ObjectId
  //         if (!mongoose.Types.ObjectId.isValid(id)) {
  //           res.status(400).json({ error: 'Invalid city ID.' });
  //           return;
  //         }
    
  //         // Convert the id to a proper ObjectId instance
  //         const objectId = new mongoose.Types.ObjectId(id);
    
  //         // Find the city by ID and delete it
  //         const deletedCity = await UserModel.findByIdAndDelete(objectId);
    
  //         if (!deletedCity) {
  //           res.status(404).json({ error: 'City not found.' });
  //           return;
  //         }
  //         res.json({ message: 'City deleted successfully.' });
  //       } catch (error) {
  //         console.error(error);
  //         res.status(500).json({ error: 'Internal Server Error' });
  //       }
  //   }
  // }
 
}
export default new CityController();
