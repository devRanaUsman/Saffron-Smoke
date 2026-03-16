# Code Structure Deep Dive 🔍

Master, let's examine how both projects are structured and why they're different.

## App.js Comparison

### Intro-to-mongoose app.js - Traditional Setup

```javascript
// Key differences in setup:
const session = require("express-session");
const MongodcStore = require("connect-mongodb-session")(session);

// Templates for HTML generation
app.set("view engine", "ejs");
app.set("views", "./views");

// Session management for user login
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: store, // Sessions stored in MongoDB
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  })
);

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Routes that serve HTML pages
app.use("/", UserRouter);
app.use("/host", HostRouter);
```

**What this means:**

- Server manages user sessions (who's logged in)
- Can serve CSS/JS/images directly
- Routes return HTML pages, not JSON

### Recipe-backend app.js - API Setup

```javascript
// Key differences in setup:
const cors = require("cors");

// No view engine - no HTML generation needed
// No sessions - stateless API

// Enable CORS for frontend communication
app.use(cors());
app.options("*", cors());

// JSON parsing for API requests
app.use(express.json());

// API routes that return JSON
app.use("/api/recipes", recipesRouter);
app.use("/api/blogs", blogsRouter);
```

**What this means:**

- No user sessions - each request is independent
- CORS allows React frontend to communicate
- All routes return JSON data, never HTML

---

## Models Comparison

### Intro-to-mongoose Models

```javascript
// User.js - Complex user management
const UserSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  email: String,
  Password: String, // Needs hashing/validation
  UserType: { type: String, enum: ["host", "guest"] },
  Favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }], // User favorites
});
```

**Features:**

- User authentication data
- User types (host vs guest)
- Relationships (favorites reference other documents)

### Recipe-backend Models

```javascript
// Recipe.js - Data-focused model
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL-friendly ID
  ingredients: { type: [String], default: [] },
  instructions: { type: [String], default: [] },
  category: { type: String, enum: [...] }, // Predefined categories
  tags: { type: [String], default: [] }
}, { timestamps: true }); // Automatic created/updated dates
```

**Features:**

- Content-focused (no user data)
- SEO-friendly slugs
- Automatic timestamps
- Bilingual support (Urdu/English)

---

## Routes Comparison

### Intro-to-mongoose Routes - Page-based

```javascript
// userRoute.js - Returns HTML pages
UserRouter.get("/", GetHome); // Homepage HTML
UserRouter.get("/store/Booking", isUser, GetBooking); // Booking page
UserRouter.get("/store/favourite", isUser, GetFav); // Favorites page
UserRouter.post("/POSTFAV", isUser, POSTFav); // Add favorite
```

**Pattern:**

- Each route serves a complete webpage
- Authentication middleware (`isUser`) checks login
- Mix of GET (display) and POST (form submission)

### Recipe-backend Routes - API Endpoints

```javascript
// recipesRouter.js - Returns JSON data
router.get("/", recipesController.getRecipes); // GET all recipes
router.post("/", recipesController.createRecipe); // CREATE recipe
router.get("/:slug", recipesController.getRecipeBySlug); // GET one recipe
router.put("/:slug", recipesController.updateRecipeBySlug); // UPDATE recipe
```

**Pattern:**

- RESTful API design
- Each endpoint has specific purpose
- Standard HTTP methods (GET, POST, PUT, DELETE)

---

## Controllers Comparison

### Intro-to-mongoose Controllers

```javascript
// Returns HTML pages with data
exports.GetHome = async (req, res) => {
  const homes = await Home.find();
  res.render("index", {
    homes: homes,
    isLoggedIn: req.isloggedIn, // Pass login status to template
  });
};
```

**Key points:**

- Uses `res.render()` to generate HTML
- Passes data to EJS templates
- Includes user session information

### Recipe-backend Controllers

```javascript
// Returns JSON data only
exports.getRecipes = async (req, res) => {
  const { section, category, q } = req.query; // Parse query parameters
  const filter = {};
  if (section) filter.section = section;

  const recipes = await Recipe.find(filter);
  res.json(recipes); // Send JSON response
};
```

**Key points:**

- Uses `res.json()` to send data
- No HTML generation
- Advanced filtering and search capabilities

Master, notice how the **architecture philosophy** is completely different:

- **Intro-to-mongoose**: "Give me a complete webpage"
- **Recipe-backend**: "Give me just the data, I'll handle the presentation"
