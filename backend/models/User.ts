import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./userInterface";  // Import the IUser interface

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "operator", "user"], default: "user" },
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  paymentInfo: {
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Add the matchPassword method to the user model
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model, typed with IUser
export const User = mongoose.model<IUser>("User", userSchema);
