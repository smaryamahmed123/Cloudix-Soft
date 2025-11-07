import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL from Cloudinary
    required: true,
  },
  public_id: {
    type: String, // For deleting the image from Cloudinary
    required: true,
  },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model("Logo", logoSchema);
