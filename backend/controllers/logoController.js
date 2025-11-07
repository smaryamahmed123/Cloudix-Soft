import Logo from "../models/Logo.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

// 🖼️ Get all logos
export const getLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({ order: 1 });
    res.json(logos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Add logo
export const addLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "logos" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Save to DB
        const newLogo = new Logo({
          title: req.body.title,
          image: result.secure_url,
          public_id: result.public_id,
        });
        const saved = await newLogo.save();
        res.status(201).json(saved);
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑️ Delete logo
export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    // 🧹 Delete image from Cloudinary too
    if (logo.public_id) {
      await cloudinary.uploader.destroy(logo.public_id);
    }

    await Logo.findByIdAndDelete(req.params.id);
    res.json({ message: "Logo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const reorderLogos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid IDs array" });
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      // ✅ Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`❌ Invalid ObjectId: ${id}`);
        continue;
      }

      try {
        const updated = await Logo.findByIdAndUpdate(id, { order: i });
        if (!updated) {
          console.error(`❌ No logo found with ID: ${id}`);
        }
      } catch (err) {
        console.error(`❌ Failed to update order for ID ${id}:`, err);
        return res.status(500).json({
          error: `Failed to update ID ${id}`,
          details: err.message,
        });
      }
    }

    res.status(200).json({ success: true, message: "Logos reordered successfully" });
  } catch (err) {
    console.error("❌ Reorder error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
