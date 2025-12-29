import express from "express";
import {
  addWebsite,
  getWebsites,
  deleteWebsite,
} from "../controllers/websiteController.js";
import adminAuth from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Client
router.get("/", getWebsites);

// Admin
router.post("/", adminAuth, upload.single("image"), addWebsite);
router.delete("/:id", adminAuth, deleteWebsite);

export default router;
