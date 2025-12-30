import express from "express";
import {
  addWebsite,
  getWebsites,
  deleteWebsite,
  reorderWebsites
} from "../controllers/websiteController.js";
import { verifyAdmin } from "../middelware/authMiddelware.js";
import { upload } from "../middelware/upload.js";

const router = express.Router();

// Client
router.get("/", getWebsites);

// Admin
router.post("/", upload.single("image"), addWebsite);
router.delete("/:id", deleteWebsite);
router.put("/reorder", reorderWebsites);

export default router;
