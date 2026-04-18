import mongoose from "mongoose";
import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';
import { sendBlogNotification } from '../utils/sendBlogNotification.js';

// 📥 Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ order: 1 , createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Create a new blog                                               
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'blogs' },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Image upload failed' });
          }

          const blog = new Blog({
            title,
            content,
            category,
            author,
            image: result.secure_url,
            public_id: result.public_id, // ✅ store public_id
          });

          const savedBlog = await blog.save();
          await sendBlogNotification(savedBlog);
          res.status(201).json(savedBlog);
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      const blog = new Blog({ title, content, author, category });
      const savedBlog = await blog.save();

        try {
          await sendBlogNotification(savedBlog);
        } catch (err) {
          console.error("Email failed:", err.message);
        }
      
      res.status(201).json(savedBlog);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// 🗑️ Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // ✅ Delete image from Cloudinary if exists
    if (blog.public_id) {
      try {
        await cloudinary.uploader.destroy(blog.public_id);
        console.log(`🧹 Deleted image: ${blog.public_id}`);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const reorderBlogs = async (req, res) => {
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
        const updated = await Blog.findByIdAndUpdate(id, { order: i });
        if (!updated) {
          console.error(`❌ No blog found with ID: ${id}`);
        }
      } catch (err) {
        console.error(`❌ Failed to update order for ID ${id}:`, err);
        return res.status(500).json({
          error: `Failed to update ID ${id}`,
          details: err.message,
        });
      }
    }

    res.status(200).json({ success: true, message: "Blogs reordered successfully" });
  } catch (err) {
    console.error("❌ Reorder error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
