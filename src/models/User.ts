import mongoose, {Schema} from 'mongoose'
import type { Document } from 'mongoose';

export interface IUser extends Document {
  cityname: string,
  citycode: string
  
}

const UserSchema: Schema = new Schema({
  cityName: { type: String, required: true },
  cityCode: { type: String, required: true }
})

export default mongoose.model<IUser>('city', UserSchema)
