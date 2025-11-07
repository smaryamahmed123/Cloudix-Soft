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

const router = express.Router();

router.get("/", getAllServices);
router.post("/", upload.single("iconImage"), createService);
router.put("/reorder", reorderServices);
router.put("/:id", upload.single("iconImage"), updateService);
router.delete("/:id", deleteService);
router.put("/:id/visibility", updateVisibility); // 👈 add this line

export default router;
