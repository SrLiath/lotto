import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "operator" | "user";
  area: mongoose.Schema.Types.ObjectId;
  paymentInfo: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
  matchPassword(enteredPassword: string): Promise<boolean>;
}
