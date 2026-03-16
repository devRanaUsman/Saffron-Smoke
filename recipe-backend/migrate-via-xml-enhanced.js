const mongoose = require("mongoose");
const fs = require("fs");
const xml2js = require("xml2js");
const Recipe = require("./models/Recipe");
const Blog = require("./models/Blog");
const Tip = require("./models/tips");

class WordPressXMLMigrator {
  constructor(xmlFilePath = "./wp-export.xml") {
    this.xmlFilePath = xmlFilePath;
  }

  async connectDB() {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/recipe-db"
    );
    console.log("✅ Connected to MongoDB");
  }

  async parseXML() {
    const xmlData = fs.readFileSync(this.xmlFilePath, "utf8");
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);
    return result.rss.channel[0].item || [];
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

  // Map WordPress post to Recipe schema
  mapToRecipe(wpPost) {
    const content = wpPost["content:encoded"]
      ? wpPost["content:encoded"][0]
      : "";
    const title = wpPost.title ? wpPost.title[0] : "Untitled";

    // Extract ingredients and instructions from content
    const ingredients =
      this.extractList(
        content,
        /<ul[^>]*class="[^"]*ingredients[^"]*"[^>]*>(.*?)<\/ul>/i
      ) ||
      this.extractList(
        content,
        /<h[2-6][^>]*>ingredients<\/h[2-6]>\s*<ul[^>]*>(.*?)<\/ul>/i
      ) ||
      [];

    const instructions =
      this.extractList(
        content,
        /<ol[^>]*class="[^"]*instructions[^"]*"[^>]*>(.*?)<\/ol>/i
      ) ||
      this.extractList(
        content,
        /<h[2-6][^>]*>instructions<\/h[2-6]>\s*<ol[^>]*>(.*?)<\/ol>/i
      ) ||
      [];

    // Extract categories
    const categories = wpPost.category || [];
    const categoryMap = {
      dessert: "dessert",
      beverage: "beverages",
      breakfast: "breakfast",
      appetizer: "appetizers",
      chicken: "tikka-kabab-cutlets",
      rice: "rice",
      salad: "salad",
    };

    let category = "appetizers";
    for (const cat of categories) {
      const catName = cat.toLowerCase();
      if (categoryMap[catName]) {
        category = categoryMap[catName];
        break;
      }
    }

    return {
      title: this.stripHtml(title),
      slug: wpPost["wp:post_name"]
        ? wpPost["wp:post_name"][0]
        : this.createSlug(title),
      image: this.extractFeaturedImage(wpPost) || "/default-recipe.jpg",
      description: this.extractExcerpt(content),
      ingredients,
      instructions,
      ingredientsInUrdu: [],
      instructionsInUrdu: [],
      titleInUrdu: "",
      descriptionInUrdu: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      servings: "",
      author: {
        name: wpPost["dc:creator"] ? wpPost["dc:creator"][0] : "Unknown",
        image: "/default-avatar.jpg",
        bio: "",
      },
      category,
      section: "general",
      isRamadan: categories.some((cat) =>
        cat.toLowerCase().includes("ramadan")
      ),
      inEid: categories.some((cat) => cat.toLowerCase().includes("eid")),
      tags: categories
        .map((cat) => (typeof cat === "string" ? cat : cat._ || ""))
        .filter(Boolean),
      relatedRecipes: [],
    };
  }

  // Map WordPress post to Blog schema with proper FAQs and content blocks
  mapToBlog(wpPost) {
    const content = wpPost["content:encoded"]
      ? wpPost["content:encoded"][0]
      : "";
    const title = wpPost.title ? wpPost.title[0] : "Untitled";

    return {
      title: this.stripHtml(title),
      slug: wpPost["wp:post_name"]
        ? wpPost["wp:post_name"][0]
        : this.createSlug(title),
      mainImage: this.extractFeaturedImage(wpPost) || "/default-blog.jpg",
      intro: this.extractExcerpt(content),
      content: this.parseContentToBlocks(content),
      faqs: this.extractFAQs(content), // Now properly extracts FAQs!
    };
  }

  extractList(content, regex) {
    const match = content.match(regex);
    if (!match) return [];

    return (
      match[1]
        .match(/<li[^>]*>(.*?)<\/li>/gi)
        ?.map((li) => this.stripHtml(li).trim())
        .filter((item) => item.length > 0) || []
    );
  }

  extractFeaturedImage(wpPost) {
    // Try to extract from postmeta
    const postmeta = wpPost["wp:postmeta"] || [];
    for (const meta of postmeta) {
      if (meta["wp:meta_key"] && meta["wp:meta_key"][0] === "_thumbnail_id") {
        // Would need to cross-reference with attachments
        return null;
      }
    }

    // Fallback: try to find first image in content
    const content = wpPost["content:encoded"]
      ? wpPost["content:encoded"][0]
      : "";
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : null;
  }

  createSlug(title) {
    return this.stripHtml(title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  }

  async migrateFromXML() {
    console.log("🔄 Parsing WordPress XML...");
    const items = await this.parseXML();

    console.log(`📥 Found ${items.length} items in XML`);

    let recipeCount = 0;
    let blogCount = 0;
    let tipCount = 0;

    for (const item of items) {
      try {
        const postType = item["wp:post_type"] ? item["wp:post_type"][0] : "";
        const status = item["wp:status"] ? item["wp:status"][0] : "";
        const categories = item.category
          ? item.category.map((cat) =>
              typeof cat === "string" ? cat : cat._ || ""
            )
          : [];

        // Skip if not published or not a post
        if (status !== "publish" || postType !== "post") continue;

        const title = item.title ? item.title[0] : "Untitled";
        const slug = item["wp:post_name"]
          ? item["wp:post_name"][0]
          : this.createSlug(title);

        // Determine content type based on categories
        const isRecipe = categories.some((cat) =>
          [
            "recipe",
            "chicken",
            "dessert",
            "beverage",
            "breakfast",
            "rice",
          ].includes(cat.toLowerCase())
        );
        const isTip = categories.some((cat) =>
          ["tip", "tips", "cooking-tips"].includes(cat.toLowerCase())
        );

        if (isRecipe) {
          const recipeData = this.mapToRecipe(item);
          const existing = await Recipe.findOne({ slug: recipeData.slug });
          if (!existing) {
            await new Recipe(recipeData).save();
            recipeCount++;
            console.log(`✅ Recipe: ${recipeData.title}`);
          }
        } else if (isTip) {
          const tipData = this.mapToBlog(item); // Reuse blog mapping
          const existing = await Tip.findOne({ slug: tipData.slug });
          if (!existing) {
            await new Tip(tipData).save();
            tipCount++;
            console.log(`✅ Tip: ${tipData.title}`);
          }
        } else {
          const blogData = this.mapToBlog(item);
          const existing = await Blog.findOne({ slug: blogData.slug });
          if (!existing) {
            await new Blog(blogData).save();
            blogCount++;
            console.log(
              `✅ Blog: ${blogData.title} (${blogData.faqs.length} FAQs)`
            );
          }
        }
      } catch (error) {
        const title = item.title ? item.title[0] : "Unknown";
        console.error(`❌ Failed: ${title}`, error.message);
      }
    }

    console.log(`🎉 Migration complete!`);
    console.log(
      `📊 Migrated: ${recipeCount} recipes, ${blogCount} blogs, ${tipCount} tips`
    );
  }

  async runMigration() {
    await this.connectDB();
    await this.migrateFromXML();
    await mongoose.connection.close();
  }
}

module.exports = WordPressXMLMigrator;

// CLI usage
if (require.main === module) {
  const xmlPath =
    process.argv[2] || "../src/therecipespk.WordPress.2025-09-23.xml";
  const migrator = new WordPressXMLMigrator(xmlPath);
  migrator.runMigration().catch(console.error);
}
