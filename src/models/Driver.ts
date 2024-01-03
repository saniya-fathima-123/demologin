import mongoose from 'mongoose';
import type { Schema, Document, Model } from 'mongoose';

export interface DriverDraft extends Document {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

const DriverSchema: Schema = new mongoose.Schema<DriverDraft>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
});

export interface DriverDocument extends DriverDraft, Document {}

interface DriverModel extends Model<DriverDocument> {
  // Define static or instance methods for the model
}

export const Driver = mongoose.model<DriverDraft, DriverModel>('Driver', DriverSchema); // Assign the result to UserModel
