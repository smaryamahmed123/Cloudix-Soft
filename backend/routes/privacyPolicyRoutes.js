import express from "express";
import {
    getPolicy,
    updatePolicy,
    deletePolicy,
} from "../controllers/privacyPolicyController.js";
import { verifyAdmin } from "../middelware/authMiddelware.js";

const router = express.Router();

router.get("/", getPolicy);
router.post("/update", verifyAdmin, updatePolicy);
router.delete("/", verifyAdmin, deletePolicy);

export default router;
