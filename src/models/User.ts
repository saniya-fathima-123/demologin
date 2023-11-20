import mongoose, {Schema} from 'mongoose'
import type { Document } from 'mongoose';

export interface IUser extends Document {
  name: string,
  email: string,
  phone: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
})

export default mongoose.model<IUser>('User', UserSchema)
