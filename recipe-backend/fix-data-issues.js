const fs = require("fs");
const path = require("path");

class DataFixer {
  constructor() {
    this.blogsPath = "../output/blogs.json";
    this.recipesPath = "../output/recipes.json";
  }

  // Fix category mapping issues
  fixRecipeCategories(recipes) {
    const categoryMap = {
      // Map common WordPress categories to your schema
      dessert: "dessert",
      desserts: "dessert",
      desert: "dessert",
      beverage: "beverages",
      beverages: "beverages",
      drinks: "beverages",
      breakfast: "breakfast",
      appetizer: "appetizers",
      appetizers: "appetizers",
      starter: "appetizers",
      chicken: "tikka-kabab-cutlets",
      meat: "tikka-kabab-cutlets",
      beef: "tikka-kabab-cutlets",
      mutton: "tikka-kabab-cutlets",
      tikka: "tikka-kabab-cutlets",
      kabab: "tikka-kabab-cutlets",
      kebab: "tikka-kabab-cutlets",
      rice: "rice",
      biryani: "rice",
      pulao: "rice",
      salad: "salad",
      salads: "salad",
      sandwich: "sandwiches",
      sandwiches: "sandwiches",
      soup: "soup",
      soups: "soup",
      roti: "roti-paratha-naan",
      paratha: "roti-paratha-naan",
      naan: "roti-paratha-naan",
      bread: "roti-paratha-naan",
      vegetarian: "vegetarian",
      veg: "vegetarian",
      dip: "dip-condiment",
      sauce: "dip-condiment",
      chutney: "dip-condiment",
    };

    return recipes.map((recipe) => {
      let category = "appetizers"; // default

      // Try to map from existing category
      if (recipe.category && typeof recipe.category === "string") {
        const lowerCat = recipe.category.toLowerCase();
        category = categoryMap[lowerCat] || "appetizers";
      }

      // Try to extract from title if category is still null
      if (!recipe.category || recipe.category === null) {
        const title = recipe.title ? recipe.title.toLowerCase() : "";

        // Check title for category hints
        for (const [key, value] of Object.entries(categoryMap)) {
          if (title.includes(key)) {
            category = value;
            break;
          }
        }
      }

      // Try to extract from tags
      if (recipe.tags && Array.isArray(recipe.tags)) {
        for (const tag of recipe.tags) {
          const lowerTag = tag.toLowerCase();
          if (categoryMap[lowerTag]) {
            category = categoryMap[lowerTag];
            break;
          }
        }
      }

      return {
        ...recipe,
        category: category,
        // Ensure required fields have defaults
        image: recipe.image || "/default-recipe.jpg",
        description: recipe.description || recipe.intro || "Delicious recipe",
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [],
        instructions: Array.isArray(recipe.instructions)
          ? recipe.instructions
          : [],
        ingredientsInUrdu: Array.isArray(recipe.ingredientsInUrdu)
          ? recipe.ingredientsInUrdu
          : [],
        instructionsInUrdu: Array.isArray(recipe.instructionsInUrdu)
          ? recipe.instructionsInUrdu
          : [],
        titleInUrdu: recipe.titleInUrdu || "",
        descriptionInUrdu: recipe.descriptionInUrdu || "",
        tags: Array.isArray(recipe.tags) ? recipe.tags : [],
        relatedRecipes: Array.isArray(recipe.relatedRecipes)
          ? recipe.relatedRecipes
          : [],
      };
    });
  }

  // Fix blog image issues
  fixBlogImages(blogs) {
    return blogs.map((blog) => ({
      ...blog,
      mainImage: blog.mainImage || "/default-blog.jpg",
      intro: blog.intro || blog.description || "Interesting blog post",
      content: Array.isArray(blog.content) ? blog.content : [],
      faqs: Array.isArray(blog.faqs) ? blog.faqs : [],
    }));
  }

  async fixData() {
    console.log("🔧 Fixing data issues...");

    try {
      // Fix recipes
      if (fs.existsSync(this.recipesPath)) {
        const recipesData = JSON.parse(
          fs.readFileSync(this.recipesPath, "utf8")
        );
        console.log(`📥 Found ${recipesData.length} recipes to fix`);

        const fixedRecipes = this.fixRecipeCategories(recipesData);

        // Write fixed data
        const fixedRecipesPath = this.recipesPath.replace(
          ".json",
          "-fixed.json"
        );
        fs.writeFileSync(
          fixedRecipesPath,
          JSON.stringify(fixedRecipes, null, 2)
        );

        console.log(`✅ Fixed recipes saved to: ${fixedRecipesPath}`);

        // Show category distribution
        const categoryCount = {};
        fixedRecipes.forEach((recipe) => {
          categoryCount[recipe.category] =
            (categoryCount[recipe.category] || 0) + 1;
        });
        console.log("📊 Category distribution:", categoryCount);
      }

      // Fix blogs
      if (fs.existsSync(this.blogsPath)) {
        const blogsData = JSON.parse(fs.readFileSync(this.blogsPath, "utf8"));
        console.log(`📥 Found ${blogsData.length} blogs to fix`);

        const fixedBlogs = this.fixBlogImages(blogsData);

        // Write fixed data
        const fixedBlogsPath = this.blogsPath.replace(".json", "-fixed.json");
        fs.writeFileSync(fixedBlogsPath, JSON.stringify(fixedBlogs, null, 2));

        console.log(`✅ Fixed blogs saved to: ${fixedBlogsPath}`);
      }

      console.log("🎉 Data fixing completed!");
      console.log("\n📋 NEXT STEPS:");
      console.log("1. Review the fixed JSON files");
      console.log("2. Update your migration script to use the fixed files");
      console.log("3. Re-run the migration");
    } catch (error) {
      console.error("❌ Data fixing failed:", error.message);
    }
  }
}

// CLI usage
if (require.main === module) {
  const fixer = new DataFixer();
  fixer.fixData();
}

module.exports = DataFixer;
