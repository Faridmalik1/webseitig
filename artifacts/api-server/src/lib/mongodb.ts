import mongoose from "mongoose";
import { logger } from "./logger";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    logger.warn("MONGODB_URI not set — running without database (leads will not be persisted)");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    logger.info("MongoDB connected");

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      logger.warn("MongoDB disconnected");
    });
    mongoose.connection.on("error", (err) => {
      logger.error({ err }, "MongoDB error");
    });
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}
