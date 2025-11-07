import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Service from "../models/services.js";
import cloudinary from "../config/cloudinary.js";

// backend/controllers/servicesControllers.js
export const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { visible } = req.body;

    const updated = await Service.findByIdAndUpdate(
      id,
      { visible },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Visibility update error:", error);
    res.status(500).json({ error: "Failed to update visibility" });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // createService controller
    const iconImage = req.file ? req.file.path : null;  // ✅ Cloudinary URL
    const iconImagePublicId = req.file?.filename; // ✅ Cloudinary public ID

    const newService = new Service({ title, description, iconImage, iconImagePublicId });
    await newService.save();

    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Create service error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    let iconImage = service.iconImage;
    let iconImagePublicId = service.iconImagePublicId;

    // If new image uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (iconImagePublicId) {
        await cloudinary.uploader.destroy(iconImagePublicId);
      }

      iconImage = req.file.path;
      iconImagePublicId = req.file.filename;
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      { title: req.body.title, description: req.body.description, iconImage, iconImagePublicId },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("❌ Update service error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Delete from Cloudinary
    if (service.iconImagePublicId) {
      await cloudinary.uploader.destroy(service.iconImagePublicId);
    }

    await Service.findByIdAndDelete(id);
    res.json({ message: "Service and image deleted" });
  } catch (err) {
    console.error("❌ Delete service error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getAllServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// export const createService = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const iconImage = req.file ? `/uploads/services/${req.file.filename}` : null;

//     const newService = new Service({ iconImage, title, description });
//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);

//     if (!service) return res.status(404).json({ message: "Service not found" });

//     // If a new image is uploaded, delete old one
//     // if (req.file && service.iconImage) {
//     //   const oldPath = path.join(process.cwd(), service.iconImage);
//     //   if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//     // }
//     if (req.file && service.iconImage) {
//       const oldPath = path.join(process.cwd(), service.iconImage);
//       if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//     }

//     const updated = await Service.findByIdAndUpdate(
//       id,
//       {
//         title: req.body.title,
//         description: req.body.description,
//         iconImage: req.file ? `/uploads/services/${req.file.filename}` : service.iconImage,
//       },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);

//     if (!service) return res.status(404).json({ message: "Service not found" });

//     // Delete the image file
//     if (service.iconImage) {
//       const imagePath = path.join(process.cwd(), service.iconImage);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     }

//     await Service.findByIdAndDelete(id);
//     res.json({ message: "Service and image deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const reorderServices = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid IDs array" });
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      // ✅ Validate ID before updating
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`❌ Invalid ObjectId: ${id}`);
        continue; // ⬅ skip invalid ID instead of crashing
      }

      try {
        const updated = await Service.findByIdAndUpdate(id, { order: i });
        if (!updated) {
          console.error(`❌ No service found with ID: ${id}`);
        }
      } catch (err) {
        console.error(`❌ Failed to update order for ID ${id}:`, err);
        return res.status(500).json({
          error: `Failed to update ID ${id}`,
          details: err.message
        });
      }

    }

    res.status(200).json({ success: true, message: "Services reordered successfully" });
  } catch (err) {
    console.error("❌ Reorder error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};