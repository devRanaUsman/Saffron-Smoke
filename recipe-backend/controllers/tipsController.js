const Tips = require("../models/tips");

// Get all tips
exports.getAllTips = async (req, res) => {
  try {
    const tips = await Tips.find()
      .select("title slug mainImage intro createdAt")
      .sort({ createdAt: -1 });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get single tip by slug
exports.getSingleTipBySlug = async (req, res) => {
  try {
    const title = req.body;
    console.log("Title from request body:", title);
    const tip = await Tips.findOne({ slug: req.params.slug });
    if (!tip) return res.status(404).json({ message: "Tip not found" });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Admin function to add tip from form
exports.addTipFromForm = async (req, res) => {
  try {
    // Validate required fields
    const { title, mainImage, intro } = req.body;

    if (!title || !mainImage || !intro) {
      return res.status(400).json({
        message: "Title, main image, and intro are required fields",
      });
    }

    // Create the tip
    const tip = await Tips.create(req.body);

    res.status(201).json({
      message: "Tip added successfully!",
      tip: tip,
    });
  } catch (err) {
    console.error("Admin add tip error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Tip with this title already exists (duplicate slug)",
      });
    }

    res.status(400).json({
      message: "Failed to add tip",
      error: err.message,
    });
  }
};
