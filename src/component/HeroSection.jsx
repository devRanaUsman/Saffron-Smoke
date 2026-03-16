import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__chip">Weekly picks • quick • beginner-friendly</div>

        <h1 className="hero__title">
          Bold flavors,
          <span className="hero__titleAccent"> effortless steps</span>.
        </h1>

        <p className="hero__sub">
          A modern recipe library built for real kitchens — crisp instructions,
          confident results, and the comfort of food that actually works.
        </p>

        <div className="hero__actions">
          {/* Keep routes the same — just a new look */}
          <Link to="/search" className="btn-primary">
            <FiSearch />
            Find a recipe
          </Link>

          <Link to="/ramadan-recipes" className="btn-ghost">
            Explore collections <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
