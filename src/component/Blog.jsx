import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../services/blogsService";
import AboutInDetail from "./AboutInDetail";
import FaqSection from "./FaqSection";
import Footer from "./Footer";
import HeaderDisc from "./headerDisc";
import Loader from "./loader";

function Blog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    fetchBlogBySlug(slug)
      .then((data) => {
        if (mounted) {
          setBlog(data);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Failed to load blog post");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div className="text-center">
            <h2 style={{ color: "#333", marginBottom: "1rem" }}>
              Blog Post Not Found
            </h2>
            <p style={{ color: "#666" }}>
              {error || "The requested blog post could not be found."}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Renders a single content block based on its type
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
    <>
      <HeaderDisc />

      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <div className="container" style={{ padding: "2rem 1rem" }}>
          <div className="row">
            {/* Main Content - Expanded */}
            <div className="col-lg-9">
              <div style={{ padding: "2rem" }}>
                {/* Main Title - Centered */}
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "2rem",
                    textAlign: "center",
                    color: "#000",
                  }}
                >
                  {blog.title}
                </h1>

                {/* Main Image */}
                {blog.mainImage && (
                  <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                    <img
                      src={blog.mainImage}
                      alt={blog.title}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                )}

                {/* Intro */}
                <div style={{ marginBottom: "3rem" }}>
                  <p
                    style={{
                      color: "#000",
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                    }}
                  >
                    {blog.intro}
                  </p>
                </div>

                {/* Render the dynamic content blocks */}
                {blog.content && blog.content.length > 0 && (
                  <section>
                    {blog.content.map((block, index) =>
                      renderContentBlock(block, index)
                    )}
                  </section>
                )}
                {/* FAQ Section */}
                {blog.faqs && blog.faqs.length > 0 && (
                  <FaqSection faqs={blog.faqs} />
                )}
              </div>
            </div>

            {/* Sidebar - Reduced */}
            <div className="col-lg-3">
              <AboutInDetail />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Blog;
