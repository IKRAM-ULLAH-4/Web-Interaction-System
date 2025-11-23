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
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// Serve uploads folder statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// MongoDB connection helper
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  const MONGO = process.env.MONGO_URI;
  if (!MONGO) throw new Error("MONGO_URI not set");
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Mongo connected");
  isConnected = true;
};

// Vercel serverless handler
export default async function handler(req, res) {
  await connectDB(); // Ensure DB is connected

  // Use Express to handle the request
  app(req, res);
}
