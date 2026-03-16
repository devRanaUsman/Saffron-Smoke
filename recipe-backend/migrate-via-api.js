const mongoose = require("mongoose");
const axios = require("axios");
const Recipe = require("./models/Recipe");
const Blog = require("./models/Blog");
const Tip = require("./models/tips");

class WordPressAPIMigrator {
  constructor(wpBaseUrl = "https://therecipespk.com") {
    this.wpBaseUrl = wpBaseUrl;
    this.apiBase = `${wpBaseUrl}/wp-json/wp/v2`;
  }

  async connectDB() {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/recipe-db"
    );
    console.log("✅ Connected to MongoDB");
  }

  // Fetch all posts with pagination
  async fetchPosts(endpoint = "posts", params = {}) {
    const posts = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      try {
        const response = await axios.get(`${this.apiBase}/${endpoint}`, {
          params: { ...params, page, per_page: perPage, _embed: true }, // _embed gets featured images and author data
        });

        posts.push(...response.data);

        if (response.data.length < perPage) break;
        page++;
      } catch (error) {
        if (error.response?.status === 400) break; // No more pages
        throw error;
      }
    }

    return posts;
  }

  // Map WP post to your Recipe schema
  mapToRecipe(wpPost) {
    // Extract ACF/custom fields if available
    const acf = wpPost.acf || {};

    // Extract ingredients/instructions from content (assuming structured HTML)
    const content = wpPost.content?.rendered || "";
    const ingredients =
      this.extractList(
        content,
        /<ul[^>]*class="ingredients"[^>]*>(.*?)<\/ul>/i
      ) || [];
    const instructions =
      this.extractList(
        content,
        /<ol[^>]*class="instructions"[^>]*>(.*?)<\/ol>/i
      ) || [];

    // Map categories to your enum
    const categoryMap = {
      "dessert-recipes": "dessert",
      beverages: "beverages",
      breakfast: "breakfast",
      // Add more mappings as needed
    };
    const wpCategories = wpPost._embedded?.["wp:term"]?.[0] || [];
    const category = categoryMap[wpCategories[0]?.slug] || "appetizers";

    return {
      title: wpPost.title?.rendered || "Untitled",
      slug: wpPost.slug,
      image:
        wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/default-recipe.jpg",
      description: this.extractExcerpt(content),
      ingredients,
      instructions,
      ingredientsInUrdu: acf.ingredients_urdu || [],
      instructionsInUrdu: acf.instructions_urdu || [],
      titleInUrdu: acf.title_urdu || "",
      descriptionInUrdu: acf.description_urdu || "",
      prepTime: acf.prep_time || "",
      cookTime: acf.cook_time || "",
      totalTime: acf.total_time || "",
      servings: acf.servings || "",
      author: {
        name: wpPost._embedded?.author?.[0]?.name || "Unknown",
        image:
          wpPost._embedded?.author?.[0]?.avatar_urls?.["96"] ||
          "/default-avatar.jpg",
        bio: wpPost._embedded?.author?.[0]?.description || "",
      },
      category,
      section: this.determineSection(wpCategories),
      isRamadan: wpCategories.some((cat) => cat.slug.includes("ramadan")),
      inEid: wpCategories.some((cat) => cat.slug.includes("eid")),
      tags: wpPost._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [],
      relatedRecipes: [], // Populate later if needed
    };
  }

  // Helper: Extract list items from HTML
  extractList(content, regex) {
    const match = content.match(regex);
    if (!match) return [];
    return (
      match[1]
        .match(/<li[^>]*>(.*?)<\/li>/gi)
        ?.map((li) => li.replace(/<[^>]*>/g, "").trim())
        .filter((item) => item.length > 0) || []
    );
  }

  // Helper: Extract description from content
  extractExcerpt(content) {
    const text = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.substring(0, 200) + (text.length > 200 ? "..." : "");
  }

  // Helper: Determine section
  determineSection(categories) {
    if (categories.some((cat) => cat.slug.includes("popular")))
      return "popular";
    if (categories.some((cat) => cat.slug.includes("must-try")))
      return "must-try";
    return "general";
  }

  // Map WP post to Blog schema
  mapToBlog(wpPost) {
    const content = wpPost.content?.rendered || "";
    return {
      title: wpPost.title?.rendered || "Untitled",
      slug: wpPost.slug,
      mainImage:
        wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/default-blog.jpg",
      intro: this.extractExcerpt(content),
      content: this.convertContentToBlocks(content),
      faqs: this.extractFAQs(content), // NOW PROPERLY EXTRACTS FAQs!
    };
  }

  // Convert WP content to your content blocks - ENHANCED VERSION
  convertContentToBlocks(content) {
    const blocks = [];

    // Extract headings (h1-h6)
    const headingMatches = content.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi);
    if (headingMatches) {
      headingMatches.forEach((match) => {
        const levelMatch = match.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/i);
        if (levelMatch) {
          const level = parseInt(levelMatch[1]);
          const text = this.stripHtml(levelMatch[2]).trim();
          if (text && text.length > 0) {
            blocks.push({
              type: level === 1 ? "heading" : "subheading",
              content: text,
              level: level,
            });
          }
        }
      });
    }

    // Extract paragraphs
    const paragraphs = content.match(/<p[^>]*>(.*?)<\/p>/gi);
    if (paragraphs) {
      paragraphs.forEach((p) => {
        const text = this.stripHtml(p).trim();
        if (text && text.length > 10) {
          // Filter out very short paragraphs
          blocks.push({ type: "paragraph", content: text, level: 1 });
        }
      });
    }

    // Extract lists as content blocks
    const listMatches = content.match(/<[uo]l[^>]*>(.*?)<\/[uo]l>/gi);
    if (listMatches) {
      listMatches.forEach((match) => {
        const items = match.match(/<li[^>]*>(.*?)<\/li>/gi);
        if (items) {
          items.forEach((item) => {
            const text = this.stripHtml(item).trim();
            if (text && text.length > 0) {
              blocks.push({
                type: "paragraph",
                content: text,
                level: 1,
              });
            }
          });
        }
      });
    }

    return blocks.length > 0
      ? blocks
      : [
          {
            type: "paragraph",
            content: this.stripHtml(content).substring(0, 500) + "...",
            level: 1,
          },
        ];
  }

  // Helper method to strip HTML tags
  stripHtml(text) {
    return text
      .replace(/<[^>]*>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Extract FAQs from content - NEW METHOD
  extractFAQs(content) {
    const faqs = [];

    // Method 1: Look for FAQ structured content
    const faqPatterns = [
      // Pattern: Q: question A: answer
      /Q:\s*([^A]+)A:\s*([^Q]+)/gi,
      // Pattern: Question: answer
      /Question:\s*([^?]+\?)\s*([^Q]+?)(?=Question:|$)/gi,
      // Pattern: FAQ blocks
      /<div[^>]*class="[^"]*faq[^"]*"[^>]*>(.*?)<\/div>/gi,
      // Pattern: Strong tags for questions
      /<strong[^>]*>([^<]*\?[^<]*)<\/strong>\s*<\/?\w*>\s*([^<]+)/gi,
    ];

    faqPatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const question = this.stripHtml(match[1]).trim();
        const answer = this.stripHtml(match[2]).trim();

        if (
          question.length > 5 &&
          answer.length > 10 &&
          question.includes("?")
        ) {
          faqs.push({
            question: question,
            answer: answer,
          });
        }
      }
    });

    // Method 2: Look for heading-paragraph pairs that look like FAQs
    const headingParagraphPairs = content.match(
      /<h[3-6][^>]*>([^<]*\?[^<]*)<\/h[3-6]>\s*<p[^>]*>([^<]+)<\/p>/gi
    );
    if (headingParagraphPairs) {
      headingParagraphPairs.forEach((pair) => {
        const match = pair.match(
          /<h[3-6][^>]*>([^<]*\?[^<]*)<\/h[3-6]>\s*<p[^>]*>([^<]+)<\/p>/i
        );
        if (match) {
          const question = this.stripHtml(match[1]).trim();
          const answer = this.stripHtml(match[2]).trim();

          if (question.length > 5 && answer.length > 10) {
            faqs.push({
              question: question,
              answer: answer,
            });
          }
        }
      });
    }

    // Remove duplicates
    const uniqueFaqs = faqs.filter(
      (faq, index, self) =>
        index === self.findIndex((f) => f.question === faq.question)
    );

    return uniqueFaqs;
  }

  async migrateRecipes() {
    console.log("🔄 Fetching recipes from WordPress API...");
    const posts = await this.fetchPosts("posts", { categories: 1 }); // Adjust category ID for recipes

    console.log(`📥 Processing ${posts.length} potential recipes...`);

    for (const post of posts) {
      try {
        const recipeData = this.mapToRecipe(post);
        const existing = await Recipe.findOne({ slug: recipeData.slug });
        if (!existing) {
          await new Recipe(recipeData).save();
          console.log(`✅ Migrated: ${recipeData.title}`);
        }
      } catch (error) {
        console.error(`❌ Failed: ${post.title?.rendered}`, error.message);
      }
    }
  }

  async migrateBlogs() {
    console.log("🔄 Fetching blogs from WordPress API...");
    const posts = await this.fetchPosts("posts", { categories: 2 }); // Adjust category ID for blogs

    for (const post of posts) {
      try {
        const blogData = this.mapToBlog(post);
        const existing = await Blog.findOne({ slug: blogData.slug });
        if (!existing) {
          await new Blog(blogData).save();
          console.log(`✅ Migrated: ${blogData.title}`);
        }
      } catch (error) {
        console.error(`❌ Failed: ${post.title?.rendered}`, error.message);
      }
    }
  }

  async migrateTips() {
    // Similar to blogs, adjust category ID
    console.log("🔄 Fetching tips from WordPress API...");
    const posts = await this.fetchPosts("posts", { categories: 3 }); // Adjust for tips

    for (const post of posts) {
      try {
        const tipData = this.mapToBlog(post); // Reuse blog mapping logic
        const existing = await Tip.findOne({ slug: tipData.slug });
        if (!existing) {
          await new Tip(tipData).save();
          console.log(`✅ Migrated: ${tipData.title}`);
        }
      } catch (error) {
        console.error(`❌ Failed: ${post.title?.rendered}`, error.message);
      }
    }
  }

  async runMigration() {
    await this.connectDB();
    await this.migrateRecipes();
    await this.migrateBlogs();
    await this.migrateTips();
    console.log("🎉 Migration complete!");
    await mongoose.connection.close();
  }
}

module.exports = WordPressAPIMigrator;

// CLI usage
if (require.main === module) {
  const migrator = new WordPressAPIMigrator();
  migrator.runMigration().catch(console.error);
}
