const WordPressXMLMigrator = require("./migrate-via-xml-enhanced");

async function testMigration() {
  console.log("🧪 Testing WordPress XML Migration...");

  try {
    const migrator = new WordPressXMLMigrator(
      "../src/therecipespk.WordPress.2025-09-23.xml"
    );

    // Test parsing first few items
    const items = await migrator.parseXML();
    console.log(`Found ${items.length} items in XML`);

    // Test content parsing on a sample
    let testCount = 0;
    for (const item of items.slice(0, 10)) {
      const postType = item["wp:post_type"] ? item["wp:post_type"][0] : "";
      const status = item["wp:status"] ? item["wp:status"][0] : "";

      if (status === "publish" && postType === "post") {
        const title = item.title ? item.title[0] : "Untitled";
        const content = item["content:encoded"]
          ? item["content:encoded"][0]
          : "";

        console.log(`\n📝 Testing: ${title}`);
        console.log(`Content length: ${content.length} chars`);

        // Test blog mapping
        const blogData = migrator.mapToBlog(item);
        console.log(`✅ Content blocks: ${blogData.content.length}`);
        console.log(`✅ FAQs found: ${blogData.faqs.length}`);

        if (blogData.faqs.length > 0) {
          console.log(`  📋 Sample FAQ: ${blogData.faqs[0].question}`);
        }

        if (blogData.content.length > 0) {
          const headings = blogData.content.filter(
            (block) => block.type === "heading" || block.type === "subheading"
          );
          console.log(`  📑 Headings found: ${headings.length}`);
          if (headings.length > 0) {
            console.log(`    - ${headings[0].content}`);
          }
        }

        testCount++;
        if (testCount >= 3) break;
      }
    }

    console.log("\n🎉 Test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testMigration();
