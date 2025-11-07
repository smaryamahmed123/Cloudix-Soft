import express from "express";
import multer from "multer";
import { getLogos, addLogo, deleteLogo, reorderLogos } from "../controllers/logoController.js";

const router = express.Router();

// 🧠 Multer with memory storage (for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", getLogos);
router.post("/", upload.single("image"), addLogo);
router.put("/reorder", reorderLogos);
router.delete("/:id", deleteLogo);

export default router;
