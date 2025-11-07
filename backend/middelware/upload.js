// backend/middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "services", // all images will be stored in this Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
  },
});

export const upload = multer({ storage });
