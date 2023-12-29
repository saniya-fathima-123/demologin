import type { CategoryDocument, CategoryDraft } from '../models/Category.js';
import { Category } from '../models/Category.js';
import mongoose from 'mongoose';

class CategoryService {

  public async createCategory(categoryDraft: CategoryDraft): Promise<CategoryDocument> {
    try {
    const { categoryName } = categoryDraft;

    const existingCategory = await Category.findOne<CategoryDocument>({ categoryName });
    if (existingCategory !== null) {
      throw new Error('Category already exists.');
    }
    const newRegistration = new Category({ categoryName });
    // Save the registration to the database
    return await newRegistration.save();
  }catch (error) {
    console.error('Error creating category:', error);
    throw error; // Rethrow the error to be caught by the controller
  }
}

public async deleteCategory (cityId: string): Promise<void> {
  try {
    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      throw new Error('Invalid city ID.');
    }

    // Convert the id to a proper ObjectId instance
    const objectId = new mongoose.Types.ObjectId(cityId);

    // Find the city by ID and delete it
    const deletedCity = await Category.findByIdAndDelete(objectId);

    if (!deletedCity) {
      throw new Error('City not found.');
    }
  } catch (error) {
    throw new Error('Internal Server Error');
  }


}

public async updateCategory(id: string, categoryName: string): Promise<{ message: string, updatedCategory?: CategoryDocument | null }> {
  try {
    // Find the category by ID
    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      throw new Error('Category not found.');
    }

    // Check if the new name is the same as the existing name
    if (existingCategory.categoryName === categoryName) {
      return { message: 'New category name is the same as the existing name. No update needed.' };
    }

    // Update the category name
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName: categoryName },
      { new: true } // Return the updated document
    );

    return { message: 'Category updated successfully.', updatedCategory };
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

}
export default new CategoryService();
