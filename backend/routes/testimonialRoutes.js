import express from "express";
import multer from "multer";

import {
    getTestimonials,
    getPublishedTestimonials,
    addTestimonial,
    deleteTestimonial,
    reorderTestimonials,
} from "../controllers/testimonialController.js";

const router = express.Router();

// =====================================================
// MULTER
// =====================================================

const storage = multer.memoryStorage();

const upload = multer({
    storage,

    limits: {
        // Client images only
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        if (file.fieldname === "clientImage") {
            if (
                file.mimetype.startsWith(
                    "image/"
                )
            ) {
                cb(null, true);
            } else {
                cb(
                    new Error(
                        "Only image files are allowed for client image"
                    )
                );
            }

            return;
        }

        cb(null, true);
    },
});

// Only clientImage comes through Vercel
const testimonialUpload = upload.fields([
    {
        name: "clientImage",
        maxCount: 1,
    },
]);

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
    testimonialUpload,
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