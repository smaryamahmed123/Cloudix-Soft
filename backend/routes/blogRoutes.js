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
  upload.single("image"),
  uploadBlogImage
);

router.get("/:slug", getBlogBySlug);

router.post(
  "/",
  upload.single("coverImage"),
  createBlog
);

router.put(
  "/reorder",
  reorderBlogs
);

router.put(
  "/:id",
  upload.single("coverImage"),
  updateBlog
);

router.delete(
  "/:id",
  deleteBlog
);

export default router;