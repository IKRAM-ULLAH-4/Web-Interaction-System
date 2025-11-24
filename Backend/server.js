import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import apiRoutes from "./routes/index.js";
import Stripe from "stripe";
import { handleWebhook } from "./controllers/Stripe.controller.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// --- __dirname setup for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder (for avatars, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Stripe Webhook MUST come BEFORE express.json() ---
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

// Normal middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ,
    credentials: true,
  })
);

// Mount all API routes under /api
app.use("/api", apiRoutes);

// Error handler (catch all)
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
