const mongoose = require("mongoose");
const Blog = require("../models/Blog");

// Load environment variables
require("dotenv").config();

const DB_PATH =
  process.env.MONGODB_URI ||
  "mongodb+srv://therecipespk:recipepk@the-recipespk.6fbccwt.mongodb.net/The-RecipesPk?retryWrites=true&w=majority&appName=The-RecipesPk";

const additionalBlogs = [
  {
    title: "Cooking with Onions: The Backbone of Pakistani Cuisine",
    slug: "cooking-with-onions-pakistani-cuisine",
    mainImage:
      "https://therecipespk.com/wp-content/uploads/2024/07/Onions-in-Pakistani-Cuisine.jpg",
    intro:
      "Onions are more than just a cooking ingredient in Pakistani cuisine - they are the foundation upon which countless flavors are built. From the gentle sweetness of caramelized onions to the sharp bite of fresh slices, onions play a crucial role in creating the complex flavor profiles that define our beloved dishes.",

    conditionalHeading1: "The Foundation of Flavor",
    conditionalPara1:
      "No Pakistani kitchen is complete without onions. They form the base of nearly every curry, provide depth to rice dishes, and add crunch and flavor to our favorite street foods.",

    Heading1: "Types of Onions Used in Pakistani Cooking",
    image1:
      "https://therecipespk.com/wp-content/uploads/2024/07/Types-of-Onions.jpg",
    para1:
      "Pakistani cuisine utilizes different varieties of onions, each bringing its own unique characteristics to the dishes they enhance.",

    subHeading1o1: "1. Red Onions (Pyaz)",
    subPara1o1:
      "The most commonly used onion in Pakistani cooking, red onions provide a sharp, pungent flavor when raw and develop a sweet, complex taste when cooked slowly. They're essential for creating the perfect bhuna base.",

    subHeading1o2: "2. White Onions",
    subPara1o2:
      "Milder than red onions, white onions are often used in dishes where a subtler onion flavor is desired. They're perfect for biryani and pulao preparations where they won't overpower delicate spices.",

    subHeading1o3: "3. Green Onions (Hara Pyaz)",
    subPara1o3:
      "Both the white bulbs and green tops are used in Pakistani cooking. The bulbs provide mild flavor while the green tops add color and freshness as garnish for various dishes.",

    Heading2: "Onion Cooking Techniques",
    image2:
      "https://therecipespk.com/wp-content/uploads/2024/07/Onion-Cooking-Techniques.jpg",
    para2:
      "The way onions are prepared and cooked can dramatically change the flavor profile of a dish. Pakistani cuisine has perfected several onion cooking techniques.",

    subHeading2o1: "Golden Brown Bhuna",
    subPara2o1:
      "Slowly cooking sliced onions until they turn golden brown creates a sweet, caramelized base that forms the foundation of most Pakistani curries. This technique requires patience but creates incredible depth of flavor.",

    subHeading2o2: "Crispy Fried Onions (Birista)",
    subPara2o2:
      "Thinly sliced onions fried until crispy are used as both an ingredient and garnish. They add texture to biryani and pulao while infusing oil with onion flavor for cooking.",

    subHeading2o3: "Raw Onion Preparations",
    subPara2o3:
      "Thinly sliced raw onions are essential for kebabs, chaat, and as accompaniments to heavy meals. They provide a sharp contrast that cuts through rich, spicy flavors.",

    Heading3: "Essential Onion-Based Dishes",
    image3:
      "https://therecipespk.com/wp-content/uploads/2024/07/Onion-Based-Dishes.jpg",
    para3:
      "Several Pakistani dishes showcase onions as the star ingredient, demonstrating their versatility and importance in our cuisine.",

    subHeading3o1: "Pyaz Ka Salan",
    subPara3o1:
      "A traditional curry where small onions are cooked in a spiced gravy, highlighting the natural sweetness of onions when cooked slowly with aromatic spices.",

    subHeading3o2: "Dopiaza",
    subPara3o2:
      "A classic dish that literally means 'two onions,' referring to the technique of using onions at two different stages of cooking - both as a base and as a main ingredient.",

    subHeading3o3: "Onion Paratha",
    subPara3o3:
      "Flatbread stuffed with spiced onions, showcasing how onions can be the star of even simple preparations when seasoned properly with green chilies and spices.",

    Heading4: "Tips for Perfect Onion Preparation",
    image4:
      "https://therecipespk.com/wp-content/uploads/2024/07/Onion-Preparation-Tips.jpg",
    para4:
      "Mastering onion preparation techniques will elevate your Pakistani cooking to new heights.",

    subHeading4o1: "Achieving Perfect Browning",
    subPara4o1:
      "Cook onions on medium heat with enough oil, stirring regularly. Don't rush the process - properly browned onions are the secret to authentic Pakistani curry flavors.",

    subHeading4o2: "Storage and Selection",
    subPara4o2:
      "Choose firm onions with dry, papery skin. Store in a cool, dry place with good ventilation. Avoid onions with soft spots or those that have started sprouting.",

    subHeading4o3: "Reducing Tears and Sharpness",
    subPara4o3:
      "Chill onions before cutting to reduce tears. To reduce sharpness in raw preparations, soak sliced onions in ice water for 10-15 minutes before serving.",
  },
  {
    title: "Lentils & Legumes: The Soul of Everyday Pakistani Cooking",
    slug: "lentils-legumes-pakistani-cooking",
    mainImage:
      "https://therecipespk.com/wp-content/uploads/2024/07/Lentils-and-Legumes.jpg",
    intro:
      "Lentils and legumes are the nutritional powerhouses that form the backbone of Pakistani home cooking. Rich in protein, fiber, and essential nutrients, these humble ingredients are transformed into comforting, flavorful dishes that have sustained generations of Pakistani families.",

    conditionalHeading1: "Nutrition Meets Tradition",
    conditionalPara1:
      "In Pakistani households, dal (lentils) is more than just food - it's comfort, nutrition, and tradition served in a bowl. Every region has its own special preparations that showcase the versatility of these protein-rich ingredients.",

    Heading1: "Popular Lentils in Pakistani Cuisine",
    image1:
      "https://therecipespk.com/wp-content/uploads/2024/07/Pakistani-Lentils-Types.jpg",
    para1:
      "Pakistan's diverse cuisine features numerous varieties of lentils and legumes, each with its own unique flavor profile and cooking requirements.",

    subHeading1o1: "1. Masoor Dal (Red Lentils)",
    subPara1o1:
      "Quick-cooking and mild in flavor, masoor dal is perfect for everyday meals. It cooks to a creamy consistency and pairs wonderfully with simple spices and fresh herbs.",

    subHeading1o2: "2. Moong Dal (Yellow Split Mung Beans)",
    subPara1o2:
      "Light and easily digestible, moong dal is often prepared for those recovering from illness. It has a subtle, nutty flavor and can be cooked with minimal spicing to maintain its delicate taste.",

    subHeading1o3: "3. Chana Dal (Split Chickpeas)",
    subPara1o3:
      "With a slightly sweet, nutty flavor, chana dal holds its shape well when cooked. It's perfect for heartier preparations and combines beautifully with vegetables and meat.",

    Heading2: "Essential Dal Preparations",
    image2:
      "https://therecipespk.com/wp-content/uploads/2024/07/Dal-Preparations.jpg",
    para2:
      "Pakistani cuisine features numerous dal preparations, from simple everyday versions to elaborate festive dishes that showcase the versatility of lentils.",

    subHeading2o1: "Simple Tadka Dal",
    subPara2o1:
      "The foundation of Pakistani dal cooking - lentils tempered with cumin, garlic, and onions. This basic preparation allows the natural flavor of the lentils to shine through.",

    subHeading2o2: "Dal Makhani",
    subPara2o2:
      "A rich, creamy preparation made with black lentils and kidney beans, slow-cooked with butter and cream. This restaurant-style dish brings luxury to humble ingredients.",

    subHeading2o3: "Mixed Dal",
    subPara2o3:
      "Combining different types of lentils creates complex flavors and textures. This preparation often includes vegetables and is seasoned with a variety of spices for depth.",

    Heading3: "Beyond Dal: Other Legumes",
    image3:
      "https://therecipespk.com/wp-content/uploads/2024/07/Pakistani-Legumes.jpg",
    para3:
      "Pakistani cuisine extends beyond traditional dal to include various other legumes that add protein and flavor to meals.",

    subHeading3o1: "Chickpeas (Cholay)",
    subPara3o1:
      "Whether prepared as chana masala for breakfast or channay for dinner, chickpeas are a protein-rich staple that pairs perfectly with bread and rice.",

    subHeading3o2: "Black-eyed Peas (Lobia)",
    subPara3o2:
      "Popular in Punjabi cuisine, lobia is often cooked with onions, tomatoes, and spices to create a hearty, satisfying curry that's perfect with roti.",

    subHeading3o3: "Kidney Beans (Rajma)",
    subPara3o3:
      "These red beans are cooked in a spiced tomato-based gravy, creating a rich, protein-packed dish that's especially popular in northern Pakistan.",

    Heading4: "Cooking Tips for Perfect Legumes",
    image4:
      "https://therecipespk.com/wp-content/uploads/2024/07/Legume-Cooking-Tips.jpg",
    para4:
      "Mastering the art of cooking lentils and legumes ensures you'll always have nutritious, delicious meals ready for your family.",

    subHeading4o1: "Soaking and Preparation",
    subPara4o1:
      "Most legumes benefit from soaking before cooking. This reduces cooking time and improves digestibility. Rinse thoroughly and remove any stones or damaged pieces.",

    subHeading4o2: "Perfect Texture",
    subPara4o2:
      "Cook lentils until they're soft but not mushy. The ideal consistency allows individual lentils to be visible while creating a slightly thick, comforting broth.",

    subHeading4o3: "Flavor Enhancement",
    subPara4o3:
      "Always finish dal preparations with a tadka (tempering) of cumin, garlic, and onions fried in oil or ghee. This final step elevates the entire dish and adds aromatic depth.",
  },
];

async function seedAdditionalBlogs() {
  try {
    await mongoose.connect(DB_PATH);
    console.log("Connected to MongoDB");

    for (const blogData of additionalBlogs) {
      // Check if the blog already exists
      const existingBlog = await Blog.findOne({ slug: blogData.slug });
      if (existingBlog) {
        console.log(
          `Blog "${blogData.title}" already exists, updating with image data...`
        );
        // Update the existing blog with complete data
        await Blog.findOneAndUpdate({ slug: blogData.slug }, blogData, {
          new: true,
          runValidators: true,
        });
        console.log(`Updated blog: ${blogData.title}`);
      } else {
        // Create the blog
        const blog = await Blog.create(blogData);
        console.log(`Created new blog: ${blog.title}`);
      }
    }

    console.log("All additional blogs processed successfully");
  } catch (error) {
    console.error("Error processing additional blogs:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedAdditionalBlogs();
}

module.exports = { seedAdditionalBlogs, additionalBlogs };
