import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGO_URI } from "./envVars.js";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
