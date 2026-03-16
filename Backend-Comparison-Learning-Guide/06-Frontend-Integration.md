# Frontend Integration Patterns 🖥️

Master, let me explain how both projects connect to their frontends and why they use completely different approaches.

## Intro-to-mongoose: Server-Side Rendering (SSR)

### Template Engine Setup

```javascript
// app.js - EJS template configuration
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
```

### View Structure:

```
views/
├── index.ejs          // Homepage template
├── login.ejs          // Login form
├── booking.ejs        // Booking page
├── favourite.ejs      // User favorites
├── error.ejs          // Error page
└── partials/
    ├── header.ejs     // Reusable header
    └── footer.ejs     // Reusable footer
```

### Example EJS Template:

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/tailwind.css" />
  </head>
  <body>
    <%- include('partials/header', { isLoggedIn: isLoggedIn, user: user }) %>

    <div class="container">
      <h1>Available Homes</h1>

      <% if (homes.length > 0) { %>
      <div class="grid">
        <% homes.forEach(home => { %>
        <div class="card">
          <img src="<%= home.image %>" alt="<%= home.title %>" />
          <h3><%= home.title %></h3>
          <p>$<%= home.price %>/night</p>
          <a href="/home/<%= home._id %>">View Details</a>

          <% if (isLoggedIn) { %>
          <form action="/POSTFAV" method="POST">
            <input type="hidden" name="homeId" value="<%= home._id %>" />
            <button type="submit">Add to Favorites</button>
          </form>
          <% } %>
        </div>
        <% }); %>
      </div>
      <% } else { %>
      <p>No homes available.</p>
      <% } %>
    </div>

    <%- include('partials/footer') %>
  </body>
</html>
```

### Data Flow:

```javascript
// Controller renders template with data
exports.GetHome = async (req, res) => {
  const homes = await Home.find();

  // Server generates complete HTML
  res.render("index", {
    pageTitle: "Welcome",
    homes: homes,
    isLoggedIn: req.isloggedIn,
    user: req.session.user,
  });
};
```

### Form Handling:

```html
<!-- Traditional form submission -->
<form action="/POSTFAV" method="POST">
  <input type="hidden" name="homeId" value="123" />
  <button type="submit">Add Favorite</button>
</form>

<!-- This triggers a POST request and page refresh -->
```

---

## Recipe-backend: API + Frontend Separation

### No Templates - JSON Only:

```javascript
// app.js - No view engine, only JSON
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests

// Routes return data only
app.use("/api/recipes", recipesRouter);
```

### Frontend Communication (React):

```javascript
// Frontend service file: src/services/recipesService.js
export const recipesService = {
  // GET request to fetch recipes
  async getAllRecipes(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`http://localhost:3002/api/recipes?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return response.json(); // Parse JSON response
  },

  // GET single recipe
  async getRecipeBySlug(slug) {
    const response = await fetch(`http://localhost:3002/api/recipes/${slug}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Recipe not found");
      }
      throw new Error("Failed to fetch recipe");
    }

    return response.json();
  },

  // POST new recipe
  async createRecipe(recipeData) {
    const response = await fetch("http://localhost:3002/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create recipe");
    }

    return response.json();
  },
};
```

### React Component Usage:

```jsx
// React component using the API
import React, { useState, useEffect } from "react";
import { recipesService } from "../services/recipesService";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipesService.getAllRecipes({
          section: "popular",
          category: "dessert",
        });
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <span>{recipe.prepTime}</span>
        </div>
      ))}
    </div>
  );
};
```

---

## Key Differences in Frontend Integration

### 1. Data Loading

**Traditional (Intro-to-mongoose):**

```javascript
// Data is loaded on the server before page renders
exports.GetHome = async (req, res) => {
  const homes = await Home.find(); // Server fetches data
  res.render("index", { homes }); // Server renders HTML with data
};
// Browser receives complete HTML with data already embedded
```

**API (Recipe-backend):**

```javascript
// 1. Frontend loads empty page
// 2. Frontend makes API call
const [recipes, setRecipes] = useState([]);

useEffect(() => {
  recipesService.getAllRecipes().then((data) => setRecipes(data)); // Client fetches and sets data
}, []);
// Browser receives JSON data and renders it client-side
```

### 2. User Interactions

**Traditional:**

```html
<!-- Form submission causes page refresh -->
<form action="/POSTFAV" method="POST">
  <input type="hidden" name="homeId" value="123" />
  <button type="submit">Add Favorite</button>
</form>
```

**API:**

```jsx
// JavaScript handles interaction without page refresh
const handleAddFavorite = async (recipeId) => {
  try {
    await recipesService.addToFavorites(recipeId);
    // Update local state without page refresh
    setFavorites((prev) => [...prev, recipeId]);
    showNotification("Added to favorites!");
  } catch (error) {
    showNotification("Failed to add favorite");
  }
};

<button onClick={() => handleAddFavorite(recipe._id)}>Add Favorite</button>;
```

### 3. Error Handling

**Traditional:**

```javascript
// Server renders error page
if (error) {
  res.render("error", {
    message: "Something went wrong",
  });
}
```

**API:**

```jsx
// Frontend handles error display
const [error, setError] = useState(null);

try {
  const data = await recipesService.getAllRecipes();
} catch (err) {
  setError(err.message);
}

return (
  <div>
    {error ? (
      <div className="error-message">{error}</div>
    ) : (
      <RecipesList recipes={recipes} />
    )}
  </div>
);
```

### 4. State Management

**Traditional:**

```javascript
// State is managed on server via sessions
app.use(
  session({
    store: mongoStore,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);

// Each request has access to session
req.session.user = user;
req.isloggedIn = Boolean(req.session.isloggedIn);
```

**API:**

```jsx
// State is managed on client
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

// Context or state management library
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token"),
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Advantages and Disadvantages

### Server-Side Rendering (Intro-to-mongoose)

**Advantages:**

- ✅ **SEO-friendly**: Search engines see complete HTML
- ✅ **Fast initial load**: No JavaScript required for basic content
- ✅ **Simple deployment**: One server handles everything
- ✅ **Works without JavaScript**: Progressive enhancement possible

**Disadvantages:**

- ❌ **Less interactive**: Page refreshes for each action
- ❌ **Server load**: Server does all the work
- ❌ **Monolithic**: Hard to scale frontend separately
- ❌ **Limited reusability**: Templates tied to one application

### API + Client-Side Rendering (Recipe-backend)

**Advantages:**

- ✅ **Highly interactive**: No page refreshes, smooth UX
- ✅ **Scalable**: Frontend and backend can scale independently
- ✅ **Reusable**: API can serve web, mobile, desktop apps
- ✅ **Modern workflow**: Hot reload, component-based development

**Disadvantages:**

- ❌ **SEO challenges**: Need additional setup for search engines
- ❌ **Slower initial load**: JavaScript bundle must download first
- ❌ **Complex deployment**: Two applications to manage
- ❌ **JavaScript required**: Won't work if JS is disabled

---

## Best Practices You Should Follow:

### 1. Error Handling

```javascript
// Always handle both network and application errors
try {
  const response = await fetch("/api/recipes");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error("Fetch error:", error);
  // Show user-friendly error message
}
```

### 2. Loading States

```jsx
// Always show loading indicators
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await recipesService.createRecipe(formData);
  } finally {
    setLoading(false); // Always reset loading state
  }
};
```

### 3. Data Validation

```jsx
// Validate on both client and server
const validateRecipe = (recipe) => {
  if (!recipe.title?.trim()) {
    throw new Error("Title is required");
  }
  if (!recipe.ingredients?.length) {
    throw new Error("At least one ingredient is required");
  }
};
```

Master, understanding both patterns will make you a versatile developer. Use **server-side rendering** for content-heavy sites that need SEO, and **API + client-side** for interactive applications that need rich user experiences!
