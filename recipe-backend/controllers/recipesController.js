const Recipe = require("../models/Recipe");

// Create a recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);

    // Fire-and-forget: notify subscribers about new recipe
    try {   
      const { notifySubscribersNewRecipe } = require("../utils/mailer");
      notifySubscribersNewRecipe(recipe).catch((e) =>
        console.error("Notify subscribers failed:", e.message)
      );
    } catch (e) {
      console.error("Mailer not configured:", e.message);
    }
  } catch (err) {
    res.status(400).json({ message: "Create failed", error: err.message });
  }
};

// List recipes (optionally by section and/or category, and search by query)
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
exports.getRecipes = async (req, res) => {
  try {
    const filter = {};
    const { section, category, q, ramadan, inEid } = req.query;

    if (section !== undefined) filter.section = section;
    if (category !== undefined) filter.category = category;
    if (ramadan === "true") filter.isRamadan = true;
    if (inEid === "true") filter.inEid = true;

    // Build search conditions when q is provided
    let query = Recipe.find(filter);
    if (q && q.trim()) {
      const term = q.trim();
      const regex = new RegExp(
        term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      ); // escape and make case-insensitive

      // If the query looks like a slug (lowercase, dash-separated, no spaces), try exact slug match first
      const isSlugLike = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(term);
      if (isSlugLike) {
        // Try to return only that recipe if exists
        const exact = await Recipe.findOne({ slug: term });
        if (exact) return res.json([exact]);
      }

      // Generic search across title, slug, and tags
      query = Recipe.find({
        ...filter,
        $or: [{ title: regex }, { slug: regex }, { tags: { $in: [regex] } }],
      });
    }

    const recipes = await query.sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get by slug
exports.getRecipeBySlug = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug });
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
// Update by slug
exports.updateRecipeBySlug = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Get blog post with related recipes (placeholder)
exports.getBlogWithRelatedRecipes = async (req, res) => {
  try {
    // For now, just return empty array or relevant recipes
    const recipes = await Recipe.find().limit(5);
    res.json({ blog: null, relatedRecipes: recipes });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get content by slug (handles all content types)
exports.getContentBySlug = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ slug: req.params.slug });
    if (recipe) {
      return res.json({ type: "recipe", content: recipe });
    }

    // Could also check for blogs here
    res.status(404).json({ message: "Content not found" });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get recipes by collection
exports.getRecipesByCollection = async (req, res) => {
  try {
    const { collectionType } = req.params;
    const filter = {};

    // Map collection types to filters
    switch (collectionType) {
      case "ramadan":
        filter.isRamadan = true;
        break;
      case "eid":
        filter.inEid = true;
        break;
      case "popular":
        // Could add a popular field or sort by views
        break;
      default:
        // Default to all recipes
        break;
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Admin function to add recipe from form
exports.addRecipeFromForm = async (req, res) => {
  try {
    // Validate required fields
    const { title, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        message: "Title and image are required fields",
      });
    }

    // Create the recipe
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      message: "Recipe added successfully!",
      recipe: recipe,
    });

    // Fire-and-forget: notify subscribers about new recipe
    try {
      const { notifySubscribersNewRecipe } = require("../utils/mailer");
      notifySubscribersNewRecipe(recipe).catch((e) =>
        console.error("Notify subscribers failed:", e.message)
      );
    } catch (e) {
      console.error("Mailer not configured:", e.message);
    }
  } catch (err) {
    console.error("Admin add recipe error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Recipe with this title already exists (duplicate slug)",
      });
    }

    res.status(400).json({
      message: "Failed to add recipe",
      error: err.message,
    });
  }
};
