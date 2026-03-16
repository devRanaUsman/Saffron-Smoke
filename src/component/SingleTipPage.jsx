import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTipBySlug } from "../services/tipsService";
import AboutInDetail from "./AboutInDetail";
import AlsoTryThis from "./AlsoTryThis";
import Footer from "./Footer";
import FaqSection from "./FaqSection";
import HeaderDisc from "./headerDisc";
import RightSideBar from "./LeftSideBar";
import Loader from "./loader";

export default function SingleTipPage() {
  const { slug } = useParams();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    getTipBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        setTip(data);
      })
      .catch(() => mounted && setError("Failed to load tip"))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
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
        <Footer />
      </div>
    );
  }

  if (error || !tip) {
    return (
      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <HeaderDisc />
        <div className="container py-5">
          <div className="text-center">
            <h2 style={{ color: "#d32f2f" }}>{error || "Tip not found"}</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Reusable component for rendering a tip section
  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        // Using 'level' to render h1, h2, h3 etc.
        const Tag = `h${block.level || 2}`;
        return (
          <Tag
            key={index}
            style={{ color: "#000", fontWeight: "600", marginBottom: "1.5rem" }}
          >
            {block.content}
          </Tag>
        );
      case "subheading":
        return (
          <h4
            key={index}
            style={{
              color: "#000",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {block.content}
          </h4>
        );
      case "paragraph":
        return (
          <p
            key={index}
            style={{
              color: "#000",
              lineHeight: "1.8",
              fontSize: "1.1rem",
              marginBottom: "1.5rem",
            }}
          >
            {block.content}
          </p>
        );
      case "image":
        return (
          <div
            key={index}
            style={{ marginBottom: "1.5rem", textAlign: "center" }}
          >
            <img
              src={block.content} // content is the image URL
              alt="Blog content"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <HeaderDisc />

      {/* Left Sidebar */}
      <RightSideBar />
      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <div className="col-12 col-lg-8">
            <article
              className="mx-auto"
              style={{ maxWidth: "800px", padding: "2rem 1rem" }}
            >
              {/* Article Title */}
              <header className="text-center mb-5">
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#333",
                    lineHeight: "1.2",
                    marginBottom: "1rem",
                  }}
                >
                  {tip.title}
                </h1>
              </header>

              {/* Main Image */}
              {tip.mainImage && (
                <div className="text-center mb-5 flex justify-content-center">
                  <img
                    src={tip.mainImage}
                    alt={tip.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}

              {/* Introduction */}
              {tip.intro && (
                <div className="mb-4">
                  <p
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.7",
                      color: "#555",
                      textAlign: "justify",
                    }}
                  >
                    {tip.intro}
                  </p>
                </div>
              )}
              {/* Render the dynamic content blocks */}
              {tip.content && tip.content.length > 0 && (
                <section>
                  {tip.content.map((block, index) =>
                    renderContentBlock(block, index)
                  )}
                </section>
              )}
              {/* FAQ Section */}
              {tip.faqs && tip.faqs.length > 0 && (
                <FaqSection faqs={tip.faqs} />
              )}
            </article>
          </div>
          /{/* Right Sidebar */}
          <div className="col-12 col-lg-2 d-none d-lg-block">
            <AboutInDetail />
          </div>
        </div>
      </div>

      {/* Also Try This Section */}
      <AlsoTryThis
        category="indian"
        tags={["tips", "kitchen"]}
        currentSlug={tip?.slug}
      />

      <Footer />
    </div>
  );
}
