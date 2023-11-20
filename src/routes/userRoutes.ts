import { Router } from 'express'
import userController from '../controllers/UserController.js'

const router: Router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', userController.getUsers)
router.get('/hello', userController.getUsers)
export default router
