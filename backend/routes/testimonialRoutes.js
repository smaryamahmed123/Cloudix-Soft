import express from "express";

import {
    getTestimonials,
    getPublishedTestimonials,
    addTestimonial,
    deleteTestimonial,
    reorderTestimonials,
} from "../controllers/testimonialController.js";

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
    getTestimonials
);

// =====================================================
// ADD
// =====================================================

router.post(
    "/",
    addTestimonial
);

// =====================================================
// REORDER
// =====================================================

router.put(
    "/reorder",
    reorderTestimonials
);

// =====================================================
// DELETE
// =====================================================

router.delete(
    "/:id",
    deleteTestimonial
);

export default router;