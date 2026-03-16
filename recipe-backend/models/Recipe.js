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

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    ingredientsInUrdu: { type: [String], default: [] },
    instructionsInUrdu: { type: [String], default: [] },
    titleInUrdu: { type: String, default: "" },
    descriptionInUrdu: { type: String, default: "" },
    prepTime: String,
    cookTime: String,
    totalTime: String,
    servings: String,

    author: {
      name: { type: String },
      image: { type: String },
      bio: { type: String },
    },

    isRamadan: { type: Boolean, default: false },
    inEid: { type: Boolean, default: false },

    section: {
      type: String,
      enum: ["popular", "must-try", "general"],
      default: "general",
    },

    category: {
      type: String,
      enum: [
        "appetizers",
        "beverages",
        "breakfast",
        "dip-condiment",
        "dessert",
        "roti-paratha-naan",
        "salad",
        "sandwiches",
        "soup",
        "tikka-kabab-cutlets",
        "vegetarian",
        "rice",
      ],
    },
    tags: { type: [String], default: [] },

    relatedRecipes: [{ type: String, default: [] }], // Array of recipe slugs for blog posts
  },
  { timestamps: true }
);

recipeSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = toSlug(this.title);
  }
  next();
});

module.exports = mongoose.model("Recipe", recipeSchema);
