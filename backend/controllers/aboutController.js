import About from "../models/aboutus.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
// === GET ===
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    console.error("GET /api/about error:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
};

// === POST ===
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
       { folder: "about" }, 
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// === CREATE ===
export const createAbout = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || "{}");

    for (const file of req.files) {
      const imageUrl = await uploadToCloudinary(file.buffer, "about_section");

      const field = file.fieldname;
      // handle team[] or section
      if (field.startsWith("team[")) {
        const match = field.match(/team\[(\d+)\]\.(\w+)/);
        if (match) {
          const index = Number(match[1]);
          const key = match[2];
          if (!data.team) data.team = [];
          if (!data.team[index]) data.team[index] = {};
          data.team[index][key] = imageUrl;
        }
      } else {
        const [section, key] = field.split(".");
        if (!data[section]) data[section] = {};
        data[section][key] = imageUrl;
      }
    }

    const about = new About(data);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    console.error("❌ POST /api/about error:", error);
    res.status(400).json({ error: error.message });
  }
};
// === PUT ===
export const updateAbout = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || "{}");
    if (!data.team) data.team = [];

    for (const file of req.files) {
      const imageUrl = await uploadToCloudinary(file.buffer, "about_section");

      const field = file.fieldname;
      const match = field.match(/team\[(\d+)\]\.(\w+)/);
      if (match) {
        const index = parseInt(match[1]);
        const key = match[2];
        if (!data.team[index]) data.team[index] = {};
        data.team[index][key] = imageUrl;
      } else {
        const [section, key] = field.split(".");
        if (!data[section]) data[section] = {};
        data[section][key] = imageUrl;
      }
    }

    const updated = await About.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ error: "About document not found" });

    res.json(updated);
  } catch (error) {
    console.error("PUT /api/about error:", error);
    res.status(500).json({ error: error.message });
  }
};

