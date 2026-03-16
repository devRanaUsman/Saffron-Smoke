const Blog = require("../models/Blog");

// Create a blog
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: "Create failed", error: err.message });
  }
};

// List all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .select("title slug mainImage intro createdAt")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Update blog by slug
exports.updateBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// Delete blog by slug
exports.deleteBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// Admin function to add blog from form
exports.addBlogFromForm = async (req, res) => {
  try {
    // Validate required fields
    const { title, mainImage, intro } = req.body;

    if (!title || !mainImage || !intro) {
      return res.status(400).json({
        message: "Title, main image, and intro are required fields",
      });
    }

    // Create the blog
    const blog = await Blog.create(req.body);

    res.status(201).json({
      message: "Blog post added successfully!",
      blog: blog,
    });
  } catch (err) {
    console.error("Admin add blog error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Blog with this title already exists (duplicate slug)",
      });
    }

    res.status(400).json({
      message: "Failed to add blog post",
      error: err.message,
    });
  }
};
