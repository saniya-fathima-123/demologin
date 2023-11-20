import type { Request, Response } from 'express'

class UserController {
  async getUsers (req: Request, res: Response): Promise<void> {
    try {
      // const users: IUser[] = await User.find()
      res.json({test: 'hello'})
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new UserController()
