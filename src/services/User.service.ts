import type { UserDocument, UserDraft } from '../models/User.js';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generate } from 'otp-generator';
import { OneTimePassword, type OtpDocument } from '../models/Otp.js';
import { SECRET_KEY } from '../middleware/AuthMiddleware.js';

const TOKEN_EXPIRY_TIME = '2h';

export interface Token {
  accessToken: string;
}
class UserService {
  public async createUser(userDraft: UserDraft): Promise<UserDocument> {
    const { mobileNumber, firstName, lastName, email } = userDraft;

    const existingUser = await User.findOne<UserDocument>({ mobileNumber });
    if (existingUser !== null) {
      throw new Error('User  email already exists.');
    }
    const newRegistration = new User({ mobileNumber, firstName, lastName, email });
    // Save the registration to the database
    return await newRegistration.save();
  }

  public async generateOtp(mobileNumber: string): Promise<OtpDocument> {
    const user = await User.findOne<UserDocument>({ mobileNumber });
    if (!user) {
      throw new Error('User not found');
    }

    const OTP = generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    const newOtp = new OneTimePassword({ mobileNumber, otp: OTP });
    return await newOtp.save(); // Save the registration to the database
  }

  public async loginWithMobile({ mobileNumber, otp }: { mobileNumber: string; otp: string }): Promise<Token> {
    const user = await User.findOne<UserDocument>({ mobileNumber });
    if (!user) {
      throw new Error('User not found');
    }
    const otpRecord: OtpDocument | null = await OneTimePassword.findOne({ otp });
    if (otpRecord !== null && otpRecord.otp !== otp) {
      throw new Error('Invalid otp');
    }
    // Create JWT token upon successful login
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY_TIME });
    return { accessToken: token };
  }

  public async loginWithEmail({ email, password }: { email: string; password: string }): Promise<Token> {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    // Create JWT token upon successful login
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY_TIME });

    return { accessToken: token };
  }
}

export default new UserService();
