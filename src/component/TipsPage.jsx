import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTips } from "../services/tipsService";
import Loader from "./loader";
import Pagination from "./pagination";

export default function TipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;

  // Ensure we land at the top when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getAllTips()
      .then((data) => {
        if (!mounted) return;
        setTips(data);
      })
      .catch(() => mounted && setError("Failed to load tips and tricks"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const currentTips = tips.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <div style={{ backgroundColor: "#f7fbff", minHeight: "100vh" }}>
        <div className="container py-4">
          <h2
            className=""
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "2.5rem",
              textAlign: "center",
              marginBottom: "5rem",
            }}
          >
            Tips & Tricks
          </h2>
          {loading && (
            <div className="state-wrapper">
              <Loader />
              <div className="state-wrapper__text mt-3">Loading tips...</div>
            </div>
          )}
          {error && !loading && (
            <div className="state-wrapper">
              <div className="state-wrapper__icon">⚠️</div>
              <div className="state-wrapper__text text-danger">Oops!</div>
              <div className="state-wrapper__subtext">{error}</div>
            </div>
          )}
          {!loading && !error && tips.length === 0 && (
            <div className="state-wrapper">
              <div className="state-wrapper__icon">📝</div>
              <div className="state-wrapper__text">No Tips Found</div>
              <div className="state-wrapper__subtext">Check back later for new tips and tricks.</div>
            </div>
          )}

          <div className="row g-4">
            {currentTips.map((tip) => (
              <div className="col-12 col-md-4" key={tip._id}>
                <div className="card h-100 shadow-sm border-0">
                  <Link to={`/tips/${tip.slug}`}>
                    <img
                      src={tip.mainImage}
                      className="card-img-top cardImg"
                      alt={tip.title}
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
                      style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      {tip.title}
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
                      {tip.intro}...
                    </p>
                    <Link to={`/tips/${tip.slug}`}>
                      <button className="text-black">Read More →</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          setcurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalpost={tips.length}
          postPerpage={postPerPage}
        />
      </div>
    </>
  );
}
