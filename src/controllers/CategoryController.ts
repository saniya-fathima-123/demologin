import type { Request, Response } from 'express';
import CategoryService from '../services/Category.service';
import { Category } from '../models/Category';
import { createCategorySchema } from '../schemas/CategorySchema';
import { validate } from '../middleware/ValidationMiddleware';

class CategoryController {

    async getCategory(req: Request, res: Response): Promise<void> {
      try {
        const category = await Category.find({}, { _id: 0, categoryName: 1 });
          console.log('Category:', category);
          res.json(category);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    create  = async (req: Request, res: Response): Promise<void> => {
          try {
            validate(createCategorySchema)(req, res, () => {});
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
          } catch (error) {
            res.status(400).send(error.message||'bad request');
          }
    
        }

    deleteCategory = async (req: Request, res: Response): Promise<void> => {
          const { id } = req.body;
      
          try {
            await CategoryService.deleteCategory(id);
            res.json({ message: 'Category deleted successfully.' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        };

    updateCategory = async (req: Request, res: Response): Promise<void> => {
          const { id, categoryName } = req.body;
          console.log(id);
          
      
          try {
            const result = await CategoryService.updateCategory(id, categoryName);
            res.json(result);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        }


      }

  
  export default new CategoryController();