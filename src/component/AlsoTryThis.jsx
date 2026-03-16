import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipesService";

// Props:
// - category: current recipe category (preferred for related)
// - tags: array of tags to fallback when category has no results
// - currentSlug: to exclude current recipe from suggestions
function AlsoTryThis({ category, tags = [], currentSlug }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError("");

        let items = [];
        // 1) Try by category if available
        if (category) {
          const byCategory = await getRecipes(undefined, category);
          items = byCategory || [];
        }
        // 2) Fallback by first tag search if category missing/empty
        if ((!items || items.length === 0) && tags?.length > 0) {
          const byTag = await getRecipes(undefined, undefined, tags[0]);
          items = byTag || [];
        }

        // Filter out current recipe and non-recipe content; limit to 6
        const cleaned = (items || [])
          .filter((r) => r.slug !== currentSlug)
          .filter((r) => !r.contentType || r.contentType === "recipe")
          .slice(0, 6);

        if (mounted) setSuggestions(cleaned);
      } catch (e) {
        if (mounted) setError("Failed to load suggestions");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [category, JSON.stringify(tags), currentSlug]);

  if (loading) return null; // Keep UI clean; parent likely has loader
  if (error) return null;
  if (!suggestions.length) return null;

  return (
    <div style={{ backgroundColor: "#f7fbff", padding: "3rem 1rem" }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "#333" }}>
          Also Try These Recipes
        </h2>

        <div className="row g-4">
          {suggestions.map((recipe) => (
            <div className="col-12 col-md-4" key={recipe.slug}>
              <div className="card h-100 shadow-sm border-0">
                <div className="image-wrapper position-relative">
                  <Link to={`/recipe/${recipe.slug}`}>
                    <img
                      src={recipe.image}
                      className="card-img-top"
                      alt={recipe.title}
                      style={{
                        objectFit: "cover",
                        height: "245px",
                        borderRadius: "0.375rem",
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="hover-arrow">
                      <FaLongArrowAltRight />
                    </div>
                  </Link>
                </div>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontSize: "1rem", color: "#333" }}
                  >
                    {recipe.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlsoTryThis;
