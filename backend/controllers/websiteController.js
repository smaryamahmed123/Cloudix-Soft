import Website from "../models/Website.js";

// ➕ Add Website (Admin)
export const addWebsite = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "websites" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
const count = await Website.countDocuments();
    const website = await Website.create({
      title: req.body.title,
      link: req.body.link,
      category: req.body.category,
      image: result.secure_url,
      order: count, 
    });

    res.status(201).json(website);
  } catch (error) {
    console.error("❌ addWebsite error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Websites (Client)
export const getWebsites = async (req, res) => {
  try {
    const websites = await Website.find().sort({ order: 1 });
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Website (Admin)
export const deleteWebsite = async (req, res) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.json({ message: "Website deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderWebsites = async (req, res) => {
  const bulkOps = req.body.ids.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { order: index },
    },
  }));

  await Website.bulkWrite(bulkOps);
  res.json({ message: "Order updated" });
};

