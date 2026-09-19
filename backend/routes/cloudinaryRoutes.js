import express from "express";

import {
    getTestimonialVideoSignature,
} from "../controllers/cloudinaryController.js";

const router = express.Router();

// =====================================================
// TESTIMONIAL VIDEO SIGNATURE
// =====================================================

router.get(
    "/testimonial-video-signature",
    getTestimonialVideoSignature
);

export default router;