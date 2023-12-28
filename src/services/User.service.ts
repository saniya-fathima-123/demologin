import type { UserDocument, UserDraft } from '../models/User.js';
import { User } from '../models/User.js';

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
}

export default new UserService();
