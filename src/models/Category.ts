import mongoose from 'mongoose';
import type { Schema, Document, Model } from 'mongoose';

export interface CategoryDraft extends Document {
  categoryName: string;
}

const CategorySchema: Schema = new mongoose.Schema<CategoryDraft>({
  categoryName: { type: String, required: true },
});

export interface CategoryDocument extends CategoryDraft, Document {}

interface CategoryModel extends Model<CategoryDocument> {
  // Define static or instance methods for the model
}

export const Category = mongoose.model<CategoryDraft, CategoryModel>('Category', CategorySchema); // Assign the result to UserModel
