import React, { useState } from "react";
import axios from "axios";
import "./AddRecipeForm.css";

const AddRecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    titleInUrdu: "",
    image: "",
    description: "",
    descriptionInUrdu: "",
    ingredients: [""],
    instructions: [""],
    ingredientsInUrdu: [""],
    instructionsInUrdu: [""],
    prepTime: "",
    cookTime: "",
    totalTime: "",
    servings: "",
    category: "",
    section: "general",
    tags: "",
    isRamadan: false,
    inEid: false,
    author: {
      name: "",
      image: "",
      bio: "",
    },
    relatedRecipes: [""],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    "appetizers",
    "beverages",
    "breakfast",
    "dip-condiment",
    "dessert",
    "roti-paratha-naan",
    "salad",
    "sandwiches",
    "soup",
    "tikka-kabab-cutlets",
    "vegetarian",
    "rice",
  ];

  const sections = ["popular", "must-try", "general"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedInputChange = (e, field, subfield) => {
    const { value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subfield]: value,
      },
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Clean up the data
      const cleanRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.filter((item) => item.trim() !== ""),
        instructions: recipe.instructions.filter((item) => item.trim() !== ""),
        ingredientsInUrdu: recipe.ingredientsInUrdu.filter(
          (item) => item.trim() !== ""
        ),
        instructionsInUrdu: recipe.instructionsInUrdu.filter(
          (item) => item.trim() !== ""
        ),
        tags: recipe.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        relatedRecipes: recipe.relatedRecipes.filter(
          (item) => item.trim() !== ""
        ),
      };

      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/recipes/admin/add` : "http://localhost:3002/api/recipes/admin/add";
      const response = await axios.post(apiUrl, cleanRecipe);

      setMessage("Recipe added successfully!");

      // Reset form
      setRecipe({
        title: "",
        titleInUrdu: "",
        image: "",
        description: "",
        descriptionInUrdu: "",
        ingredients: [""],
        instructions: [""],
        ingredientsInUrdu: [""],
        instructionsInUrdu: [""],
        prepTime: "",
        cookTime: "",
        totalTime: "",
        servings: "",
        category: "",
        section: "general",
        tags: "",
        isRamadan: false,
        inEid: false,
        author: {
          name: "",
          image: "",
          bio: "",
        },
        relatedRecipes: [""],
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-form">
      <div className="form-header">
        <h1>Add New Recipe</h1>
        <p>Fill in the details to create a new recipe</p>
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="recipe-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label htmlFor="title">Title (English) *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="titleInUrdu">Title (Urdu)</label>
            <input
              type="text"
              id="titleInUrdu"
              name="titleInUrdu"
              value={recipe.titleInUrdu}
              onChange={handleInputChange}
              style={{ direction: "rtl", textAlign: "right" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              type="url"
              id="image"
              name="image"
              value={recipe.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (English)</label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionInUrdu">Description (Urdu)</label>
            <textarea
              id="descriptionInUrdu"
              name="descriptionInUrdu"
              value={recipe.descriptionInUrdu}
              onChange={handleInputChange}
              rows="4"
              style={{ direction: "rtl", textAlign: "right" }}
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div className="form-section">
          <h2>Recipe Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prepTime">Prep Time</label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={recipe.prepTime}
                onChange={handleInputChange}
                placeholder="e.g., 15 minutes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cookTime">Cook Time</label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={recipe.cookTime}
                onChange={handleInputChange}
                placeholder="e.g., 30 minutes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalTime">Total Time</label>
              <input
                type="text"
                id="totalTime"
                name="totalTime"
                value={recipe.totalTime}
                onChange={handleInputChange}
                placeholder="e.g., 45 minutes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="servings">Servings</label>
              <input
                type="text"
                id="servings"
                name="servings"
                value={recipe.servings}
                onChange={handleInputChange}
                placeholder="e.g., 4 people"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={recipe.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="section">Section</label>
              <select
                id="section"
                name="section"
                value={recipe.section}
                onChange={handleInputChange}
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={recipe.tags}
                onChange={handleInputChange}
                placeholder="spicy, quick, vegetarian"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isRamadan"
                  checked={recipe.isRamadan}
                  onChange={handleInputChange}
                />
                Ramadan Special
              </label>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="inEid"
                  checked={recipe.inEid}
                  onChange={handleInputChange}
                />
                Eid Special
              </label>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="form-section">
          <h2>Ingredients</h2>

          <h3>English Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleArrayInputChange(index, "ingredients", e.target.value)
                }
                placeholder={`Ingredient ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "ingredients")}
                className="remove-btn"
                disabled={recipe.ingredients.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("ingredients")}
            className="add-btn"
          >
            Add Ingredient
          </button>

          <h3>Urdu Ingredients</h3>
          {recipe.ingredientsInUrdu.map((ingredient, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) =>
                  handleArrayInputChange(
                    index,
                    "ingredientsInUrdu",
                    e.target.value
                  )
                }
                placeholder={`اجزاء ${index + 1}`}
                style={{ direction: "rtl", textAlign: "right" }}
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "ingredientsInUrdu")}
                className="remove-btn"
                disabled={recipe.ingredientsInUrdu.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("ingredientsInUrdu")}
            className="add-btn"
          >
            Add Urdu Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="form-section">
          <h2>Instructions</h2>

          <h3>English Instructions</h3>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="array-input-group">
              <textarea
                value={instruction}
                onChange={(e) =>
                  handleArrayInputChange(index, "instructions", e.target.value)
                }
                placeholder={`Step ${index + 1}`}
                rows="2"
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "instructions")}
                className="remove-btn"
                disabled={recipe.instructions.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("instructions")}
            className="add-btn"
          >
            Add Instruction
          </button>

          <h3>Urdu Instructions</h3>
          {recipe.instructionsInUrdu.map((instruction, index) => (
            <div key={index} className="array-input-group">
              <textarea
                value={instruction}
                onChange={(e) =>
                  handleArrayInputChange(
                    index,
                    "instructionsInUrdu",
                    e.target.value
                  )
                }
                placeholder={`مرحلہ ${index + 1}`}
                rows="2"
                style={{ direction: "rtl", textAlign: "right" }}
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "instructionsInUrdu")}
                className="remove-btn"
                disabled={recipe.instructionsInUrdu.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("instructionsInUrdu")}
            className="add-btn"
          >
            Add Urdu Instruction
          </button>
        </div>

        {/* Author Information */}
        <div className="form-section">
          <h2>Author Information</h2>

          <div className="form-group">
            <label htmlFor="authorName">Author Name</label>
            <input
              type="text"
              id="authorName"
              value={recipe.author.name}
              onChange={(e) => handleNestedInputChange(e, "author", "name")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="authorImage">Author Image URL</label>
            <input
              type="url"
              id="authorImage"
              value={recipe.author.image}
              onChange={(e) => handleNestedInputChange(e, "author", "image")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="authorBio">Author Bio</label>
            <textarea
              id="authorBio"
              value={recipe.author.bio}
              onChange={(e) => handleNestedInputChange(e, "author", "bio")}
              rows="3"
            />
          </div>
        </div>

        {/* Related Recipes */}
        <div className="form-section">
          <h2>Related Recipes (Slugs)</h2>
          {recipe.relatedRecipes.map((relatedRecipe, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={relatedRecipe}
                onChange={(e) =>
                  handleArrayInputChange(
                    index,
                    "relatedRecipes",
                    e.target.value
                  )
                }
                placeholder="recipe-slug"
              />
              <button
                type="button"
                onClick={() => removeArrayField(index, "relatedRecipes")}
                className="remove-btn"
                disabled={recipe.relatedRecipes.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("relatedRecipes")}
            className="add-btn"
          >
            Add Related Recipe
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Adding Recipe..." : "Add Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
