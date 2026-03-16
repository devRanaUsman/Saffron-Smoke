const mongoose = require("mongoose");

// Simple slug generator
function toSlug(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["heading", "paragraph", "image", "subheading"],
  },
  content: { type: String, required: true }, // For text or image URL
  level: { type: Number, default: 1 }, // For headings (h1, h2, etc.)
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    mainImage: { type: String, required: true },
    intro: { type: String, required: true },

    content: [contentBlockSchema],
    faqs: [faqSchema],
  },
  { timestamps: true }
);

// Pre-save hook to generate slug
blogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = toSlug(this.title);
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
