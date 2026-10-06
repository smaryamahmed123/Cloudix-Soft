import express from "express";

import {
    getTestimonialUploadSignature,
} from "../controllers/cloudinaryController.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

// =====================================================
// TESTIMONIAL CLOUDINARY SIGNATURE
// =====================================================

router.get(
    "/testimonial-upload-signature",
    verifyAdmin,
    getTestimonialUploadSignature
);

export default router;