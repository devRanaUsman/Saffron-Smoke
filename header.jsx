import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div
        className={`container1 relative text-white my-10 w-full`}
        style={{ zIndex: "100" }}
      >
        <header
          className="d-flex flex-wrap justify-content-center py-3 mb-4"
          style={{ width: "100%" }}
        >
          <Link
            to="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-4 mx-5">
              <img
                className=""
                style={{ width: "10rem" }}
                src="https://therecipespk.com/wp-content/uploads/2017/08/LOGO-1.png"
                alt="logo"
              />
            </span>
          </Link>

          <ul className="nav nav-pills my-5 mx-4 gap-2 navop">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Collections
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/collection/top-8-recipes"
                  >
                    Top 8 Recipes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/collection/best-biryani">
                    Best Biryani Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/collection/ramadan-special"
                  >
                    Ramadan Special
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/collection/eid-special">
                    Eid Special
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link to="/tips" className="nav-link">
                Tips & Tricks
              </Link>
            </li>
            {/* 
            <li className="nav-item">
              <a href="#" className="nav-link">
                Products Review
              </a>
            </li> */}

            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/work-with-us" className="nav-link">
                Work With Us
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;
