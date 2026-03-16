import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./component/AboutUs";
import Blog from "./component/Blog";
import BlogsPage from "./component/BlogsPage";
import CategoryPage from "./component/CategoryPage";
import Footer from "./component/Footer";
import Header from "./component/header";
import HeaderDisc from "./component/headerDisc";
import HeroSection from "./component/HeroSection";
import HotCategories from "./component/HotCategories";
import RightSideBar from "./component/LeftSideBar";
import MustTry from "./component/MustTry";
import PizzaPlacesLahore from "./component/PizzaPlacesLahore";
import PopularSection from "./component/PopularSection";
import RamadanRecipes from "./component/RamadanRecipes";
import ReadBlogs from "./component/ReadBlogs";
import RecipeDetails from "./component/RecipeDetails";
import RecipesForEid from "./component/RecipesForEid";
import RecipesForRamadan from "./component/RecipesForRamadan";
import SearchResults from "./component/SearchResults";
import SingleTipPage from "./component/SingleTipPage";

import TipsPage from "./component/TipsPage";
import WorkWithUs from "./component/WorkWithUs";
import AdminDashboard from "./component/AdminDashboard";
import AddRecipeForm from "./component/AddRecipeForm";
import AddBlogForm from "./component/AddBlogForm";
import AddTipForm from "./component/AddTipForm";
import CollectionPage from "./component/CollectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                style={{
                  minHeight: "100vh",
                  width: "100%",
                  background: "#07060a",
                  objectFit: "cover",
                  objectPosition: "center",
                  backgroundSize: "cover",
                  position: "relative",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/HeroImg.jpg')",
                }}
              >
                <Header />
                <HeroSection />
              </div>
              <PopularSection />
              <RightSideBar></RightSideBar>
              <HotCategories />
              <RamadanRecipes />
              <ReadBlogs />
              <MustTry />
              <Footer />
            </>
          }
        />
        <Route
          path="/eid-recipes"
          element={
            <>
              <HeaderDisc />
              <RecipesForEid />
              <Footer />
            </>
          }
        />
        <Route
          path="/ramadan-recipes"
          element={
            <>
              <HeaderDisc />
              <RecipesForRamadan />
              <Footer />
            </>
          }
        />

        <Route
          path="/category/:categorySlug"
          element={
            <>
              <HeaderDisc /> <CategoryPage /> <Footer />
            </>
          }
        />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        <Route path="/blog" element={<BlogsPage />} />
        {/* Dynamic blog details by slug (fallback to id if needed inside component) */}
        <Route path="/blog/:slug" element={<Blog />} />

        {/* Dynamic collection pages */}
        <Route path="/collection/:collectionType" element={<CollectionPage />} />

        <Route
          path="/search"
          element={
            <>
              <HeaderDisc /> <SearchResults /> <Footer />
            </>
          }
        />

        <Route
          path="/tips"
          element={
            <>
              <HeaderDisc />
              <TipsPage />
              <Footer />
            </>
          }
        />
        <Route path="/tips/:slug" element={<SingleTipPage />} />

        <Route
          path="/work-with-us"
          element={
            <>
              <HeaderDisc />
              <WorkWithUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <HeaderDisc />
              <AboutUs />
              <Footer />
            </>
          }
        />
        {/* New article page: 5 Best Pizza Places in Lahore */}
        <Route
          path="/best-pizza-places-in-lahore"
          element={
            <>
              <HeaderDisc />
              <PizzaPlacesLahore />
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-recipe" element={<AddRecipeForm />} />
        <Route path="/admin/add-blog" element={<AddBlogForm />} />
        <Route path="/admin/add-tip" element={<AddTipForm />} />
      </Routes>
    </Router>
  );
}

export default App;
