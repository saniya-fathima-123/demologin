import type { Request, Response } from 'express'
import { UserModel } from "../models/User"
import { CategoryModel} from "../models/User"
import mongoose from 'mongoose'

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

async updateCategory(req: Request, res: Response): Promise<void> {

  const newName: string = req.body.newName;

if (!newName) {
  res.status(400).json({ error: 'New name is required' });
  return;
}

// Update the name
let personName = newName;

res.json({ message: 'Name updated successfully', newName: personName });
res.json({ currentName: personName });
return;

}
}

export default new UserController()
