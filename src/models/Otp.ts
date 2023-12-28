import { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';
export interface IOtp extends Document {
  phone: string;
  otp: string;
  createdAt: Date;
}
const OtpSchema: Schema = new Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String },
    createdAt: { type: Date, default: Date.now, index: { expires: '5m' } },
  },
  { timestamps: true }
);

export const OtpModel: Model<IOtp> = model<IOtp>('otp', OtpSchema); // Assign the result to OtpModel
