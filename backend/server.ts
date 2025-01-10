import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes";
import { adminRouter } from "./routes/adminRoutes";
import { connectDB } from "./config/database";
import { IUser } from '../backend/models/userInterface';

declare global {
  namespace Express {
    interface Request {
      user?:  IUser | null; 
    }
  }
}
declare module 'express' {
  export interface Request {
    user?:  IUser | null; 
  }
}
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

