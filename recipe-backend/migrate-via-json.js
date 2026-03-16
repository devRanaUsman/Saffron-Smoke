const mongoose = require("mongoose");
const fs = require("fs");
const Recipe = require("./models/Recipe");
const Blog = require("./models/Blog");
const Tip = require("./models/tips");

// Use the existing JSON data as a more reliable source
class JSONMigrator {
  constructor() {
    this.blogsPath = "../output/blogs.json";
    this.recipesPath = "../output/recipes.json";
  }

  async connectDB() {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/recipe-db"
    );
    console.log("✅ Connected to MongoDB");
  }

  // Enhanced content parsing with headings and FAQ extraction
  parseContentToBlocks(content) {
    if (!content) return [];

    const blocks = [];

    // Clean content and remove WordPress blocks markup
    let cleanContent = content
      .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
      .replace(/\[.*?\]/g, "") // Remove shortcodes
      .replace(/<script[\s\S]*?<\/script>/gi, "") // Remove scripts
      .replace(/<style[\s\S]*?<\/style>/gi, ""); // Remove styles

    // Extract headings (h1-h6)
    const headingMatches = cleanContent.match(
      /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi
    );
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
    const paragraphMatches = cleanContent.match(/<p[^>]*>(.*?)<\/p>/gi);
    if (paragraphMatches) {
      paragraphMatches.forEach((match) => {
        const text = this.stripHtml(match).trim();
        if (text && text.length > 10) {
          // Filter out very short paragraphs
          blocks.push({
            type: "paragraph",
            content: text,
            level: 1,
          });
        }
      });
    }

    // Extract lists as paragraphs (ingredients/instructions)
    const listMatches = cleanContent.match(/<[uo]l[^>]*>(.*?)<\/[uo]l>/gi);
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
            content: this.stripHtml(cleanContent).substring(0, 500) + "...",
            level: 1,
          },
        ];
  }

  // Extract FAQs from content
  extractFAQs(content) {
    if (!content) return [];

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

  stripHtml(text) {
    return text
      .replace(/<[^>]*>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  extractExcerpt(content) {
    const text = this.stripHtml(content);
    return text.substring(0, 200) + (text.length > 200 ? "..." : "");
  }

  // Enhanced blog mapping
  enhanceBlogData(blog) {
    // Find raw content from the blog
    let rawContent = "";
    if (blog.content && Array.isArray(blog.content)) {
      rawContent = blog.content
        .map((block) => `<p>${block.content}</p>`)
        .join("\n");
    }

    return {
      title: blog.title,
      slug: blog.slug,
      mainImage: blog.mainImage,
      intro: blog.intro,
      content: this.parseContentToBlocks(rawContent),
      faqs: this.extractFAQs(rawContent),
    };
  }

  async migrateFromJSON() {
    console.log("🔄 Loading existing JSON data...");

    try {
      // Load blogs
      if (fs.existsSync(this.blogsPath)) {
        const blogsData = JSON.parse(fs.readFileSync(this.blogsPath, "utf8"));
        console.log(`📥 Found ${blogsData.length} blogs`);

        let blogCount = 0;
        for (const blog of blogsData) {
          try {
            const enhancedBlog = this.enhanceBlogData(blog);
            const existing = await Blog.findOne({ slug: enhancedBlog.slug });

            if (!existing) {
              await new Blog(enhancedBlog).save();
              blogCount++;
              console.log(
                `✅ Blog: ${enhancedBlog.title} (${enhancedBlog.content.length} blocks, ${enhancedBlog.faqs.length} FAQs)`
              );
            } else {
              // Update existing with enhanced content
              await Blog.findOneAndUpdate(
                { slug: enhancedBlog.slug },
                {
                  content: enhancedBlog.content,
                  faqs: enhancedBlog.faqs,
                }
              );
              console.log(
                `🔄 Updated: ${enhancedBlog.title} with enhanced content`
              );
            }
          } catch (error) {
            console.error(`❌ Blog failed: ${blog.title}`, error.message);
          }
        }

        console.log(`🎉 Processed ${blogCount} new blogs`);
      }

      // Load recipes
      if (fs.existsSync(this.recipesPath)) {
        const recipesData = JSON.parse(
          fs.readFileSync(this.recipesPath, "utf8")
        );
        console.log(`📥 Found ${recipesData.length} recipes`);

        let recipeCount = 0;
        for (const recipe of recipesData) {
          try {
            const existing = await Recipe.findOne({ slug: recipe.slug });
            if (!existing) {
              await new Recipe(recipe).save();
              recipeCount++;
              console.log(`✅ Recipe: ${recipe.title}`);
            }
          } catch (error) {
            console.error(`❌ Recipe failed: ${recipe.title}`, error.message);
          }
        }

        console.log(`🎉 Processed ${recipeCount} new recipes`);
      }
    } catch (error) {
      console.error("❌ Migration failed:", error.message);
    }
  }

  async runMigration() {
    await this.connectDB();
    await this.migrateFromJSON();
    await mongoose.connection.close();
  }
}

module.exports = JSONMigrator;

// CLI usage
if (require.main === module) {
  const migrator = new JSONMigrator();
  migrator.runMigration().catch(console.error);
}
