import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipes } from "../services/recipesService";
import Loader from "./loader";
import Pagination from "./pagination";

// Pretty titles for each categorySlug slug
const SLUG_TITLE_MAP = {
  appetizers: "Appetizers & Snacks",
  beverages: "Beverages",
  breakfast: "Breakfast",
  "dip-condiment": "Dip & Condiment",
  dessert: "Dessert",
  "roti-paratha-naan": "Roti-Paratha-Naan",
  salad: "Salad",
  sandwiches: "Sandwiches",
  soup: "Soup",
  "tikka-kabab-cutlets": "Tikka-Kabab-Cutlets",
  vegetarian: "Vegetarian",
  rice: "Rice",
};

function displaycategorySlug(slug) {
  // Prefer mapped title; fallback to humanized slug
  if (!slug) return "";
  return (
    SLUG_TITLE_MAP[slug] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function CategorySlugPage() {
  const { categorySlug } = useParams();
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(12);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lastPageIndex = currentPage * postPerpage;
  const firstPageIndex = lastPageIndex - postPerpage;

  const heading = useMemo(
    () => displaycategorySlug(categorySlug),
    [categorySlug]
  );

  // Ensure we land at the top when navigating between categories
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [categorySlug]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getRecipes(undefined, categorySlug)
      .then((data) => {
        if (!mounted) return;
        setRecipes(data);
      })
      .catch(() => mounted && setError("Failed to load recipes"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [categorySlug]);
  console.log(recipes);
  const newRecipe = recipes.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <div style={{ backgroundColor: "#f7fbff", minHeight: "100vh" }}>
        <div className="container py-4  ">
          <h2
            className=""
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "2.5rem",
              textAlign: "center",
              marginBottom: "5rem",
            }}
          >
            {heading} Recipes
          </h2>
          {loading && (
            <div className="state-wrapper">
              <Loader />
              <div className="state-wrapper__text mt-3">Loading recipes...</div>
            </div>
          )}
          {error && !loading && (
            <div className="state-wrapper">
              <div className="state-wrapper__icon">⚠️</div>
              <div className="state-wrapper__text text-danger">Oops!</div>
              <div className="state-wrapper__subtext">{error}</div>
            </div>
          )}
          {!loading && !error && recipes.length === 0 && (
            <div className="state-wrapper">
              <div className="state-wrapper__icon">🍽️</div>
              <div className="state-wrapper__text">No Recipes Found</div>
              <div className="state-wrapper__subtext">We couldn't find any recipes in this category.</div>
            </div>
          )}

          <div className="row g-4">
            {newRecipe.map((recipe) => (
              <div className="col-12 col-md-4" key={recipe._id}>
                <div className="card h-100 shadow-sm border-0">
                  <Link to={`/recipe/${recipe.slug}`}>
                    <img
                      src={recipe.image}
                      className="card-img-top cardImg"
                      alt={recipe.title}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        width: "100%",
                        height: "245px",
                        borderRadius: "0.375rem",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5
                      className="card-title "
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      {recipe.title}
                    </h5>
                    <Link to={`/recipe/${recipe.slug}`}>
                      <button className="text-black"> Get Recipe →</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          setcurrentPage={setcurrentPage}
          currentPage={currentPage}
          totalpost={recipes.length}
          postPerpage={postPerpage}
        />
      </div>
    </>
  );
}
