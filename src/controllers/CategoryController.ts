import type { Request, Response } from 'express';
import CategoryService from '../services/Category.service';
import { Category } from '../models/Category';
import { createCategorySchema } from '../schemas/CategorySchema';
import Joi from 'joi';
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
      }

  
  export default new CategoryController();