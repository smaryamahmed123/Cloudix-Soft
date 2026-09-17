import mongoose from "mongoose";
import slugify from "slugify";

import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import { sendBlogNotification } from "../utils/sendBlogNotification.js";

/* ---------------------------------------
   Helper: Upload buffer to Cloudinary
--------------------------------------- */

const uploadToCloudinary = (buffer, folder = "blogs") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
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

    uploadStream.end(buffer);
  });
};

/* ---------------------------------------
   Helper: Create unique slug
--------------------------------------- */

const createUniqueSlug = async (title, existingId = null) => {
  let baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!baseSlug) {
    baseSlug = `blog-${Date.now()}`;
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };

    if (existingId) {
      query._id = { $ne: existingId };
    }

    const existing = await Blog.findOne(query);

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

/* ---------------------------------------
   GET ALL BLOGS
--------------------------------------- */

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      visible: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(blogs);
  } catch (err) {
    console.error("Get blogs error:", err);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
};

/* ---------------------------------------
   GET SINGLE BLOG
--------------------------------------- */

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      visible: true,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, {
      $inc: { views: 1 },
    });

    res.json(blog);
  } catch (err) {
    console.error("Get single blog error:", err);

    res.status(500).json({
      message: "Failed to fetch blog",
    });
  }
};

/* ---------------------------------------
   CREATE BLOG
--------------------------------------- */

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      author,
      seoTitle,
      seoDescription,
      slug: requestedSlug,
      visible,
    } = req.body;

    /* Validation */

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Blog title is required",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Blog content is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        message: "Blog category is required",
      });
    }

    /* Slug */

    const slug = requestedSlug
      ? await createUniqueSlug(requestedSlug)
      : await createUniqueSlug(title);

    /* Order */

    const lastBlog = await Blog.findOne().sort({
      order: -1,
    });

    const nextOrder = lastBlog
      ? (lastBlog.order || 0) + 1
      : 0;

    /* Cover image */

    let coverImage = "";
    let coverImagePublicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "blogs/covers"
      );

      coverImage = result.secure_url;
      coverImagePublicId = result.public_id;
    }

    /* Create blog */

    const blog = new Blog({
      title: title.trim(),
      slug,
      content,
      excerpt: excerpt?.trim() || "",
      category: category.trim(),
      author: author?.trim() || "Cloudix Soft Team",
      seoTitle: seoTitle?.trim() || title.trim(),
      seoDescription:
        seoDescription?.trim() ||
        excerpt?.trim() ||
        title.trim(),
      coverImage,
      coverImagePublicId,
      visible:
        visible === undefined
          ? true
          : visible === "true" || visible === true,
      order: nextOrder,
    });

    const savedBlog = await blog.save();

    /* Email notification */

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

    res.status(500).json({
      message: err.message || "Failed to create blog",
    });
  }
};

/* ---------------------------------------
   UPDATE BLOG
--------------------------------------- */

export const updateBlog = async (req, res) => {
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

    const {
      title,
      content,
      excerpt,
      category,
      author,
      seoTitle,
      seoDescription,
      slug: requestedSlug,
      visible,
    } = req.body;

    /* Update slug if title/slug changed */

    let slug = blog.slug;

    if (requestedSlug && requestedSlug !== blog.slug) {
      slug = await createUniqueSlug(requestedSlug, id);
    } else if (title && title !== blog.title) {
      slug = await createUniqueSlug(title, id);
    }

    /* Update fields */

    blog.title = title?.trim() || blog.title;
    blog.slug = slug;
    blog.content = content || blog.content;
    blog.excerpt =
      excerpt?.trim() ?? blog.excerpt;
    blog.category =
      category?.trim() || blog.category;
    blog.author =
      author?.trim() || blog.author;
    blog.seoTitle =
      seoTitle?.trim() || blog.title;
    blog.seoDescription =
      seoDescription?.trim() ||
      blog.excerpt ||
      blog.title;

    if (visible !== undefined) {
      blog.visible =
        visible === "true" || visible === true;
    }

    /* Replace cover image */

    if (req.file) {
      if (blog.coverImagePublicId) {
        try {
          await cloudinary.uploader.destroy(
            blog.coverImagePublicId
          );
        } catch (error) {
          console.error(
            "Old cover image deletion failed:",
            error.message
          );
        }
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        "blogs/covers"
      );

      blog.coverImage = result.secure_url;
      blog.coverImagePublicId = result.public_id;
    }

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (err) {
    console.error("Update blog error:", err);

    res.status(500).json({
      message: err.message || "Failed to update blog",
    });
  }
};

/* ---------------------------------------
   DELETE BLOG
--------------------------------------- */

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

    /* Delete cover image */

    if (blog.coverImagePublicId) {
      try {
        await cloudinary.uploader.destroy(
          blog.coverImagePublicId
        );
      } catch (error) {
        console.error(
          "Cloudinary deletion failed:",
          error.message
        );
      }
    }

    await Blog.findByIdAndDelete(id);

    res.json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error("Delete blog error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* ---------------------------------------
   REORDER BLOGS
--------------------------------------- */

export const reorderBlogs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({
        message: "Invalid IDs array",
      });
    }

    const operations = ids
      .filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      )
      .map((id, index) => ({
        updateOne: {
          filter: {
            _id: id,
          },
          update: {
            $set: {
              order: index,
            },
          },
        },
      }));

    if (operations.length) {
      await Blog.bulkWrite(operations);
    }

    res.json({
      success: true,
      message: "Blogs reordered successfully",
    });
  } catch (err) {
    console.error("Reorder error:", err);

    res.status(500).json({
      message: "Failed to reorder blogs",
    });
  }
};