import { Router } from "express";
import userController from "../controllers/UserController.js";

const router: Router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', userController.getUsers)
router.get('/hello', userController.getUsers)
router.post('/addCity',userController.postCity)
router.delete('/deleteCity',userController.deleteCity)
router.post('/addcategory',userController.addcategory)
router.delete('/deleteCategory',userController.deleteCategory)


export default router
