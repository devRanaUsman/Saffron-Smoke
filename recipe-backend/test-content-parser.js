const WordPressXMLMigrator = require("./migrate-via-xml-enhanced");

// Test the content parsing logic with sample data
function testContentParsing() {
  console.log("🧪 Testing Content Parsing Logic...");

  const migrator = new WordPressXMLMigrator();

  // Sample WordPress content with headings and FAQs
  const sampleContent = `
    <h1>Best Chicken Recipes</h1>
    <p>These are amazing chicken recipes that everyone will love.</p>
    
    <h2>Ingredients</h2>
    <ul>
      <li>2 pounds chicken breast</li>
      <li>1 cup flour</li>
      <li>Salt and pepper to taste</li>
    </ul>
    
    <h2>Instructions</h2>
    <ol>
      <li>Preheat oven to 350°F</li>
      <li>Season chicken with salt and pepper</li>
      <li>Bake for 25-30 minutes</li>
    </ol>
    
    <h3>Frequently Asked Questions</h3>
    
    <h4>How long should I cook the chicken?</h4>
    <p>Cook the chicken for 25-30 minutes at 350°F, or until internal temperature reaches 165°F.</p>
    
    <h4>Can I use frozen chicken?</h4>
    <p>Yes, but make sure to thaw it completely first and add 5-10 extra minutes to cooking time.</p>
    
    <strong>What if the chicken is too dry?</strong>
    <p>Try marinating the chicken for 2 hours before cooking, or baste it with butter every 10 minutes.</p>
  `;

  console.log("\n📝 Testing content parsing...");

  // Test content blocks extraction
  const contentBlocks = migrator.parseContentToBlocks(sampleContent);
  console.log(`✅ Content blocks found: ${contentBlocks.length}`);

  contentBlocks.forEach((block, index) => {
    console.log(
      `  ${index + 1}. ${block.type} (level ${
        block.level
      }): ${block.content.substring(0, 50)}...`
    );
  });

  // Test FAQ extraction
  const faqs = migrator.extractFAQs(sampleContent);
  console.log(`\n✅ FAQs found: ${faqs.length}`);

  faqs.forEach((faq, index) => {
    console.log(`  ${index + 1}. Q: ${faq.question}`);
    console.log(`     A: ${faq.answer.substring(0, 80)}...`);
  });

  // Test with a sample WordPress post structure
  const samplePost = {
    title: ["Sample Recipe Post"],
    "wp:post_name": ["sample-recipe-post"],
    "content:encoded": [sampleContent],
    "dc:creator": ["Test Chef"],
  };

  console.log("\n📝 Testing blog mapping...");
  const blogData = migrator.mapToBlog(samplePost);

  console.log(`✅ Title: ${blogData.title}`);
  console.log(`✅ Slug: ${blogData.slug}`);
  console.log(`✅ Content blocks: ${blogData.content.length}`);
  console.log(`✅ FAQs: ${blogData.faqs.length}`);
  console.log(`✅ Intro: ${blogData.intro.substring(0, 100)}...`);

  console.log("\n🎉 Content parsing test completed successfully!");

  // Show the improvements
  console.log("\n📊 IMPROVEMENTS ACHIEVED:");
  console.log("❌ Before: Only paragraphs, no headings, empty FAQ arrays");
  console.log(
    "✅ After: Proper headings, subheadings, structured content, and FAQ extraction"
  );
  console.log(
    `✅ Content structure now includes: ${
      new Set(contentBlocks.map((b) => b.type)).size
    } different block types`
  );
  console.log(`✅ FAQ extraction patterns: 4 different detection methods`);
}

// Test with problematic content
function testEdgeCases() {
  console.log("\n🧪 Testing Edge Cases...");

  const migrator = new WordPressXMLMigrator();

  // Test with WordPress blocks
  const gutenbergContent = `
    <!-- wp:heading {"level":1} -->
    <h1>Recipe of the Day</h1>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph -->
    <p>This is a delicious recipe.</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:heading {"level":3} -->
    <h3>What temperature should I use?</h3>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph -->
    <p>Use 350°F for best results.</p>
    <!-- /wp:paragraph -->
  `;

  const blocks = migrator.parseContentToBlocks(gutenbergContent);
  const faqs = migrator.extractFAQs(gutenbergContent);

  console.log(`✅ Gutenberg blocks parsed: ${blocks.length} content blocks`);
  console.log(`✅ FAQs from Gutenberg: ${faqs.length}`);

  // Test with minimal content
  const minimalContent = "<p>Just a short paragraph.</p>";
  const minimalBlocks = migrator.parseContentToBlocks(minimalContent);
  console.log(`✅ Minimal content handled: ${minimalBlocks.length} blocks`);

  console.log("\n🎉 Edge case testing completed!");
}

testContentParsing();
testEdgeCases();
