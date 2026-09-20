import express from "express";

import {
    getTestimonialUploadSignature,
} from "../controllers/cloudinaryController.js";

const router = express.Router();

// =====================================================
// TESTIMONIAL CLOUDINARY SIGNATURE
// =====================================================

router.get(
    "/testimonial-upload-signature",
    getTestimonialUploadSignature
);

export default router;