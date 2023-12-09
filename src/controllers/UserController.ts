import type { Request, Response } from 'express';
import { UserModel, OtpModel, type IOtp, type IUser } from '../models/User';
import { generate } from 'otp-generator';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      // const users: IUser[] = await User.find()
      res.json({ test: 'hello' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { email, phone }: { email: string; phone: string } = req.body;
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneregex: RegExp = /^(?:\+?91|0)?(?:\d{10})$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Please provide a valid email address' });
        return;
      }
      const existingUser = await UserModel.findOne<IUser>({ email });

      if (existingUser !== null) {
        res.status(400).json({ status: false, message: 'User  email already exists.' });
        return;
      }
      if (!phoneregex.test(phone)) {
        res.status(400).json({ error: 'Please provide a valid phone number' });
        return;
      }
      const data = await UserModel.findOne<IUser>({ phone });

      if (data !== null) {
        res.status(400).json({
          status: false,
          message: 'User phone number already exists.',
        });
        return;
      }

      const newRegistration = new UserModel(req.body);

      // Save the registration to the database
      const registrationData = await newRegistration.save();

      res.status(201).json(registrationData);
      console.log(registrationData);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async otpgenerate(req: Request, res: Response): Promise<void> {
    try {
      // const data = await UserModel.findOne({ phone: req.body.phone });
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

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { phone, otp } = req.body;
      const user = await OtpModel.findOne<IOtp>({ phone });
      if (user === null) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (user.otp !== otp) {
        res.status(401).json({ message: 'Invalid OTP' });
        return;
      }
      await user.save();

      res.json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new UserController();
