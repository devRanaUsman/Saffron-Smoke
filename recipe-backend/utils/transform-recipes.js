const fs = require("fs").promises;
const path = require("path");

/**
 * This script automates transformations on a recipe JSON file.
 * It performs the following operations:
 * 1. Deletes all `_id` fields from each recipe object.
 * 2. Changes any `section: "blog"` to `section: "general"`.
 *
 * Usage: node utils/transform-recipes.js <path_to_json_file>
 */

async function transformRecipes(filePath) {
  try {
    console.log(`Reading file from: ${filePath}`);
    const data = await fs.readFile(filePath, "utf8");
    const recipes = JSON.parse(data);

    let changesMade = false;
    const transformedRecipes = recipes.map((recipe) => {
      // 1. Delete the _id field if it exists
      if (recipe._id) {
        delete recipe._id;
        changesMade = true;
      }

      // 2. Change section: "blog" to "general"
      if (recipe.section === "blog") {
        recipe.section = "general";
        changesMade = true;
      }
      return recipe;
    });

    if (changesMade) {
      await fs.writeFile(filePath, JSON.stringify(transformedRecipes, null, 2));
      console.log(`Successfully transformed and updated ${filePath}`);
    } else {
      console.log("No transformations needed. File is already up to date.");
    }
  } catch (error) {
    console.error("An error occurred during the transformation:", error);
    process.exit(1);
  }
}

const filePathArg = process.argv[2];
if (!filePathArg) {
  console.error("Error: Please provide the path to the JSON file.");
  console.log("Usage: node utils/transform-recipes.js <path_to_json_file>");
  process.exit(1);
}

const absolutePath = path.resolve(filePathArg);
transformRecipes(absolutePath);
