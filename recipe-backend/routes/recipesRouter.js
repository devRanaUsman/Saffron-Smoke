const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

// Create
router.post("/", recipesController.createRecipe);

// List
router.get("/", recipesController.getRecipes);

// Get blog post with related recipes
router.get("/blog/:slug", recipesController.getBlogWithRelatedRecipes); 

// Get content by slug (handles all content types)
router.get("/content/:slug", recipesController.getContentBySlug);

// Get recipes by collection
router.get(
  "/collection/:collectionType",
  recipesController.getRecipesByCollection
);

// Get by slug
router.get("/:slug", recipesController.getRecipeBySlug);

// Update by slug
router.put("/:slug", recipesController.updateRecipeBySlug);

// Admin route for adding recipes via form
router.post("/admin/add", recipesController.addRecipeFromForm);

//print recipe data
module.exports = router;
