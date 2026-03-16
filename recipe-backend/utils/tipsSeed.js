// const mongoose = require("mongoose");
// const Tips = require("../models/tips");
// require("dotenv").config();

// const sampleTips = [
//   {
//     title: "Home Remedy for Hand Burn",
//     slug: "home-remedy-for-hand-burn",
//     mainImage:
//       "https://therecipespk.com/wp-content/uploads/2017/08/hand-burn-remedy.jpg",
//     intro:
//       "Sometimes while cooking touch burns due to steam or hot oil dripping that is very painful and it also makes blisters and leaves a spot on the skin.",
//     conditionalHeading1: "How to Treat Hand Burn",
//     conditionimage1:
//       "https://therecipespk.com/wp-content/uploads/2017/08/hand-burn-treatment.jpg",
//     conditionalPara1: [
//       "Often suffer from this problem especially my no baking is complete without touching a hot oil or hot oven. How much painful this is I know very well 😥",
//       "Previous days I was making caramel sauce. I touched the sauce with fingertip as I thought it would be a little hot and cool. It was much hot.",
//     ],
//     Heading1: "Ingredients",
//     image1: "",
//     para1: ["Honey 1 tsp", "Turmeric 1 tsp", "Olive 1 tsp"],
//   },
//   {
//     title: "Best Way to Store Fresh Herbs",
//     slug: "best-way-to-store-fresh-herbs",
//     mainImage:
//       "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     intro:
//       "Fresh herbs can elevate any dish, but they tend to wilt quickly. Here are the best methods to keep your herbs fresh for longer periods.",
//     conditionalHeading1: "Storage Methods",
//     conditionimage1:
//       "https://images.unsplash.com/photo-1594759082308-383e555bc20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     conditionalPara1: [
//       "Different herbs require different storage methods to maintain their freshness and flavor.",
//       "Soft herbs like basil, cilantro, and parsley should be treated like flowers.",
//       "Hardy herbs like rosemary, thyme, and oregano can be stored in the refrigerator.",
//     ],
//     Heading1: "Step-by-Step Guide",
//     image1: "",
//     para1: [
//       "For soft herbs: Trim the stems and place in a glass of water, cover with plastic bag",
//       "For hardy herbs: Wrap in slightly damp paper towel and store in refrigerator",
//       "For long-term storage: Freeze herbs in olive oil using ice cube trays",
//     ],
//   },
//   {
//     title: "Perfect Rice Cooking Technique",
//     slug: "perfect-rice-cooking-technique",
//     mainImage:
//       "https://images.unsplash.com/photo-1586201375761-83865001e7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     intro:
//       "Cooking perfect rice is a fundamental skill every cook should master. Follow these simple steps to get fluffy, perfectly cooked rice every time.",
//     conditionalHeading1: "The Secret to Perfect Rice",
//     conditionimage1:
//       "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     conditionalPara1: [
//       "The key to perfect rice lies in the ratio of water to rice and proper heat control.",
//       "Rinsing the rice before cooking removes excess starch and prevents stickiness.",
//       "Let the rice rest after cooking to allow the moisture to distribute evenly.",
//     ],
//     Heading1: "Cooking Instructions",
//     image1: "",
//     para1: [
//       "Rinse 1 cup rice until water runs clear",
//       "Use 1.5 cups water for 1 cup rice",
//       "Bring to boil, then simmer covered for 18 minutes",
//       "Let rest for 5 minutes before fluffing with fork",
//     ],
//   },
// ];

// async function seedTips() {
//   try {
//     const DB_PATH =
//       process.env.MONGODB_URI ||
//       "mongodb+srv://therecipespk:recipepk@the-recipespk.6fbccwt.mongodb.net/The-RecipesPk?retryWrites=true&w=majority&appName=The-RecipesPk";

//     await mongoose.connect(DB_PATH);
//     console.log("Connected to MongoDB");

//     // Clear existing tips
//     await Tips.deleteMany({});
//     console.log("Cleared existing tips");

//     // Insert sample tips
//     await Tips.insertMany(sampleTips);
//     console.log(`Inserted ${sampleTips.length} sample tips`);

//     mongoose.connection.close();
//     console.log("Database connection closed");
//   } catch (error) {
//     console.error("Error seeding tips:", error);
//   }
// }

// // Run if this file is executed directly
// if (require.main === module) {
//   seedTips();
// }

// module.exports = { seedTips };
