import express from "express";
import multer from "multer";
import {
  addWebsite,
  getWebsites,
  deleteWebsite,
  reorderWebsites
} from "../controllers/websiteController.js";
import { verifyAdmin } from "../middelware/authMiddelware.js";
import { upload } from "../middelware/upload.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
// Client
router.get("/", getWebsites);

// Admin
router.put("/reorder", reorderWebsites);
router.post("/", upload.single("image"), addWebsite);
router.delete("/:id", deleteWebsite);

export default router;
