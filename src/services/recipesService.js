// Frontend API service for Recipes

const BASE_URL = "http://localhost:3002/api/recipes";

// Note: backend expects query key "inEid" and "ramadan"
// Note: backend expects query key "inEid" and "ramadan"

export const getRecipes = async (section, category, q, ramadan, eid) => {
  const params = new URLSearchParams();
  if (section) params.set("section", section);
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  if (ramadan) params.set("ramadan", "true");
  if (eid) params.set("inEid", "true");
  const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}; 

export const getRecipe = async (slug) => {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Recipe not found");
  return res.json();
};

export const getBlogWithRelatedRecipes = async (slug) => {
  const res = await fetch(`${BASE_URL}/blog/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Blog post not found");
  return res.json();
};

export const getRecipesByCollection = async (collectionType) => {
  const params = new URLSearchParams({ collection: collectionType });
  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch recipes by collection");
  return res.json();
};
