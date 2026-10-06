import express from "express";
import multer from "multer";

import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  reorderBlogs,
} from "../controllers/blogController.js";
import {
  uploadBlogImage,
} from "../controllers/blogImageController.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

/* ---------------------------------------
   Multer
--------------------------------------- */

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

/* ---------------------------------------
   Routes
--------------------------------------- */

router.get("/", getAllBlogs);

router.post(
  "/upload-image",
  verifyAdmin,
  upload.single("image"),
  uploadBlogImage
);

router.get("/:slug", getBlogBySlug);

router.post(
  "/",
  verifyAdmin,
  upload.single("coverImage"),
  createBlog
);

router.put(
  "/reorder",
  verifyAdmin,
  reorderBlogs
);

router.put(
  "/:id",
  verifyAdmin,
  upload.single("coverImage"),
  updateBlog
);

router.delete(
  "/:id",
  verifyAdmin,
  deleteBlog
);

export default router;