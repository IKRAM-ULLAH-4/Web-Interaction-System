import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Feature from "../models/feature.model.js";
import stepRoutes from "./step.router.js";
import adminRoutes from "./adminRoutes.js";

import {
  createCredentials,
  getLoginCredentials,
  logout,
  getCurrentUser,
  searchUsersByEmail,
} from "../controllers/LoginCredentialController.js";

import { updateProfile } from "../controllers/user.contoller.js";
import auth from "../middleware/auth.js";

import {
  getConversation,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

import { getConfimation } from "../controllers/Stripe.controller.js";

const router = express.Router();

// ----------------- MULTER SETUP -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // save files in /uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ----------------- AUTH -----------------
router.post("/register", createCredentials);
router.post("/login", getLoginCredentials);
router.post("/logout", logout);
router.get("/me", auth, getCurrentUser);
router.get("/search-users", searchUsersByEmail);

// ----------------- PROFILE -----------------
// Updated to use multer for avatar upload
router.put("/profile", auth, upload.single("avatar"), updateProfile);

// ----------------- MESSAGES -----------------
router.get("/messages/:userId", auth, getConversation);
router.post("/messages", auth, createMessage);
router.put("/messages/:id", auth, updateMessage);
router.delete("/messages/:id", auth, deleteMessage);

// ----------------- STEPS -----------------
router.use("/steps", stepRoutes);

// ----------------- FEATURES -----------------
router.get("/features", async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch features" });
  }
});

// ----------------- ADMIN ROUTES -----------------
router.use("/admin", adminRoutes);

// ----------------- STRIPE -----------------
router.post("/create-checkout-session", auth, getConfimation);

export default router;
