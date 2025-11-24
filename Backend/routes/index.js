import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Feature from "../models/feature.model.js";

import {
  createCredentials,
  getLoginCredentials,
  logout,
  getCurrentUser,
} from "../controllers/LoginCredentialController.js";

import { getSteps } from "../controllers/step.contoller.js";
import Step from "../models/Step.model.js";

import { getAllUsers, updateProfile } from "../controllers/user.contoller.js";
import auth from "../middleware/auth.js";

import {
  getConversation,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

import { getConfimation } from "../controllers/Stripe.controller.js";

const router = express.Router();

// ---------- Multer Setup ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.originalname}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// ---------- Auth Routes ----------
router.post("/register", createCredentials);
router.post("/login", getLoginCredentials);
router.post("/logout", logout);
router.get("/me", auth, getCurrentUser);

// ---------- Profile ----------
router.put("/profile", auth, upload.single("avatar"), updateProfile);

// ---------- Messages ----------
router.get("/messages/:userId", auth, getConversation);
router.post("/messages", auth, createMessage);
router.put("/messages/:id", auth, updateMessage);
router.delete("/messages/:id", auth, deleteMessage);

// ---------- Steps ----------
router.get("/steps", async (req, res) => {
  const steps = await Step.find().sort({ number: 1 });
  res.json(steps);
});
//--------get feature for landing page
router.get("/features", async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    console.error("Error fetching features:", err);
    res.status(500).json({ message: "Failed to fetch features" });
  }
});
// Public welcome route
router.get("/", getSteps);

// ---------- Users ----------
router.get("/u", getAllUsers);

// ---------- Stripe Checkout ----------
router.post("/create-checkout-session", auth, getConfimation);

export default router;
