import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/blogsService";
import Loader from "./loader";
import Pagination from "./pagination";
import HeaderDisc from "./headerDisc";
import Footer from "./Footer";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [postPerpage] = useState(12);

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

  const last = currentPage * postPerpage;
  const first = last - postPerpage;
  const pageItems = blogs.slice(first, last);

  return (
    <div style={{ backgroundColor: "#f7fbff", minHeight: "100vh" }}>
      <HeaderDisc />
      <div className="container py-4">
        <h2
          style={{
            color: "#333",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Blog
        </h2>

        {loading && (
          <div className="state-wrapper">
            <Loader />
            <div className="state-wrapper__text mt-3">Loading blogs...</div>
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
            <div className="state-wrapper__text">No Blogs Found</div>
            <div className="state-wrapper__subtext">Check back later for new stories and articles.</div>
          </div>
        )}
        <div className="row g-4">
          {pageItems.map((blog) => (
            <div className="col-12 col-md-4" key={blog._id}>
              <div className="card h-100 shadow-sm border-0">
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    src={blog.mainImage}
                    className="card-img-top cardImg"
                    alt={blog.title}
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
                    {blog.title}
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
                    {blog.intro}...
                  </p>
                  <Link to={`/blogs/${blog.slug}`}>
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

      <Pagination
        setcurrentPage={setcurrentPage}
        currentPage={currentPage}
        totalpost={blogs.length}
        postPerpage={postPerpage}
      />
      <Footer />
    </div>
  );
}
