import express from "express";
import multer from "multer";

import {
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  reorderBlogs,
} from "../controllers/blogController.js";
import { uploadBlogImage } from "../controllers/blogImageController.js";
import { verifyAdmin } from "../middelware/authMiddelware.js";

const router = express.Router();

/* ---------------------------------------
   Multer
   4 MB, not 5: Vercel rejects request bodies above ~4.5 MB,
   so a 5 MB image would fail with a 413 before reaching this code.
--------------------------------------- */

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 4 * 1024 * 1024,
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
   (specific paths first, "/:slug" last, so "admin" and "reorder"
   are never mistaken for a slug)
--------------------------------------- */

router.get("/", getAllBlogs);

// Admin list: includes drafts
router.get("/admin/all", verifyAdmin, getAllBlogsAdmin);
router.post("/upload-image", verifyAdmin, upload.single("image"), uploadBlogImage);
router.put("/reorder", verifyAdmin, reorderBlogs);
router.post("/", verifyAdmin, upload.single("coverImage"), createBlog);
router.put("/:id", verifyAdmin, upload.single("coverImage"), updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);
router.get("/:slug", getBlogBySlug);

export default router;