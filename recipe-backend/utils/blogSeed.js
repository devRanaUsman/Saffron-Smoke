// const mongoose = require("mongoose");
// const Blog = require("../models/Blog");

// // Load environment variables
// require("dotenv").config();

// const DB_PATH =
//   process.env.MONGODB_URI ||
//   "mongodb+srv://therecipespk:recipepk@the-recipespk.6fbccwt.mongodb.net/The-RecipesPk?retryWrites=true&w=majority&appName=The-RecipesPk";

// const sampleBlog = {
//   title: "The Spice Trail: Essential Spices in Pakistani Cuisine",
//   slug: "spice-trail-essential-spices-pakistani-cuisine",
//   mainImage:
//     "https://therecipespk.com/wp-content/uploads/2023/01/spices-banner.jpg",
//   intro:
//     "Pakistani cuisine is a delightful symphony of flavors, textures, and aromas that tell the story of our rich cultural heritage. At the heart of every memorable Pakistani dish lies an ancient secret - the artful blend of spices that transforms simple ingredients into culinary masterpieces.",

//   conditionalHeading1: "Ancient Traditions, Modern Kitchens",
//   conditionalPara1:
//     "For centuries, Pakistani cooks have understood that the soul of any great dish lies in its spices. Our grandmothers knew the precise moment to add each spice, creating layers of flavor that dance on the palate and warm the heart.",

//   Heading1: "The Heart of Pakistani Cooking: Essential Spices",
//   image1:
//     "https://therecipespk.com/wp-content/uploads/2023/01/essential-spices.jpg",
//   para1:
//     "Pakistani cuisine wouldn't be the same without its signature spices. Each spice brings its own unique character to the dish, creating a symphony of flavors that defines our culinary identity.",

//   subHeading1o1: "1. Cumin (Zeera)",
//   subPara1o1:
//     "Cumin is perhaps one of the most fundamental spices in Pakistani cooking, known for its warm, earthy flavor that adds depth to countless dishes. Whether used whole or ground, cumin is essential for creating the foundation of flavor in curries, rice dishes, and even street food.",

//   subHeading1o2: "2. Coriander (Dhania)",
//   subPara1o2:
//     "Both the seeds and fresh leaves of coriander are treasured in Pakistani kitchens. The seeds provide a mild, slightly citrusy flavor that complements heavier spices, while fresh coriander leaves add a bright, fresh finish to completed dishes.",

//   subHeading1o3: "3. Red Chili (Lal Mirch)",
//   subPara1o3:
//     "The backbone of Pakistani heat, red chili powder isn't just about spiciness - it's about adding color, depth, and a complex warmth that builds slowly on the palate. Different varieties offer different levels of heat and flavor profiles.",

//   Heading2: "Aromatic Spices That Define Flavor",
//   image2:
//     "https://therecipespk.com/wp-content/uploads/2023/01/aromatic-spices.jpg",
//   para2:
//     "Beyond the basics, Pakistani cuisine employs a range of aromatic spices that create the complex flavor profiles our dishes are known for.",

//   subHeading2o1: "4. Garam Masala",
//   subPara2o1:
//     "This warming spice blend typically includes cinnamon, cardamom, cloves, and black pepper. Every Pakistani household has its own secret garam masala recipe, passed down through generations. It's added at the end of cooking to preserve its delicate aromatics.",

//   subHeading2o2: "5. Turmeric (Haldi)",
//   subPara2o2:
//     "Known for its golden color and earthy flavor, turmeric is more than just a spice - it's medicine in Pakistani culture. It adds both color and a subtle warmth to dishes while providing anti-inflammatory benefits.",

//   subHeading2o3: "6. Cardamom (Elaichi)",
//   subPara2o3:
//     "The 'queen of spices,' cardamom brings a sweet, floral aroma that elevates both savory dishes and desserts. Green cardamom is preferred for its delicate flavor, while black cardamom adds a smoky depth to meat dishes.",

//   Heading3: "The Art of Spice Blending",
//   image3:
//     "https://therecipespk.com/wp-content/uploads/2023/01/spice-blending.jpg",
//   para3:
//     "Creating the perfect spice blend is an art form that requires understanding not just individual spices, but how they interact with each other and with different cooking methods.",

//   subHeading3o1: "Traditional Techniques",
//   subPara3o1:
//     "Pakistani cooks traditionally dry-roast whole spices to release their essential oils before grinding. This technique intensifies flavors and creates more complex taste profiles than using pre-ground spices.",

//   subHeading3o2: "Timing is Everything",
//   subPara3o2:
//     "The order and timing of adding spices can make or break a dish. Some spices need to be bloomed in oil at the beginning, others are added during cooking, and the most delicate aromatics are saved for the final moments.",

//   subHeading3o3: "Regional Variations",
//   subPara3o3:
//     "Different regions of Pakistan have developed their own spice preferences. Punjabi cuisine tends to be more robust and heavily spiced, while Sindhi cooking often incorporates tangy elements alongside traditional spices.",

//   Heading4: "Building Your Pakistani Spice Collection",
//   image4:
//     "https://therecipespk.com/wp-content/uploads/2023/01/spice-collection.jpg",
//   para4:
//     "Starting your own Pakistani spice collection doesn't have to be overwhelming. Begin with these essential spices and gradually expand your collection as you become more comfortable with Pakistani cooking.",

//   subHeading4o1: "Essential Starter Spices",
//   subPara4o1:
//     "Begin with cumin, coriander, turmeric, red chili powder, and garam masala. These five spices will allow you to create authentic Pakistani flavors in most basic recipes.",

//   subHeading4o2: "Storage and Freshness",
//   subPara4o2:
//     "Store spices in airtight containers away from light and heat. Whole spices retain their potency longer than ground ones. Replace ground spices every 6-12 months for optimal flavor.",

//   subHeading4o3: "Where to Buy Quality Spices",
//   subPara4o3:
//     "Look for Pakistani or South Asian grocery stores for the best quality and most authentic spice blends. Online retailers also offer excellent options for those without local access to specialty stores.",
// };

// async function seedBlog() {
//   try {
//     await mongoose.connect(DB_PATH);
//     console.log("Connected to MongoDB");

//     // Check if the blog already exists
//     const existingBlog = await Blog.findOne({ slug: sampleBlog.slug });
//     if (existingBlog) {
//       console.log("Sample blog already exists, skipping...");
//       return;
//     }

//     // Create the blog
//     const blog = await Blog.create(sampleBlog);
//     console.log("Sample blog created successfully:", blog.title);
//   } catch (error) {
//     console.error("Error creating sample blog:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// }

// // Run the seed function if this file is executed directly
// if (require.main === module) {
//   seedBlog();
// }

// module.exports = { seedBlog, sampleBlog };
