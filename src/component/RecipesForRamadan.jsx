import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipesService";
import Loader from "./loader";
import Pagination from "./pagination";

export default function RecipesForRamadan() {
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(12);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const lastPageIndex = currentPage * postPerpage;
  const firstPageIndex = lastPageIndex - postPerpage;
  const paginatedRecipes = recipes.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getRecipes(undefined, undefined, undefined, true) // ✅ ramadan=true
      .then((data) => {
        if (!mounted) return;
        setRecipes(data);
      })
      .catch(() => mounted && setError("Failed to load Ramadan recipes"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#f7fbff", minHeight: "100vh" }}>
      <div className="container py-4">
        <h2
          style={{
            color: "#333",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "5rem",
          }}
        >
          Ramadan Recipes
        </h2>

        {loading && (
          <div className="flex justify-center align-content-center">
            <Loader className="mt-5" />
          </div>
        )}

        {error && !loading && <div style={{ color: "#333" }}>{error}</div>}

        {!loading && !error && recipes.length === 0 && (
          <div style={{ color: "#333" }}>No Ramadan recipes found.</div>
        )}

        <div className="row g-4">
          {paginatedRecipes.map((recipe) => (
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
                    className="card-title"
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

        <Pagination
          setcurrentPage={setcurrentPage}
          currentPage={currentPage}
          totalpost={recipes.length}
          postPerpage={postPerpage}
        />
      </div>
    </div>
  );
}
