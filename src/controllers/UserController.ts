import type { Request, Response } from 'express'
import { UserModel } from "../models/User"
import { CategoryModel} from "../models/User"
import mongoose from 'mongoose'
import { log } from 'console'

class UserController {
  async getUsers (req: Request, res: Response): Promise<void> {
    try {
      // const users: IUser[] = await User.find()
      res.json({test: 'hello'})
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }


  async postCity (req: Request, res: Response): Promise<void>{

    try {
      const { name, code } = req.body;
      console.log(name,code);
      
      
      // Validate if name and code are present
      if (!name || !code) {
         res.status(400).json({ error: 'Both name and code are required.' });
         return;
      }

       // Check if a city with the same name or code already exists
    const existingCity = await UserModel.findOne({ $or: [{ cityName:name }, { cityCode:code }] });

    if (existingCity) {
       res.status(409).json({ error: 'City with the same name or code already exists.' });
       return;
    }
      const newCity = new UserModel({ cityName:name, cityCode:code });
    

      // Save the city to the database
      await newCity.save();
      res.send({ message: 'City saved successfully.' });
    
    }catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

}

async getCity(req: Request, res: Response): Promise<void> {

  try {
    // Find all cities in the database
    const cities = await UserModel.find({}, { _id: 0, cityName: 1 });
    console.log('Cities:', cities);
    const cityNames = cities.map(city => city.cityName);
    console.log(cityNames);
    
    res.json(cityNames);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

}


async deleteCity(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.body;
    console.log(id);

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid city ID.' });
      return;
    }

    // Convert the id to a proper ObjectId instance
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the city by ID and delete it
    const deletedCity = await UserModel.findByIdAndDelete(objectId);

    if (!deletedCity) {
      res.status(404).json({ error: 'City not found.' });
      return;
    }

    res.json({ message: 'City deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async addcategory(req: Request, res: Response): Promise<void> {

  try {
    const {name} = req.body;
    console.log(name);
    
    
    // Validate if name and code are present
    if (!name) {
       res.status(400).json({ error: 'category name is required' });
       return;
    }

     // Check if a city with the same name or code already exists
  const existingCategory = await CategoryModel.findOne({ $or: [{ categoryName:name }] });

  if (existingCategory) {
     res.status(409).json({ error: 'Category with the same name already exists.' });
     return;
  }
    const newCategory = new CategoryModel({ categoryName:name });
  

    // Save the city to the database
    await newCategory.save();
    res.send({ message: 'Category saved successfully.' });
  
  }catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

async getcategory(req: Request, res: Response): Promise<void>{
  try {
    // Find all categories in the database
    const categories = await CategoryModel.find({}, { _id: 0, categoryName: 1 });

    // Extract category names from the array of objects
    const categoryNames = categories.map(category => category.categoryName);
    

    res.json(categoryNames);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

async deleteCategory(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.body;
    console.log(id);

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid city ID.' });
      return;
    }

    // Convert the id to a proper ObjectId instance
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the city by ID and delete it
    const deletedCity = await CategoryModel.findByIdAndDelete(objectId);

    if (!deletedCity) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }

    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async updateCategory(req: Request, res: Response): Promise<void>{

  try {
    const { id, newName } = req.body;

    // Validate if id and newName are present
    if (!id || !newName) {
      res.status(400).json({ error: 'Both id and new category name are required.' });
      return;
    }

    // Find the category by ID
    const existingCategory = await CategoryModel.findById(id);

    if (!existingCategory) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }

    // Check if the new name is the same as the existing name
    if (existingCategory.categoryName === newName) {
      res.json({ message: 'New category name is the same as the existing name. No update needed.' });
      return;
    }

    // Update the category name
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { categoryName: newName },
      { new: true } // Return the updated document
    );

    res.json({ message: 'Category updated successfully.', updatedCategory });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}

export default new UserController()
