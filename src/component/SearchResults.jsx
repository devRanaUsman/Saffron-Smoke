import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getRecipes } from "../services/recipesService";
import Loader from "./loader";
import { FiSearch } from "react-icons/fi";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const [inputValue, setInputValue] = useState(query);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setParams({ q: inputValue.trim() });
    } else {
      setParams({});
    }
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getRecipes(undefined, undefined, query)
      .then((data) => mounted && setRecipes(data))
      .catch(() => mounted && setError("Failed to load search results"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [query]);

  const title = useMemo(() => {
    if (!query) return "Search";
    return `Search results for: "${query}"`;
  }, [query]);

  return (
    <div style={{ backgroundColor: "#f7fbff", minHeight: "100vh" }}>
      <div className="container py-4">
        <h2
          style={{
            color: "#333",
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {title}
        </h2>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <form onSubmit={handleSearch} className="d-flex position-relative">
              <input
                type="text"
                className="form-control form-control-lg pe-5 shadow-sm"
                placeholder="Search recipes, ingredients..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ borderRadius: "16px", border: "1px solid rgba(0,0,0,0.1)" }}
              />
              <button
                type="submit"
                className="btn position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ border: "none", background: "transparent", color: "#666" }}
                aria-label="Search"
              >
                <FiSearch size={22} />
              </button>
            </form>
          </div>
        </div>

        {loading && (
          <div className="state-wrapper">
            <Loader />
            <div className="state-wrapper__text mt-3">Searching...</div>
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
            <div className="state-wrapper__icon">🔍</div>
            <div className="state-wrapper__text">No Results Found</div>
            <div className="state-wrapper__subtext">We couldn't find any recipes matching your search.</div>
          </div>
        )}

        <div className="row g-4">
          {recipes.map((recipe) => (
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
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {recipe.title}
                  </h5>
                  <p
                    className="card-text text-muted mb-3"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {recipe.description.slice(0, 80)}...
                  </p>
                  <Link to={`/recipes/${recipe.slug}`}>
                    <button
                      className="text-black "
                      style={{
                        alignSelf: "flex-end",
                        fontWeight: "bold",
                        justifySelf: "flex-end",
                      }}
                    >
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
