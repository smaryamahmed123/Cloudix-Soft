import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import { sendBlogNotification } from "../utils/sendBlogNotification.js";
import slugify from "slugify";

const createUniqueSlug = async (title) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};


// 📥 Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Get blogs error:", err);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};


// ➕ Create blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      category,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (!category?.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (!author?.trim()) {
      return res.status(400).json({
        message: "Author is required",
      });
    }

    const slug = await createUniqueSlug(title);

    let image = "";
    let public_id = "";

    if (req.file) {
      const uploadResult = await new Promise(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder: "blogs",
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          uploadStream.end(req.file.buffer);
        }
      );

      image = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    const latestBlog = await Blog.findOne()
      .sort({ order: -1 })
      .select("order")
      .lean();

    const nextOrder =
      latestBlog?.order != null
        ? latestBlog.order + 1
        : 0;

    const blog = new Blog({
      title: title.trim(),
      slug,
      content: content.trim(),
      category: category.trim(),
      author: author.trim(),
      image,
      public_id,
      order: nextOrder,
    });

    const savedBlog = await blog.save();

    try {
      await sendBlogNotification(savedBlog);
    } catch (emailError) {
      console.error(
        "Blog notification failed:",
        emailError.message
      );
    }

    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Create blog error:", err);

    res.status(400).json({
      message: err.message || "Failed to create blog",
    });
  }
};


// 🗑️ Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.public_id) {
      try {
        await cloudinary.uploader.destroy(
          blog.public_id
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary deletion error:",
          cloudinaryError
        );
      }
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error("Delete blog error:", err);

    res.status(500).json({
      message: "Failed to delete blog",
    });
  }
};


// 🔀 Reorder blogs
export const reorderBlogs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid IDs array",
      });
    }

    const operations = [];

    ids.forEach((id, index) => {
      if (
        mongoose.Types.ObjectId.isValid(id)
      ) {
        operations.push({
          updateOne: {
            filter: { _id: id },
            update: { $set: { order: index } },
          },
        });
      }
    });

    if (operations.length > 0) {
      await Blog.bulkWrite(operations);
    }

    res.status(200).json({
      success: true,
      message: "Blogs reordered successfully",
    });
  } catch (err) {
    console.error("Reorder blogs error:", err);

    res.status(500).json({
      message: "Failed to reorder blogs",
    });
  }
};