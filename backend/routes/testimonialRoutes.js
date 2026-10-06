import express from "express";

import {
    getTestimonials,
    getPublishedTestimonials,
    addTestimonial,
    deleteTestimonial,
    reorderTestimonials,
} from "../controllers/testimonialController.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

// =====================================================
// GET
// =====================================================

router.get(
    "/published",
    getPublishedTestimonials
);

router.get(
    "/",
    verifyAdmin,
    getTestimonials
);

router.post(
    "/",
    verifyAdmin,
    addTestimonial
);

router.put(
    "/reorder",
    verifyAdmin,
    reorderTestimonials
);

router.delete(
    "/:id",
    verifyAdmin,
    deleteTestimonial
);

export default router;