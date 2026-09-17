import express from "express";
import multer from "multer";

import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  reorderBlogs,
} from "../controllers/blogController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", getAllBlogs);
router.post("/", upload.single("image"), createBlog);
router.put("/reorder", reorderBlogs);
router.delete("/:id", deleteBlog);

export default router;