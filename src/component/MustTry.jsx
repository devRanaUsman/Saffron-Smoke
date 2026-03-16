import { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/recipesService';
import Loader from "./loader";

function MustTry() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRecipes('must-try')
      .then((data) => {
        if (mounted) {
          setRecipes(data);
          setError('');
        }
      })
      .catch(() => mounted && setError('Failed to load must-try recipes'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ backgroundColor: '#f7fbff', padding: '3rem 1rem' }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: '#333' }}>
          Must Try Yummies
        </h2>

        {loading && (
          <div className="state-wrapper">
            <Loader />
            <div className="state-wrapper__text mt-3">Loading hot recipes...</div>
          </div>
        )}
        {error && !loading && (
          <div className="state-wrapper">
            <div className="state-wrapper__icon">⚠️</div>
            <div className="state-wrapper__text text-danger">Oops!</div>
            <div className="state-wrapper__subtext">{error}</div>
          </div>
        )}
        {!loading && !error && recipes.length === 0 && (
          <div className="state-wrapper">
            <div className="state-wrapper__icon">🔥</div>
            <div className="state-wrapper__text">Nothing Here Yet</div>
            <div className="state-wrapper__subtext">Check back soon for our trending must-try recipes.</div>
          </div>
        )}

        <div className="row g-4">
          {recipes.map((recipe) => (
            <div className="col-12 col-md-4" key={recipe._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="image-wrapper position-relative">
                  <Link to={`/recipe/${recipe.slug}`}>
                    <img
                      src={recipe.image}
                      className=" card-img-top cardImg"
                      alt={recipe.title}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '245px',
                        borderRadius: '0.375rem',
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="hover-arrow">
                      <FaLongArrowAltRight />
                    </div>
                  </Link>
                </div>

                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '1rem', color: '#333' }}>
                    {recipe.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MustTry;