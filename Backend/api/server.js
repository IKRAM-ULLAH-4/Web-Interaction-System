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

// Serve uploads folder statically (optional in serverless — fine for static reads)
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
  // Accept either MONGODB_URI or MONGO_URI (more tolerant)
  const MONGO =
    process.env.MONGODB_URI?.trim() || process.env.MONGO_URI?.trim();
  if (!MONGO) {
    throw new Error("MONGODB_URI (or MONGO_URI) not set");
  }
  // Options are not strictly needed on mongoose v6+, but safe to include
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Mongo connected");
  isConnected = true;
};

// Vercel serverless handler
export default async function handler(req, res) {
  try {
    await connectDB(); // Ensure DB is connected before handling
  } catch (err) {
    console.error("DB connect failed:", err);
    // Return 500 so client sees a clear error during invocations
    res.status(500).json({ message: "Database connection failed" });
    return;
  }

  // Use the Express app to handle the request
  // (do NOT call app.listen in serverless)
  app(req, res);
}