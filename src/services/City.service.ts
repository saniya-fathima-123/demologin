import type { CityDocument, CityDraft } from '../models/City.js';
import { City } from '../models/City.js';
import mongoose from 'mongoose';
class CityService {
  public async createCity(CityDraft: CityDraft): Promise<CityDocument> {
    try {
      const { cityName, cityCode } = CityDraft;

      const existingUser = await City.findOne<CityDocument>({ cityName });
      if (existingUser !== null) {
        throw new Error('City already exists.');
      }
      const newRegistration = new City({ cityName, cityCode });
      // Save the registration to the database

      return await newRegistration.save();
    } catch (error) {
      console.log('saniya error');
      console.error(error);
      throw new Error('Error creating city.');
    }
  }

  public async deleteCity(cityId: string): Promise<void> {
    try {
      // Validate if id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        throw new Error('Invalid city ID.');
      }

      // Convert the id to a proper ObjectId instance
      const objectId = new mongoose.Types.ObjectId(cityId);

      // Find the city by ID and delete it
      await City.findByIdAndDelete(objectId);
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  public async updateCity(id: string, cityName: string): Promise<{ message: string; updatedCity?: CityDocument | null }> {
    try {
      // Find the category by ID
      const existingCity = await City.findById(id);

      if (existingCity === null || existingCity === undefined) {
        throw new Error('City not found.');
      }

      // Check if the new name is the same as the existing name
      if (existingCity.cityName === cityName) {
        return { message: 'New category name is the same as the existing name. No update needed.' };
      }

      // Update the category name
      const updatedCity = await City.findByIdAndUpdate(
        id,
        { cityName },
        { new: true } // Return the updated document
      );

      return { message: 'Category updated successfully.', updatedCity };
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}
export default new CityService();
