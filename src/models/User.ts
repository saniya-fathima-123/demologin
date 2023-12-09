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

import mongoose, { Schema, Document, Model, model } from "mongoose";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Driver", "Operator"],
      default: "Driver",
    },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> = model<IUser>("User", UserSchema); // Assign the result to UserModel

export interface IOtp extends Document {
  phone: string;
  otp: string;
  createdAt: Date;
}
const OtpSchema: Schema = new Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String },
    createdAt: { type: Date, default: Date.now, index: { expires: "5m" } },
  },
  { timestamps: true }
);

export const OtpModel: Model<IOtp> = model<IOtp>("otp", OtpSchema); // Assign the result to OtpModel
