import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
  drawDate: { type: Date, required: true },
  numbers: { type: [Number], required: true },
}, { timestamps: true });

export const Draw = mongoose.model("Draw", drawSchema);

