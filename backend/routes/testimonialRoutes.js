import express from "express";

import {
  getTestimonials,
  getPublishedTestimonials,
  addTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "../controllers/testimonialController.js";

import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const testimonialUpload = upload.fields([
  {
    name: "clientImage",
    maxCount: 1,
  },
  {
    name: "video",
    maxCount: 1,
  },
]);

router.get(
  "/published",
  getPublishedTestimonials
);

router.get(
  "/",
  getTestimonials
);

router.post(
  "/",
  testimonialUpload,
  addTestimonial
);

router.put(
  "/reorder",
  reorderTestimonials
);

router.delete(
  "/:id",
  deleteTestimonial
);

export default router;