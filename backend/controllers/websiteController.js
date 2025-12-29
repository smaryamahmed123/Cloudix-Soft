import Website from "../models/Website.js";

// ➕ Add Website (Admin)
export const addWebsite = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const website = await Website.create({
      title: req.body.title,
      link: req.body.link,
      category: req.body.category,
      image: req.file.path,
    });

    res.status(201).json(website);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Websites (Client)
export const getWebsites = async (req, res) => {
  try {
    const websites = await Website.find().sort({ createdAt: -1 });
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
