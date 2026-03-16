import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/blogsService";
import Loader from "./loader";

function ReadBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    fetchBlogs()
      .then((data) => mounted && setBlogs(data))
      .catch(() => mounted && setError("Failed to load blogs"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  console.log(blogs);
  const newBlogs = blogs.slice(0, 3);

  return (
    <div style={{ backgroundColor: "#f7fbff", padding: "3rem 1rem" }}>
      <div className="container">
        <h2
          className="text-center mb-5"
          style={{ color: "#333", fontWeight: "bold" }}
        >
          READ OUR BLOGS
        </h2>

        {loading && (
          <div className="state-wrapper">
            <Loader />
            <div className="state-wrapper__text mt-3">Loading latest stories...</div>
          </div>
        )}
        {error && !loading && (
          <div className="state-wrapper">
            <div className="state-wrapper__icon">⚠️</div>
            <div className="state-wrapper__text text-danger">Oops!</div>
            <div className="state-wrapper__subtext">{error}</div>
          </div>
        )}
        {!loading && !error && blogs.length === 0 && (
          <div className="state-wrapper">
            <div className="state-wrapper__icon">📖</div>
            <div className="state-wrapper__text">No Stories Yet</div>
            <div className="state-wrapper__subtext">Check back soon for latest reads.</div>
          </div>
        )}

        <div className="row g-4 justify-content-center">
          {newBlogs.map((blog) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={blog._id}>
              <div className="card blog-card shadow-sm border-0">
                <div className="image-wrapper position-relative">
                  <Link to={`/blog/${blog.slug || blog._id}`}>
                    <img
                      src={blog.mainImage}
                      alt={blog.title}
                      className="card-img-top"
                      style={{
                        height: "250px",
                        objectFit: "cover",
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
                  <p
                    className="card-text"
                    style={{ fontWeight: "500", color: "#333" }}
                  >
                    {blog.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadBlogs;
