import express from "express";
import multer from "multer";
import {
    addPost,
    getPosts,
    deletePost,
    reorderPosts
} from "../controllers/postController.js";
import { verifyAdmin } from '../middelware/authMiddelware.js';

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getPosts);
router.put("/reorder", verifyAdmin, reorderPosts);
router.post("/", verifyAdmin, upload.single("image"), addPost);
router.delete("/:id", verifyAdmin, deletePost);

export default router;
