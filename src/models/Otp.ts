import { Schema, model } from 'mongoose';
import type { Model } from 'mongoose';

const OTP_EXPIRY_TIME = '5m';
export interface OtpDraft extends Document {
  mobileNumber: string;
  otp: string;
  createdAt: Date;
}
const OtpSchema: Schema = new Schema<OtpDraft>(
  {
    mobileNumber: { type: String, required: true },
    otp: { type: String },
    createdAt: { type: Date, default: Date.now, index: { expires: OTP_EXPIRY_TIME } },
  },
  { timestamps: true }
);

export interface OtpDocument extends OtpDraft, Document {}

export const OneTimePassword: Model<OtpDraft> = model<OtpDraft>('OneTimePassword', OtpSchema); // Assign the result to OtpModel
