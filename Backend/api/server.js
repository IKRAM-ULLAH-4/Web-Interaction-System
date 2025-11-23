import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "../routes/index.js";

dotenv.config();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5000";

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// IMPORTANT FIX: REMOVE /api PREFIX HERE
app.use(apiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// MongoDB connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;

  const MONGO =
    process.env.MONGODB_URI?.trim() || process.env.MONGO_URI?.trim();
  if (!MONGO) {
    throw new Error("MONGODB_URI (or MONGO_URI) not set");
  }

  await mongoose.connect(MONGO);
  console.log("Mongo connected");
  isConnected = true;
};

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
}

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connect failed:", err);
    res.status(500).json({ message: "Database connection failed" });
    return;
  }

  app(req, res);
}
