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

// Multer setup for uploads folder
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

// Auth routes
router.post("/register", createCredentials);
router.post("/login", getLoginCredentials);
router.post("/logout", logout);
router.get("/me", auth, getCurrentUser);

// Profile update (multipart) — protected
router.put("/profile", auth, upload.single("avatar"), updateProfile);

// Messages
router.get("/messages/:userId", auth, getConversation);
router.post("/messages", auth, createMessage);
router.put("/messages/:id", auth, updateMessage);
router.delete("/messages/:id", auth, deleteMessage);

// Steps and users
router.get("/steps", async (req, res) => {
  const steps = await Step.find().sort({ number: 1 });
  res.json(steps);
});

router.get("/", getSteps); // public
router.get("/u", getAllUsers);

export default router;
