import mongoose from "mongoose";

let isConnected = false; // Prevent multiple connections

export const connectDB = async () => {
  if (isConnected) return; // Use existing connection

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
