import HeaderDisc from "./headerDisc";

function AboutUs() {
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container" style={{ padding: "3rem 1rem" }}>
        <h1 style={{ color: "#222", fontWeight: "bold", marginBottom: "2rem" }}>
          About
        </h1>

        <div className="row g-4">
          {/* Left column: text */}
          <div className="col-12 col-lg-8">
            <div
              style={{ color: "#333", lineHeight: 1.8, fontSize: "1.05rem" }}
            >
              <h3 style={{ fontWeight: "bold" }}>About Me</h3>

              <h3 style={{ fontWeight: "bold", marginTop: "1rem" }}>
                Meet U&amp;T CodeWorks
              </h3>

              <p>
                I cook, shoot and write since 2014 on{" "}
                <a href="#" target="_blank" rel="noreferrer">
                  "The Recipe PK"
                </a>
                .
              </p>

              <p>
                I'm Abrish, and I love food. A lot. Like, a crazy amount. So
                much so that I decided to start a food blog to share my recipes
                with the world.
              </p>

              <p>
                I was born and raised in Pakistan, and now I am in the United
                Arab Emirates. I have a deep love for all things Pakistani Food
                and Middle Eastern cuisine. But I also like to experiment with
                different flavors from around the world, so you'll find recipes
                on my blog for everything from Pakistani cuisines to Italian
                pasta dishes.
              </p>

              <p>
                I experiment by mixing and matching various cuisines because I
                believe food is a common platform everybody can relate to. If
                you've enjoyed your stay on my blog, I would love to hear from
                you.
              </p>

              <p>Each recipe is tried and true, family-tested, and approved.</p>

              <p>
                The purpose behind making this blog is to put all my recipes in
                a single place. I am also sharing my friend's recipes so people
                can get authentic recipes and enjoy them with their family and
                guests.
              </p>

              <p>
                I hope you enjoy trying out my recipes as much as I enjoyed
                creating them!
              </p>

              <p>
                Thank you for stopping here. I will be glad to hear from your
                side. If you have any questions or want to ask about a recipe,
                feel free to catch me at therecipespk @ gmail .com (remove
                space).
              </p>

              {/* Social icons space (optional) */}
              <div className="d-flex gap-3" style={{ fontSize: "1.5rem" }}>
                <span role="img" aria-label="facebook">
                  📘
                </span>
                <span role="img" aria-label="twitter">
                  🐦
                </span>
                <span role="img" aria-label="pinterest">
                  📌
                </span>
              </div>
            </div>
          </div>

          {/* Right column: avatar (circular) */}
          <div className="col-12 col-lg-4 d-flex justify-content-lg-end justify-content-center">
            <img
              src="https://images.generated.photos/3F-placeholder-female-portrait.jpg"
              alt="Author"
              style={{
                width: "280px",
                height: "280px",
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        </div>

        <h3 style={{ fontWeight: "bold", marginTop: "3rem" }}>
          This place for ads
        </h3>
        <div
          style={{
            height: "160px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
            background: "#fff",
            marginTop: "0.5rem",
          }}
          aria-label="Ad placeholder"
        >
          Ad/Image area reserved
        </div>

        <div style={{ height: "220px" }} />
      </div>
    </div>
  );
}

export default AboutUs;
