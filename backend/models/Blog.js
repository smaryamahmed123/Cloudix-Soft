import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      default: "General",
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      default: "Admin",
    },

    image: {
      type: String,
      default: "",
    },

    public_id: {
      type: String,
      default: "",
    },

    // Number of times the blog has been viewed
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Allows admin to hide/show a blog
    visible: {
      type: Boolean,
      default: true,
    },

    // Controls blog display order
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);