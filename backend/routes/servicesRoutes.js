// backend/routes/servicesRoutes.js
import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
  updateVisibility
} from "../controllers/servicesControllers.js";
import { upload } from "../middelware/upload.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

router.get("/", getAllServices);
router.post("/", verifyAdmin, upload.single("iconImage"), createService);
router.put("/reorder", verifyAdmin, reorderServices);
router.put("/:id", verifyAdmin, upload.single("iconImage"), updateService);
router.delete("/:id", verifyAdmin, deleteService);
router.put("/:id/visibility", verifyAdmin, updateVisibility);

export default router;
