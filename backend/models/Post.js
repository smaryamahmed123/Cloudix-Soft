import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  image: { type: String }, // Cloudinary URL
  public_id: { type: String }, // for deleting from Cloudinary
  createdAt: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
