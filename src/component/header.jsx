import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const collections = [
  { label: "Top 8 Recipes", to: "/collection/top-8-recipes" },
  { label: "Best Biryani Recipes", to: "/collection/best-biryani" },
  { label: "Ramadan Special", to: "/collection/ramadan-special" },
  { label: "Eid Special", to: "/collection/eid-special" },
];

const nav = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/search" },
  { label: "Tips & Tricks", to: "/tips" },
  { label: "Blog", to: "/blog" },
  { label: "Work With Us", to: "/work-with-us" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setCollectionsOpen(false);
  }, [location.pathname]);

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target)) return;
      setCollectionsOpen(false);
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <header className="site-header" ref={menuRef}>
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Home">
          <img className="brand__logo" src="/logo.svg" alt="" />
          <div className="brand__text">
            <span className="brand__name">Saffron & Smoke</span>
            <span className="brand__tag">Tried recipes. Clean steps. Bold flavor.</span>
          </div>
        </Link>

        <button
          className="icon-btn site-header__burger"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary">
          <ul className="site-nav__list">
            {/* Collections dropdown */}
            <li className={`site-nav__item dropdown ${collectionsOpen ? "is-open" : ""}`}>
              <button
                className="site-nav__link dropdown__toggle"
                type="button"
                aria-expanded={collectionsOpen}
                onClick={() => setCollectionsOpen((v) => !v)}
              >
                Collections <FiChevronDown className="dropdown__icon" />
              </button>
              <div className="dropdown__panel" role="menu">
                {collections.map((c) => (
                  <Link key={c.to} to={c.to} className="dropdown__item" role="menuitem">
                    {c.label}
                  </Link>
                ))}
              </div>
            </li>

            {nav.map((item) => (
              <li key={item.to} className="site-nav__item">
                <Link
                  to={item.to}
                  className={`site-nav__link ${activePath === item.to ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* <li className="site-nav__item site-nav__cta">
              <Link to="/search" className="pill" aria-label="Search recipes">
                Search
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
