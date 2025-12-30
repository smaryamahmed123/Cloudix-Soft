import express from "express";
import multer from "multer";
import {
     addPost,
     getPosts, 
     deletePost, 
     reorderPosts 
    } from "../controllers/postController.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getPosts);
router.put("/reorder", reorderPosts);
router.post("/", upload.single("image"), addPost);
router.delete("/:id", deletePost);

export default router;
