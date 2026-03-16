import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipesByCollection } from "../services/recipesService";
import AboutInDetail from "./AboutInDetail";
import AlsoTryThis from "./AlsoTryThis";
import Footer from "./Footer";
import HeaderDisc from "./headerDisc";
import Loader from "./loader";
import Pagination from "./pagination";

// Collection titles and descriptions
const COLLECTION_INFO = {
  "top-8-recipes": {
    title: "Top 8 Recipes",
    description: "Our most popular and loved recipes handpicked for you",
  },
  "best-biryani": {
    title: "Best Biryani Recipes",
    description: "The finest biryani recipes from traditional to modern twists",
  },
  "ramadan-special": {
    title: "Ramadan Special Recipes",
    description: "Special recipes perfect for Iftar and Sehri",
  },
  "eid-special": {
    title: "Eid Special Recipes",
    description: "Festive recipes to celebrate Eid with family and friends",
  },
  desserts: {
    title: "Delicious Desserts",
    description: "Sweet treats to satisfy your dessert cravings",
  },
  appetizers: {
    title: "Amazing Appetizers",
    description: "Perfect starters to begin any meal",
  },
};

function CollectionPage() {
  const { collectionType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const collectionInfo = useMemo(
    () =>
      COLLECTION_INFO[collectionType] || {
        title: "Recipe Collection",
        description: "A curated collection of recipes",
      },
    [collectionType]
  );

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;
  const currentRecipes = recipes.slice(firstPageIndex, lastPageIndex);

  // Scroll to top when collection changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [collectionType]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getRecipesByCollection(collectionType)
      .then((data) => {
        if (!mounted) return;
        setRecipes(data);
      })
      .catch(() => mounted && setError("Failed to load collection"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [collectionType]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <HeaderDisc />
        <div
          className="flex justify-center align-content-center"
          style={{
            width: "100%",
            height: "50vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <HeaderDisc />

      <div className="container my-5">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-12 col-lg-8">
            {/* Collection Title */}
            <div className="text-center mb-5">
              <h1
                style={{
                  color: "#222",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                {collectionInfo.title}
              </h1>
              <p
                className="text-muted fst-italic"
                style={{ fontSize: "1.1rem" }}
              >
                {collectionInfo.description}
              </p>
            </div>

            {error && !loading && (
              <div
                style={{
                  color: "#d32f2f",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                {error}
              </div>
            )}

            {!loading && !error && recipes.length === 0 && (
              <div style={{ color: "#333", textAlign: "center" }}>
                No recipes found in this collection.
              </div>
            )}

            {/* Recipe Grid */}
            <div className="row g-4 mb-5">
              {currentRecipes.map((recipe) => (
                <div className="col-12 col-md-6" key={recipe._id}>
                  <div
                    className="card h-100 shadow-sm border-0"
                    style={{ overflow: "hidden" }}
                  >
                    <Link to={`/recipe/${recipe.slug}`}>
                      <img
                        src={recipe.image}
                        className="card-img-top"
                        alt={recipe.title}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          width: "100%",
                          height: "220px",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title mb-3"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          color: "#222",
                          lineHeight: "1.4",
                        }}
                      >
                        {recipe.title}
                      </h5>
                      <p
                        className="card-text text-muted mb-3"
                        style={{
                          fontSize: "0.9rem",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {recipe.description ||
                          "A delicious recipe to try at home"}
                      </p>
                      <div
                        className="d-flex justify-content-between align-items-center text-muted mb-3"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {recipe.prepTime && <span>⏱️ {recipe.prepTime}</span>}
                        {recipe.difficulty && (
                          <span>📊 {recipe.difficulty}</span>
                        )}
                        {recipe.servings && <span>👥 {recipe.servings}</span>}
                      </div>
                      <Link
                        to={`/recipe/${recipe.slug}`}
                        className="btn btn-outline-danger mt-auto"
                        style={{ fontWeight: "600" }}
                      >
                        Get Recipe →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {recipes.length > postPerPage && (
              <Pagination
                setcurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalpost={recipes.length}
                postPerpage={postPerPage}
              />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-12 col-lg-4">
            <AboutInDetail />
          </div>
        </div>
      </div>

      <AlsoTryThis />
      <Footer />
    </div>
  );
}

export default CollectionPage;
