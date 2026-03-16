import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram, FiMail } from "react-icons/fi";
import { subscribe } from "../services/subscriptionService";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }
    try {
      setLoading(true);
      const result = await subscribe(email);
      setStatus(result.message || "Subscribed successfully.");
      setEmail("");
    } catch (err) {
      setStatus(err.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="footer-brand">
              <img src="/logo.svg" alt="" className="footer-brand__logo" />
              <div>
                <div className="footer-brand__name">Saffron & Smoke</div>
                <div className="footer-brand__tag">
                  Recipes, tips & short reads — built with React.
                </div>
              </div>
            </div>

            <form className="newsletter" onSubmit={onSubscribe}>
              <label className="newsletter__label" htmlFor="newsletter">
                Get new recipes in your inbox
              </label>
              <div className="newsletter__row">
                <FiMail className="newsletter__icon" />
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="newsletter__input"
                />
                <button className="newsletter__btn" disabled={loading} type="submit">
                  {loading ? "…" : (
                    <>
                      Subscribe <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
              {status ? <div className="newsletter__status">{status}</div> : null}
            </form>

            <a className="social" href="#" aria-label="Instagram">
              <FiInstagram />
              <span>Follow on Instagram</span>
            </a>
          </div>

          <div className="site-footer__col">
            <div className="site-footer__heading">Site</div>
            <ul className="site-footer__links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/work-with-us">Work With Us</Link>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Disclaimer</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__col">
            <div className="site-footer__heading">Collections</div>
            <ul className="site-footer__links">
              <li>
                <Link to="/ramadan-recipes">Ramadan</Link>
              </li>
              <li>
                <Link to="/eid-recipes">Eid</Link>
              </li>
              <li>
                <Link to="/tips">Tips & Tricks</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © 2013–2025 <span className="dot">•</span> Portfolio remix by U&TcodeWorks
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
