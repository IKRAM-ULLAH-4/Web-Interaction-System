import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

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

const router = express.Router();

// Multer setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Auth
router.post("/api/register", createCredentials);
router.post("/api/login", getLoginCredentials);
router.post("/api/logout", logout);
router.get("/api/me", auth, getCurrentUser);

// Profile Update
router.put("/api/profile", auth, upload.single("avatar"), updateProfile);

// Messages
router.get("/api/messages/:userId", auth, getConversation);
router.post("/api/messages", auth, createMessage);
router.put("/api/messages/:id", auth, updateMessage);
router.delete("/api/messages/:id", auth, deleteMessage);

// Steps & Users
router.get("/api/steps", async (req, res) => {
  const steps = await Step.find().sort({ number: 1 });
  res.json(steps);
});

router.get("/api/", getSteps);
router.get("/api/u", getAllUsers);

export default router;
