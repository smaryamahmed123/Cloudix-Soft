import express from "express";
import multer from "multer";
import { getAbout, createAbout, updateAbout } from "../controllers/aboutController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAbout);
router.post("/", upload.any(), createAbout);
router.put("/:id", upload.any(), updateAbout);

export default router;
