import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI not set — running without database (leads will not be persisted)");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.info("MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.warn("MongoDB disconnected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error", err);
    });
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}
