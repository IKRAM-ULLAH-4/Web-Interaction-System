import express from "express";
import { getFeatures,} from "../controllers/feature.controller.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getFeatures);               // Public
// router.post("/", adminAuth, createFeature); // Admin only
// router.put("/:id", adminAuth, updateFeature); 
// router.delete("/:id", adminAuth, deleteFeature);

export default router;
