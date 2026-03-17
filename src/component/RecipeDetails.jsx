import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../services/recipesService";
import AboutInDetail from "./AboutInDetail";
import AlsoTryThis from "./AlsoTryThis";
import Footer from "./Footer";
import HeaderDisc from "./headerDisc";
import Loader from "./loader";

function RecipeDetails() {
  const { recipeId } = useParams(); // slug
  const [recipe, setRecipe] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRecipe(recipeId)
      .then((data) => {
        if (mounted) {
          setRecipe(data);
          setError("");
        }
      })
      .catch(() => {
        if (mounted) setError("Recipe not found");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [recipeId]);

  if (loading)
    return (
      <div
        className="flex justify-center align-content-center "
        style={{
          width: "100%",
          height: "100%",
          marginTop: "20%",

          alignItems: "center",
        }}
      >
        <Loader className="mt-5"></Loader>{" "}
      </div>
    );
  if (error || !recipe)
    return (
      <div style={{ color: "#333", padding: "2rem" }}>
        {error || "Recipe not found"}
      </div>
    );

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <HeaderDisc />

      <div className="container my-5">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-12 col-lg-8">
            {/* Recipe Title */}
            <div className="text-center mb-5">
              <h1 style={{ color: "#222", fontWeight: "bold" }}>
                {recipe.title}
              </h1>
              <p className="text-muted fst-italic">
                A delicious and refreshing recipe to try at home.
              </p>
            </div>
            {/* Recipe Image Full Width */}
            <div className="text-center  DetailImg mb-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="img-fluid rounded shadow "
                style={{
                  minHeight: "23rem",
                  maxHeight: "380px",
                  objectFit: "cover",
                }}
              />
            </div>
            {/* Recipe Metadata */}
            <div className="row mb-5 " style={{ marginLeft: "-25px" }}>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  {recipe.prepTime && (
                    <li
                      className="list-group-item bg-transparent text-dark"
                      style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    >
                      <strong>Prep Time:</strong> {recipe.prepTime}
                    </li>
                  )}
                  {recipe.cookTime && (
                    <li
                      className="list-group-item bg-transparent text-dark"
                      style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    >
                      <strong>Cook Time:</strong> {recipe.cookTime}
                    </li>
                  )}
                  {recipe.servings && (
                    <li
                      className="list-group-item bg-transparent text-dark"
                      style={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    >
                      <strong>Servings:</strong> {recipe.servings}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* Ingredients */}
            {!!recipe.ingredients?.length && (
              <div className="mb-5">
                <h3
                  className="mb-3"
                  style={{
                    color: "#333",
                    borderBottom: "2px solid #ddd",
                    paddingBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Ingredients
                </h3>
                <ul className="list-unstyled" style={{ color: "#444" }}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="mb-1"
                      style={{ fontSize: "1.2rem" }}
                    >
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Instructions */}
            {!!recipe.instructions?.length && (
              <div className="mb-5">
                <h3
                  className="mb-3"
                  style={{
                    color: "#333",
                    borderBottom: "2px solid #ddd",
                    paddingBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Instructions
                </h3>
                <ul
                  className="list-unstyled"
                  style={{ color: "#444", paddingLeft: "0rem" }}
                >
                  {recipe.instructions.map((step, index) => (
                    <li
                      key={index}
                      className="mb-3"
                      style={{ fontSize: "1.2rem" }}
                    >
                      • {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!recipe.ingredientsInUrdu?.length && (
              <>
                {" "}
                <h1 style={{ color: "#222", fontWeight: "bold" }}>
                  {recipe.title} recipe in urdu
                </h1>
                <h2
                  className="text-right"
                  style={{
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  {" "}
                  {recipe.titleinUrdu ? recipe.titleinUrdu : ""}{" "}
                </h2>{" "}
              </>
            )}
            {/* {recipe.titleinUrdu ? recipe.titleinUrdu : ""}{" "} */}
            {/* Ingredients in Urdu */}
            {!!recipe.ingredientsInUrdu?.length && (
              <div className="mb-5" style={{ textAlign: "right" }}>
                <h3
                  className="mb-3"
                  style={{
                    color: "#333",
                    paddingBottom: "0.2rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    fontSize: "1.7rem",
                  }}
                >
                  اردو میں اجزاء
                </h3>
                <ul className="" style={{ color: "#444" }}>
                  {recipe.ingredientsInUrdu.map((ingredient, index) => (
                    <li
                      key={index}
                      className="mb-1"
                      style={{
                        color: "#333",
                        paddingBottom: "0.2rem",
                        fontSize: "1.4rem",
                      }}
                    >
                      {ingredient} •
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!recipe.instructionsInUrdu?.length && (
              <div className="mb-5 " style={{ textAlign: "right" }}>
                <h3
                  className="mb-3"
                  style={{
                    color: "#333",
                    paddingBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  ترکیب
                </h3>
                <ul
                  className="list-unstyled"
                  style={{ color: "#444", paddingLeft: "0rem" }}
                >
                  {recipe.instructionsInUrdu.map((step, index) => (
                    <li
                      key={index}
                      className="mb-3"
                      style={{
                        color: "#333",
                        paddingBottom: "0.2rem",
                        fontSize: "1.4rem",
                      }}
                    >
                      {step} •
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-12 col-lg-4">
            <AboutInDetail />
          </div>
        </div>
      </div>

      <AlsoTryThis
        category={recipe.category}
        tags={recipe.tags}
        currentSlug={recipe.slug}
      />
      <Footer />
    </div>
  );
}

export default RecipeDetails;
