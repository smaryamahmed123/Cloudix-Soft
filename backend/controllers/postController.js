import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// 📥 Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ order: 1, createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ getPosts error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ➕ Add new post
export const addPost = async (req, res) => {
  try {
    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content || "",
      image: imageUrl,
      public_id: publicId,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ addPost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ Delete post (and Cloudinary image)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // If post has an image, delete it from Cloudinary
    if (post.public_id) {
      await cloudinary.uploader.destroy(post.public_id);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("❌ deletePost error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const reorderPosts = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid IDs array" });
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`❌ Invalid ObjectId: ${id}`);
        continue;
      }

      try {
        const updated = await Post.findByIdAndUpdate(id, { order: i });
        if (!updated) {
          console.error(`❌ No post found with ID: ${id}`);
        }
      } catch (err) {
        console.error(`❌ Failed to update order for ID ${id}:`, err);
        return res.status(500).json({
          error: `Failed to update ID ${id}`,
          details: err.message,
        });
      }
    }

    res.status(200).json({ success: true, message: "Posts reordered successfully" });
  } catch (err) {
    console.error("❌ Reorder error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
