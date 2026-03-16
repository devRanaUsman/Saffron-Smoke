function WorkWithUs() {
  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      {/* Top banner like other inner pages */}

      <div className="container" style={{ padding: "3rem 1rem" }}>
        <h1
          style={{
            color: "#222",
            fontWeight: "bold",
            marginBottom: "6rem",
            textAlign: "center",
            fontSize: "3.5rem",
          }}
        >
          Work With Us
        </h1>

        <div style={{ color: "#333", lineHeight: 1.8, fontSize: "1.5rem" }}>
          <p>
            Are you interested in working with The Recipes PK? We love working
            with brands and companies that support our vision.
          </p>
          <p>
            We create content by reader’s demand, and our search engine
            optimization experts work on it for maximum exposure in search
            results.
          </p>

          <h3 style={{ fontWeight: "bold", marginTop: "2rem" }}>Our Mission</h3>
          <p>
            When you work with The Recipes PK, your business will get long-term
            results.
          </p>
          <p>
            If your product or brand is related to cooking/recipes, we would
            love to discuss a partnership.
          </p>

          <h3 style={{ fontWeight: "bold", marginTop: "2rem" }}>
            Our Audience
          </h3>
          <p>
            We have an active audience of 100K+ food lovers across our channels
            – Pinterest, Instagram, Facebook, and this blog.
          </p>

          <h3 style={{ fontWeight: "bold", marginTop: "2rem" }}>
            What We Offer
          </h3>
          <p>Here are all the ways we would love to show off your Brand.</p>

          <h5
            style={{
              fontWeight: "bold",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            Sponsored Recipe Posts
          </h5>
          <p>
            A Sponsored Recipe Post allows us to incorporate your product or
            content into a recipe.
          </p>

          <h5 style={{ fontWeight: "bold", marginTop: "1rem" }}>
            Sponsored Posts
          </h5>
          <p>
            We would be happy to publish your post on our blog with a link back
            to your blog.
          </p>

          <h5 style={{ fontWeight: "bold", marginTop: "1rem" }}>
            Product Review
          </h5>
          <p>
            Do you have an amazing product and want us to write a detailed
            review of it on our platform?
          </p>
          <p>
            We would be happy to write for your product by highlighting the
            characteristics of it. We let our readers know about all of the
            practical uses of your product!
          </p>

          <h3 style={{ fontWeight: "bold", marginTop: "2rem" }}>
            Are You Ready to Get Started?
          </h3>
          <p>
            To discuss potential collaborations, please shoot an email to
            therecipespk @ gmail.com
          </p>
          <p>We look forward to hearing from you!</p>

          <h3 style={{ fontWeight: "bold", marginTop: "2rem" }}>
            The Recipes PK Featured On:
          </h3>

          {/* Placeholder area for the image that failed to load on the original page */}
          <div
            style={{
              height: "140px",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              marginTop: "1rem",
              background: "#fff",
            }}
            aria-label="Featured logos placeholder"
          >
            Image area reserved (add featured logos here)
          </div>

          {/* Extra space below, like in the screenshot */}
          <div style={{ height: "200px" }} />
        </div>
      </div>
    </div>
  );
}

export default WorkWithUs;
