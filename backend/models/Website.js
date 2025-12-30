// models/Website.js
import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    link: { type: String, required: true },
    category: {
      type: String,
      enum: ["static", "ecommerce"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Website", websiteSchema);
