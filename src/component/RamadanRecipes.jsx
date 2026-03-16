import { Link } from "react-router-dom";

function RamadanRecipes() {
  return (
    <div
      style={{
        backgroundColor: "#f7fbff",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)",
      }}
    >
      <div className="container-fluid px-3">
        <div className="row align-items-center justify-self-center g-4">
          {/* Left Text Content */}
          <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Ramadan Recipes
            </h2>
            <p
              style={{
                color: "#555",
                marginBottom: "1.5rem",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                lineHeight: "1.6",
              }}
            >
              Special Pakistani Ramadan Recipes You Must Cook
            </p>
            <Link
              to="/ramadan-recipes"
              className="clickBtn d-inline-block"
              style={{
                backgroundColor: "#f9aa00",
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                color: "#fff",
                padding: "clamp(0.1rem, 2vw, 0.2rem) clamp(0rem, 3vw, 0.5rem)",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                border: "none",
              }}
            >
              Click me
            </Link>
          </div>

          {/* Right Image */}
          <div className="col-12 col-lg-6 text-center">
            <Link to="/ramadan-recipes">
              <img
                src="https://therecipespk.com/wp-content/uploads/2015/04/Pizza-Bread-Roll.jpg"
                alt="Ramadan Recipe"
                className="img-fluid shadow"
                style={{
                  borderRadius: "1rem",
                  maxHeight: "clamp(300px, 50vw, 400px)",
                  width: "100%",
                  maxWidth: "500px",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RamadanRecipes;
