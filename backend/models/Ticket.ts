import mongoose from "mongoose";
import crypto from "crypto";
import QRCode from "qrcode";
import { Document, Types } from "mongoose";
import { IUser } from "./userInterface";

export interface IArea extends Document {
  _id: Types.ObjectId;  
  city: string;
  state: string;
}

export interface ITicket extends Document {
  user: IUser | null;  
  area: IArea;  
  draw: any;
  numbers: number[];
  purchased: Date;
  purchaseLocation: string;
  associationCode: string;
  qrCode: string;
}
const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
  numbers: { type: [Number], required: true },
  draw: { type: mongoose.Schema.Types.ObjectId, ref: "Draw" },
  purchased: { type: Date, default: Date.now },
  purchaseLocation: { type: String, required: true },
  associationCode: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true },
}, { timestamps: true });

ticketSchema.pre("save", async function(next) {
  if (this.isNew) {
    const purchaseTime = this.purchased.toISOString();
    const userInfo = this.user ? this.user.toString() : "colaborador";
    const randomToken = crypto.randomBytes(54).toString("hex"); // 54 bytes = 108 characters
    this.associationCode = `${this.purchaseLocation}-${purchaseTime}-${userInfo}-${randomToken}`;
    
    try {
      const verificationUrl = `http://localhost:3000/verify/${this._id}`;
      this.qrCode = await QRCode.toDataURL(verificationUrl);
    } catch (err: any) {
      console.error("Error generating QR code:", err);
      next(err);
    }
  }
  next();
});

const Ticket = mongoose.model<ITicket>("Ticket", ticketSchema);

export { Ticket };