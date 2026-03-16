import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipesService";
import AboutSidebar from "./AboutSlideBar";
import Loader from "./loader";

function PopularSection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Static card(s) requested by user – hardcoded data
  const staticCards = [
    {
      _id: "static-best-pizza-lahore",
      title: "5 Best Pizza Places in Lahore for Desi People",
      slug: "/best-pizza-places-in-lahore",
      image:
        "https://therecipespk.com/wp-content/uploads/2025/09/Review-of-5-Best-Pizza-Places-in-Lahore-for-Desi-People.jpg", // Place this in public as pizza-card.jpg
    },
  ];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRecipes("popular")
      .then((data) => {
        if (mounted) {
          setRecipes(data);
          setError("");
        }
      })
      .catch(() => mounted && setError("Failed to load popular recipes"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f7fbff",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 3rem)",
      }}
    >
      <div className="container-fluid px-3 px-lg-4">
        <div className="row">
          {/* Left: Popular Recipes */}
          <div className="col-12 col-lg-9">
            <h2 className="mb-5" style={{ color: "#333", textAlign: "center" }}>
              POPULAR RECIPES
            </h2>

            {loading && (
              <div
                className="flex justify-center align-content-center "
                style={{
                  width: "100%",
                  height: "100%",

                  alignItems: "center",
                }}
              >
                <Loader className="mt-5"></Loader>{" "}
              </div>
            )}
            {error && !loading && <div style={{ color: "#333" }}>{error}</div>}
            <div className="row g-4">
              {/* Static hardcoded cards first */}
              {staticCards.map((recipe) => (
                <div className="col-12 col-md-6 col-xl-4" key={recipe._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="image-wrapper position-relative">
                      <Link to={recipe.slug}>
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

              {/* API recipes */}
              {recipes.map((recipe) => (
                <div className="col-12 col-md-6 col-xl-4" key={recipe._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="image-wrapper position-relative">
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

          {/* Right: About Sidebar */}
          <div className="col-12 col-lg-3 mt-4 mt-lg-0 d-flex justify-content-end">
            <div style={{ width: "100%", maxWidth: "420px" }}>
              <AboutSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularSection;
