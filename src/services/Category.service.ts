import type { CategoryDocument, CategoryDraft } from '../models/Category.js';
import { Category } from '../models/Category.js';

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
}

export default new CategoryService();
