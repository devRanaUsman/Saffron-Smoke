// Frontend API service for Blogs

const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/blogs` : "http://localhost:3002/api/blogs";

// Fetch all blogs (list)
export const fetchBlogs = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const fetchBlogById = async (id) => {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
};

export const fetchBlogBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/by-slug/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
};
