import { Link } from "react-router-dom";

function HotCategories() {
  const categories = [
    {
      title: "Appetizers & Snacks",
      slug: "appetizers",
      image:
        "https://therecipespk.com/wp-content/uploads/2015/09/crispy-chicken-tenders-600x406.png",
    },
    {
      title: "Beverages",
      slug: "beverages",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Drinks-Beverages-qyjhqodgfdcza6pxuhwgjwy1e660ezvhiosxaommec.png",
    },
    {
      title: "Breakfast",
      slug: "breakfast",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Breakfast-qyjhqodgfdcza6pxuhwgjwy1e660ezvhiosxaommec.png",
    },
    {
      title: "Dip & Condiment",
      slug: "dip-condiment",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Baba-Ganoush-qyjhqhsl3j3z0wzhwx22kglt8h2fx45d5s8ixqwdlw.jpg",
    },
    {
      title: "Dessert",
      slug: "dessert",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Qudraat-Qadir-Recipe-e1497785261515-qyjhqodgfdcza6pxuhwgjwy1e660ezvhiosxaommec.jpg",
    },
    {
      title: "Roti-Paratha-Naan",
      slug: "roti-paratha-naan",
      image:
        "https://therecipespk.com/wp-content/uploads/2013/10/Frozen-Paratha.jpg",
    },
    {
      title: "Salad",
      slug: "salad",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Cashew.Chicken.Salad_-qyjhqfwwpv1edp287w8tfh2w1pbphpxwhixjz6z5yc.jpg",
    },
    {
      title: "Sandwiches",
      slug: "sandwiches",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Chicken-Club-Sandwich-qyjhqodgfdcza6pxuhwgjwy1e660ezvhiosxaommec.jpg",
    },
    {
      title: "Soup",
      slug: "soup",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Chicken-Corn-Soup-qyjhqnfm8jboykrazzhtzf6kssan7arr6k5fteo0kk.jpg",
    },
    {
      title: "Tikka-Kabab-Cutlets",
      slug: "tikka-kabab-cutlets",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Chicken-Malai-Boti-e1497992991684-qyjhqez2j104233lddu6uzbfgbgca0u65ea2hx0k4k.jpg",
    },
    {
      title: "Vegetarian",
      slug: "vegetarian",
      image:
        "https://therecipespk.com/wp-content/uploads/2014/12/Vegetable-Shawarma1.jpg",
    },
    {
      title: "Rice",
      slug: "rice",
      image:
        "https://therecipespk.com/wp-content/uploads/elementor/thumbs/Chicken-Fried-Rice-qyjhqmhs1paemyso5h37exf47ef9zlo0ufhyc4peqs.jpg",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f7fbff", padding: "4rem 1rem" }}>
      <div className="container">
        <h2 className="text-center mb-5" style={{ color: "#333" }}>
          HOT CATEGORIES
        </h2>

        <div className="row g-4 text-center justify-content-center">
          {categories.map((category, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-2">
              <div className="category-card">
                <Link to={`/category/${category.slug}`}>
                  <img
                    src={category.image}
                    alt={category.title}
                    className="category-img img-fluid"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <p className="category-title ">{category.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotCategories;
