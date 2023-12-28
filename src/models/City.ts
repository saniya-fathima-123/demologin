import mongoose from 'mongoose';
import type { Schema, Document, Model } from 'mongoose';

export interface CityDraft extends Document {
  cityName: string;
  cityCode: string;
  
}

const CitySchema: Schema = new mongoose.Schema<CityDraft>(
  {
    cityName: { type: String, required: true },
    cityCode: { type: String, required: true },
  }
);

export interface CityDocument extends CityDraft, Document {}

interface CityModel extends Model<CityDocument> {
  // Define static or instance methods for the model
}

export const City = mongoose.model<CityDraft, CityModel>('City', CitySchema); // Assign the result to UserModel