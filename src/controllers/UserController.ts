import type { Request, Response } from 'express';
import { generate } from 'otp-generator';
import { OtpModel } from '../models/Otp.js';
import UserService from '../services/User.service.js';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      res.json({ test: 'hello' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  create = () => {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  };

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      // const { mobileNumber } = req.body;
      // const user = await User.findOne({ mobileNumber });

      const OTP = generate(6, {
        digits: true,
        // upperCase: false,
        specialChars: false,
      });
      const phone = req.body.phone;
      const newotpRegistration = new OtpModel({ phone, otp: OTP });
      await newotpRegistration.save(); // Save the registration to the database
      res.status(200).send('Otp send succesfully');
      console.log(`OTP for ${phone}  : ${OTP}`);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  verifyOtp = () => {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const { phone, otp } = req.body;
        const user = await OtpModel.findOne({ phone });
        if (user === null) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        if (user.otp !== otp) {
          res.status(401).json({ message: 'Invalid OTP' });
          return;
        }
        // await user.save();

        res.json({ message: 'OTP verified successfully' });
      } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  };

  
}

export default new UserController();
