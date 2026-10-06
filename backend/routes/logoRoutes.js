import express from "express";
import multer from "multer";
import { verifyAdmin } from '../middelware/authMiddelware.js';
import { getLogos, addLogo, deleteLogo, reorderLogos } from "../controllers/logoController.js";

const router = express.Router();

// 🧠 Multer with memory storage (for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", getLogos);
router.post("/", verifyAdmin, upload.single("image"), addLogo);
router.put("/reorder", verifyAdmin, reorderLogos);
router.delete("/:id", verifyAdmin, deleteLogo);

export default router;
