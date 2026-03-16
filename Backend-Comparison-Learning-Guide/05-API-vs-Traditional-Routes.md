# API vs Traditional Routes 🛣️

Master, let me explain the fundamental difference in how both projects handle HTTP requests and responses.

## Traditional Routes (Intro-to-mongoose)

### Route Structure - Page-Based Navigation

```javascript
// userRoute.js - Traditional web app routing
const express = require("express");
const UserRouter = express.Router();
const isUser = require("../middleware/is-user"); // Auth middleware

// GET routes that return complete HTML pages
UserRouter.get("/", GetHome); // Homepage
UserRouter.get("/store/Booking", isUser, GetBooking); // Booking page
UserRouter.get("/home/:homeId", getDetail); // Property details
UserRouter.get("/store/favourite", isUser, GetFav); // User favorites
UserRouter.get("/store/Reserved", isUser, getReservered); // User bookings

// POST routes that handle form submissions
UserRouter.post("/POSTFAV", isUser, POSTFav); // Add to favorites
UserRouter.post("/DELFAV", isUser, DELFav); // Remove from favorites
```

### Controller Pattern - HTML Generation

```javascript
// Example controller from Intro-to-mongoose
exports.GetHome = async (req, res) => {
  try {
    // Fetch data from database
    const homes = await Home.find().limit(10);

    // Render complete HTML page with data
    res.render("index", {
      pageTitle: "Welcome to Airbnb",
      homes: homes,
      isLoggedIn: req.isloggedIn,
      user: req.session.user || null,
    });
  } catch (error) {
    res.render("error", { message: "Failed to load homes" });
  }
};

exports.POSTFav = async (req, res) => {
  try {
    const { homeId } = req.body;
    const userId = req.session.user._id;

    // Update user's favorites
    await User.findByIdAndUpdate(userId, {
      $addToSet: { Favs: homeId },
    });

    // Redirect back to the page (traditional web pattern)
    res.redirect("/store/favourite");
  } catch (error) {
    res.render("error", { message: "Failed to add favorite" });
  }
};
```

### Response Types:

- `res.render("template", data)` - Generate HTML from templates
- `res.redirect("/path")` - Navigate to different page
- `res.status(error).render("error")` - Error pages

---

## API Routes (Recipe-backend)

### Route Structure - Resource-Based

```javascript
// recipesRouter.js - RESTful API routing
const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");

// Standard REST endpoints
router.post("/", recipesController.createRecipe); // CREATE
router.get("/", recipesController.getRecipes); // READ (list)
router.get("/:slug", recipesController.getRecipeBySlug); // READ (single)
router.put("/:slug", recipesController.updateRecipeBySlug); // UPDATE
// DELETE would be: router.delete("/:slug", recipesController.deleteRecipe);

// Special endpoints for specific needs
router.get("/blog/:slug", recipesController.getBlogWithRelatedRecipes);
router.get("/content/:slug", recipesController.getContentBySlug);
router.get(
  "/collection/:collectionType",
  recipesController.getRecipesByCollection
);
```

### Controller Pattern - JSON Responses

```javascript
// Example controller from Recipe-backend
exports.getRecipes = async (req, res) => {
  try {
    // Parse query parameters for filtering
    const { section, category, q, ramadan, inEid } = req.query;
    const filter = {};

    if (section !== undefined) filter.section = section;
    if (category !== undefined) filter.category = category;
    if (ramadan === "true") filter.isRamadan = true;
    if (inEid === "true") filter.inEid = true;

    // Advanced search functionality
    let query = Recipe.find(filter);
    if (q && q.trim()) {
      const term = q.trim();
      const regex = new RegExp(
        term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      query = Recipe.find({
        ...filter,
        $or: [{ title: regex }, { slug: regex }, { tags: { $in: [regex] } }],
      });
    }

    const recipes = await query.sort({ createdAt: -1 });

    // Always return JSON data
    res.json(recipes);
  } catch (err) {
    res.status(500).json({
      message: "Fetch failed",
      error: err.message,
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    // Return the created resource with 201 status
    res.status(201).json(recipe);

    // Fire-and-forget: notify subscribers (background task)
    try {
      const { notifySubscribersNewRecipe } = require("../utils/mailer");
      notifySubscribersNewRecipe(recipe).catch((e) =>
        console.error("Notify subscribers failed:", e.message)
      );
    } catch (e) {
      console.error("Mailer not configured:", e.message);
    }
  } catch (err) {
    res.status(400).json({
      message: "Create failed",
      error: err.message,
    });
  }
};
```

### Response Types:

- `res.json(data)` - Return JSON data
- `res.status(201).json(data)` - Created resource
- `res.status(400).json(error)` - Client error
- `res.status(500).json(error)` - Server error

---

## Key Differences Breakdown

### 1. Request/Response Flow

**Traditional (Intro-to-mongoose):**

```
GET /store/favourite
↓
Controller queries database
↓
Controller renders EJS template with data
↓
Browser receives complete HTML page
↓
Browser displays the page
```

**API (Recipe-backend):**

```
GET /api/recipes?category=dessert
↓
Controller queries database with filters
↓
Controller returns JSON array
↓
Frontend receives raw data
↓
Frontend renders data in React components
```

### 2. Error Handling

**Traditional:**

```javascript
// Redirect to error page
res.render("error", {
  message: "Something went wrong",
  statusCode: 500,
});
```

**API:**

```javascript
// Return error as JSON
res.status(500).json({
  message: "Fetch failed",
  error: err.message,
  timestamp: new Date().toISOString(),
});
```

### 3. Data Validation

**Traditional:**

```javascript
// Form validation with express-validator
const { body, validationResult } = require("express-validator");

const validateBooking = [
  body("checkIn").isISO8601().withMessage("Invalid check-in date"),
  body("checkOut").isISO8601().withMessage("Invalid check-out date"),
];

// In controller
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.render("booking", {
    errors: errors.array(),
    formData: req.body,
  });
}
```

**API:**

```javascript
// JSON validation and error response
exports.createRecipe = async (req, res) => {
  try {
    // Mongoose handles validation at schema level
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    // Return validation errors as JSON
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};
```

### 4. Authentication Handling

**Traditional:**

```javascript
// Middleware redirects to login page
const isUser = (req, res, next) => {
  if (!req.isloggedIn) {
    return res.redirect("/login");
  }
  next();
};
```

**API:**

```javascript
// Middleware returns JSON error
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Verify token logic...
  next();
};
```

---

## REST API Patterns in Recipe-backend

### Standard HTTP Methods:

```javascript
// CRUD operations mapped to HTTP methods
POST   /api/recipes          → Create new recipe
GET    /api/recipes          → List all recipes
GET    /api/recipes/:slug    → Get specific recipe
PUT    /api/recipes/:slug    → Update specific recipe
DELETE /api/recipes/:slug    → Delete specific recipe (not implemented)
```

### Query Parameters for Filtering:

```javascript
// GET /api/recipes?section=popular&category=dessert&q=chocolate
// Translates to:
const filter = {
  section: "popular",
  category: "dessert",
};
const searchTerm = "chocolate";
```

### Status Codes Usage:

```javascript
200 - OK (successful GET, PUT)
201 - Created (successful POST)
400 - Bad Request (validation errors)
404 - Not Found (resource doesn't exist)
500 - Internal Server Error (server problems)
```

---

## Common Mistakes to Avoid:

### 1. Mixing Patterns

❌ **Wrong:**

```javascript
// Don't mix API and traditional patterns
app.get("/api/recipes", (req, res) => {
  res.render("recipes", { data }); // API shouldn't render HTML
});
```

### 2. Inconsistent Error Handling

❌ **Wrong:**

```javascript
// Inconsistent error responses in API
res.render("error"); // Should be res.json({ error: ... })
res.redirect("/error"); // Should be status code + JSON
```

### 3. Poor Status Code Usage

❌ **Wrong:**

```javascript
// Always returning 200 even for errors
res.json({ error: "Not found" }); // Should be res.status(404).json({...})
```

✅ **Correct:**

```javascript
// Proper status codes
res.status(404).json({ message: "Recipe not found" });
res.status(400).json({ message: "Invalid data" });
```

Master, the key difference is that **traditional routes** deliver complete web pages, while **API routes** deliver pure data. Your Intro-to-mongoose project is like a restaurant that serves complete meals (HTML pages), while Recipe-backend is like a grocery store that provides ingredients (JSON data) for others to cook with!
