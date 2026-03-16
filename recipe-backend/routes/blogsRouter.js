const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");

// Create a blog
router.post("/", blogsController.createBlog);

// Get all blogs
router.get("/", blogsController.getAllBlogs);

// Get blog by slug
router.get("/by-slug/:slug", blogsController.getBlogBySlug);

// Update blog by slug
router.put("/by-slug/:slug", blogsController.updateBlogBySlug);

// Delete blog by slug
router.delete("/by-slug/:slug", blogsController.deleteBlogBySlug);

// Admin route for adding blogs via form
router.post("/admin/add", blogsController.addBlogFromForm);

module.exports = router;
