import { Driver } from '../models/Driver.js';
import mongoose from 'mongoose';
import type { DriverDocument, DriverDraft } from '../models/Driver.js';

class DriverService {
  public async createDriver(driverDraft: DriverDraft): Promise<DriverDocument> {
    const { firstName, lastName, mobileNumber, email } = driverDraft;

    // Check if a driver with the same mobileNumber already exists
    const existingUser = await Driver.findOne<DriverDocument>({ mobileNumber });

    if (existingUser) {
      throw new Error('Driver already exists.');
    }

    // Create a new driver
    const newRegistration = new Driver({ firstName, lastName, mobileNumber, email });

    // Save the new driver to the database
    return await newRegistration.save();
  }

  public async deleteDriver(driverId: string): Promise<void> {
    try {
      // Validate if id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(driverId)) {
        throw new Error('Invalid Driver ID.');
      }

      // Convert the id to a proper ObjectId instance
      const objectId = new mongoose.Types.ObjectId(driverId);

      // Find the Driver by ID and delete it
      const deletedDriver = await Driver.findByIdAndDelete(objectId);

      if (!deletedDriver) {
        throw new Error('Driver not found.');
      }
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  public async updateDriver(driverId: string, driverDraft: DriverDraft): Promise<DriverDocument> {
    try {
      // Validate if id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(driverId)) {
        throw new Error('Invalid Driver ID.');
      }

      // Convert the id to a proper ObjectId instance
      const objectId = new mongoose.Types.ObjectId(driverId);

      // Find the Driver by ID and update it
      const updatedDriver = await Driver.findByIdAndUpdate(objectId, driverDraft, { new: true });

      if (!updatedDriver) {
        throw new Error('Driver not found.');
      }

      return updatedDriver;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}

export default new DriverService();
