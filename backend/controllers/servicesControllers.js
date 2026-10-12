import mongoose from "mongoose";
import Service from "../models/services.js";
import cloudinary from "../config/cloudinary.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ---------------------------------------
   GET (public): visible services only, in drag-and-drop order
   ({ $ne: false } so older documents without a `visible` field still show up)
--------------------------------------- */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ visible: { $ne: false } }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json(services);
  } catch (err) {
    console.error("❌ Get services error:", err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/* ---------------------------------------
   GET (admin): everything, including hidden
--------------------------------------- */
export const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (err) {
    console.error("❌ Get admin services error:", err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/* ---------------------------------------
   VISIBILITY
--------------------------------------- */
export const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    // FormData / JSON can both arrive as strings
    const visible = req.body.visible === true || req.body.visible === "true";

    const updated = await Service.findByIdAndUpdate(id, { visible }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Visibility update error:", error);
    res.status(500).json({ message: "Failed to update visibility" });
  }
};

/* ---------------------------------------
   CREATE
--------------------------------------- */
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const iconImage = req.file ? req.file.path : null; // Cloudinary URL
    const iconImagePublicId = req.file?.filename; // Cloudinary public ID

    // New services go to the end of the list (otherwise they sort to the top)
    const last = await Service.findOne().sort({ order: -1 });
    const order = last ? (last.order || 0) + 1 : 0;

    const newService = new Service({
      title: title.trim(),
      description: description.trim(),
      iconImage,
      iconImagePublicId,
      order,
    });
    await newService.save();

    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Create service error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------
   UPDATE
--------------------------------------- */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const update = {};
    if (req.body.title?.trim()) update.title = req.body.title.trim();
    if (req.body.description?.trim()) update.description = req.body.description.trim();

    // New image was already uploaded by the upload middleware
    if (req.file) {
      if (service.iconImagePublicId) {
        try {
          await cloudinary.uploader.destroy(service.iconImagePublicId);
        } catch (error) {
          console.error("Old icon deletion failed:", error.message);
        }
      }

      update.iconImage = req.file.path;
      update.iconImagePublicId = req.file.filename;
    }

    const updated = await Service.findByIdAndUpdate(id, update, { new: true });

    res.json(updated);
  } catch (err) {
    console.error("❌ Update service error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------
   DELETE
--------------------------------------- */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }

    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // A Cloudinary hiccup must not stop the service from being deleted
    if (service.iconImagePublicId) {
      try {
        await cloudinary.uploader.destroy(service.iconImagePublicId);
      } catch (error) {
        console.error("Cloudinary deletion failed:", error.message);
      }
    }

    await Service.findByIdAndDelete(id);
    res.json({ message: "Service and image deleted" });
  } catch (err) {
    console.error("❌ Delete service error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------
   REORDER (one bulk write instead of one query per service)
--------------------------------------- */
export const reorderServices = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid IDs array" });
    }

    const operations = ids
      .map((id, index) => ({ id, index }))
      .filter(({ id }) => isValidId(id))
      .map(({ id, index }) => ({
        updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
      }));

    if (operations.length) {
      await Service.bulkWrite(operations);
    }

    res.status(200).json({ success: true, message: "Services reordered successfully" });
  } catch (err) {
    console.error("❌ Reorder error:", err);
    res.status(500).json({ message: "Failed to reorder services" });
  }
};