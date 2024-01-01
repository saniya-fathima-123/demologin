// import mongoose, { Schema } from "mongoose";
// import type { Document } from "mongoose";

// export interface IUser extends Document {
//   firstname: string;
//   lastname: string;
//   email: string;
//   phone: string;
//   role: string;
// }

// const UserSchema: Schema = new Schema({
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   role: {
//     type: String,
//     required: true,
//     enum: ["Admin", "Driver", "Operator"],
//     default: "Driver",
//   },
// });

// export const mongoose.model<IUser>("User", UserSchema);

// export interface IOtp extends Document {
//   phone: string;
//   otp: string;
// }
// const OtpSchema: Schema = new Schema({
//   phone: { type: String, required: true },
//   otp: { type: String, required: true },
// });

// export const mongoose.model<IOtp>("otp", OtpSchema);

import mongoose from 'mongoose';
import type { Schema, Document, Model } from 'mongoose';

export interface UserDraft extends Document {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  mobileNumber?: string;
  role?: USER_ROLE;
  status?: USER_STATUS;
}

export enum USER_ROLE {
  ADMIN = 'Admin',
  DRIVER = 'Driver',
  OPERATOR = 'Operator',
}

export enum USER_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'InActive',
}
const UserSchema: Schema = new mongoose.Schema<UserDraft>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: function (this: UserDraft) {
        return !this.mobileNumber; // Require email if mobile is not set
      },
    },
    mobileNumber: {
      type: String,
      required: function (this: UserDraft) {
        return !this.email; // Require mobileNumber if email is not set
      },
    },
    password: {
      type: String,
      required: function (this: UserDraft) {
        return !this.mobileNumber; // Require password if mobile is not set
      },
    },
    role: {
      type: String,
      required: true,
      enum: [USER_ROLE.ADMIN, USER_ROLE.DRIVER, USER_ROLE.OPERATOR],
      default: USER_ROLE.OPERATOR,
    },
    status: { type: String, required: true, enum: [USER_STATUS.ACTIVE, USER_STATUS.INACTIVE], default: USER_STATUS.INACTIVE },
  },
  { timestamps: true }
);

export interface UserDocument extends UserDraft, Document {}

interface UserModel extends Model<UserDocument> {
  // Define static or instance methods for the model
}

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model<UserDraft, UserModel>('User', UserSchema); // Assign the result to UserModel
