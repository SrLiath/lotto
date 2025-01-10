import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { encryptData, decryptData } from "../utils/encryption";

export const register = async (req: Request, res: Response) => {
  try{

  const { name, email, password, phone} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    phone
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
}catch(error){
  res.status(401).json({ message: error });
  
}
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
  
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = req.user ? await User.findById(req.user._id) : false;


  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updatePaymentInfo = async (req: Request, res: Response) => {
  const user = req.user ? await User.findById(req.user._id) : false;


  if (user) {
    user.paymentInfo = {
      cardNumber: encryptData(req.body.cardNumber),
      expiryDate: encryptData(req.body.expiryDate),
      cvv: encryptData(req.body.cvv),
    };

    const updatedUser = await user.save();

    res.json({
      message: "Payment information updated successfully",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

