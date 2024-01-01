import type { Request, Response } from 'express';
import UserService from '../services/User.service.js';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      res.json({ test: 'hello' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { mobileNumber, email, password, otp }: { mobileNumber: string; email: string; password: string; otp: string } = req.body;
      let token: string = '';
      if (email && password) {
        token = await UserService.loginWithEmail({ email, password });
      } else if (mobileNumber && otp) {
        token = await UserService.loginWithMobile({ mobileNumber, otp });
      } else {
        res.status(401).send('Unauthorized');
      }

      res.status(201).json(token);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const { mobileNumber } = req.body;
      const otp = UserService.generateOtp(mobileNumber);
      res.status(201).send(otp);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new UserController();
