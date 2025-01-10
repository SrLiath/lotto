import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
}, { timestamps: true });

export const Area = mongoose.model("Area", areaSchema);

