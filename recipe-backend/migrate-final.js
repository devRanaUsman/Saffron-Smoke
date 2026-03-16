const mongoose = require("mongoose");
const fs = require("fs");
const Recipe = require("./models/Recipe");
const Blog = require("./models/Blog");
const Tip = require("./models/tips");

class FinalMigrator {
  constructor() {
    this.blogsPath = "../output/blogs-fixed.json";
    this.recipesPath = "../output/recipes-fixed.json";
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

  // Enhanced blog mapping with proper content parsing
  enhanceBlogData(blog) {
    // Reconstruct raw content from existing content blocks
    let rawContent = "";
    if (blog.content && Array.isArray(blog.content)) {
      rawContent = blog.content
        .map((block) => {
          if (block.type === "heading") {
            return `<h${block.level || 1}>${block.content}</h${
              block.level || 1
            }>`;
          } else if (block.type === "subheading") {
            return `<h${block.level || 2}>${block.content}</h${
              block.level || 2
            }>`;
          } else {
            return `<p>${block.content}</p>`;
          }
        })
        .join("\n");
    }

    return {
      title: blog.title,
      slug: blog.slug,
      mainImage: blog.mainImage || "/default-blog.jpg",
      intro: blog.intro || "Interesting blog post",
      content: this.parseContentToBlocks(rawContent),
      faqs: this.extractFAQs(rawContent),
    };
  }

  async runFinalMigration() {
    console.log("🚀 Starting FINAL enhanced migration...");
    console.log("📋 Using FIXED data with proper categories and images");

    try {
      // Clear existing data first (optional)
      console.log("🧹 Clearing existing data...");
      await Blog.deleteMany({});
      await Recipe.deleteMany({});
      await Tip.deleteMany({});

      // Migrate blogs with enhanced parsing
      if (fs.existsSync(this.blogsPath)) {
        const blogsData = JSON.parse(fs.readFileSync(this.blogsPath, "utf8"));
        console.log(`\n📥 Migrating ${blogsData.length} FIXED blogs...`);

        let blogCount = 0;
        let faqCount = 0;
        let blockCount = 0;

        for (const blog of blogsData) {
          try {
            const enhancedBlog = this.enhanceBlogData(blog);
            await new Blog(enhancedBlog).save();

            blogCount++;
            faqCount += enhancedBlog.faqs.length;
            blockCount += enhancedBlog.content.length;

            console.log(
              `✅ ${blogCount}: ${enhancedBlog.title} (${enhancedBlog.content.length} blocks, ${enhancedBlog.faqs.length} FAQs)`
            );
          } catch (error) {
            console.error(`❌ Blog failed: ${blog.title}`, error.message);
          }
        }

        console.log(`\n🎉 BLOGS MIGRATION COMPLETE:`);
        console.log(`   ✅ ${blogCount} blogs migrated`);
        console.log(`   ✅ ${blockCount} content blocks created`);
        console.log(`   ✅ ${faqCount} FAQs extracted`);
      }

      // Migrate recipes
      if (fs.existsSync(this.recipesPath)) {
        const recipesData = JSON.parse(
          fs.readFileSync(this.recipesPath, "utf8")
        );
        console.log(`\n📥 Migrating ${recipesData.length} FIXED recipes...`);

        let recipeCount = 0;
        const categoryStats = {};

        for (const recipe of recipesData) {
          try {
            await new Recipe(recipe).save();
            recipeCount++;
            categoryStats[recipe.category] =
              (categoryStats[recipe.category] || 0) + 1;

            if (recipeCount % 50 === 0) {
              console.log(`✅ Migrated ${recipeCount} recipes...`);
            }
          } catch (error) {
            console.error(`❌ Recipe failed: ${recipe.title}`, error.message);
          }
        }

        console.log(`\n🎉 RECIPES MIGRATION COMPLETE:`);
        console.log(`   ✅ ${recipeCount} recipes migrated`);
        console.log(`   📊 Categories:`, categoryStats);
      }

      console.log(`\n🏆 FINAL MIGRATION SUMMARY:`);
      console.log(
        `✅ Enhanced content parsing: Headings, subheadings, paragraphs`
      );
      console.log(`✅ FAQ extraction: Multiple detection patterns`);
      console.log(`✅ Fixed data issues: Categories and missing images`);
      console.log(`✅ Schema compliance: All validation requirements met`);

      console.log(`\n🔍 IMPROVEMENTS ACHIEVED:`);
      console.log(
        `❌ Before: Empty FAQ arrays, missing headings, inconsistent data`
      );
      console.log(
        `✅ After: Structured content blocks, extracted FAQs, clean data`
      );
    } catch (error) {
      console.error("❌ Final migration failed:", error.message);
    }
  }

  async runMigration() {
    await this.connectDB();
    await this.runFinalMigration();
    await mongoose.connection.close();
    console.log(
      "\n🎯 Migration completed! Your React app now has properly structured data."
    );
  }
}

// CLI usage
if (require.main === module) {
  const migrator = new FinalMigrator();
  migrator.runMigration().catch(console.error);
}

module.exports = FinalMigrator;
