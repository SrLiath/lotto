import express from "express";
import { register, login, updateProfile, updatePaymentInfo } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

export const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/profile", protect, updateProfile);
userRouter.put("/payment", protect, updatePaymentInfo);

