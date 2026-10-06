import express from "express";
import multer from "multer";
import { getAbout, createAbout, updateAbout } from "../controllers/aboutController.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAbout);
router.post("/", verifyAdmin, upload.any(), createAbout);
router.put("/:id", verifyAdmin, upload.any(), updateAbout);

export default router;
