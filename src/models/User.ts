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
import { Schema, Document, model, Model } from "mongoose";

export interface IUser extends Document {
  cityName: string,
  cityCode: string
  
}

const UserSchema: Schema = new Schema({
  cityName: { type: String, required: true },
  cityCode: { type: String, required: true }
})



export interface ICategory extends Document {
   categoryName: string;
    
}

const CategorySchema: Schema = new Schema({
  categoryName:{type: String,required:true}

})

// Create and export User model
export const UserModel: Model<IUser> = model<IUser>("city", UserSchema);

// Create and export Category model
export const CategoryModel: Model<ICategory> = model<ICategory>("category", CategorySchema);


