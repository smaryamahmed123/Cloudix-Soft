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
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    coverImagePublicId: {
      type: String,
      default: "",
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
      default: "Cloudix Soft Team",
    },

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    visible: {
      type: Boolean,
      default: true,
    },

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