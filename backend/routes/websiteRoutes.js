import express from "express";
import multer from "multer";
import {
  addWebsite,
  getWebsites,
  deleteWebsite,
  reorderWebsites
} from "../controllers/websiteController.js";
import { verifyAdmin } from "../middelware/authMiddelware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
// Client
router.get("/", getWebsites);

// Admin
router.post("/", upload.single("image"), addWebsite);
router.put("/reorder", verifyAdmin, reorderWebsites);
router.delete("/:id", verifyAdmin, deleteWebsite);

export default router;
