# Common Patterns and Best Practices 🎯

Master, let me share the key patterns both projects use and the best practices you should adopt for future development.

## Shared Patterns Between Both Projects

### 1. Environment Configuration

Both projects use `.env` files for configuration:

**Intro-to-mongoose:**

```javascript
require("dotenv").config();

const Db_path = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urzilla";
const sessionSecret = process.env.SESSION_SECRET || "dev-secret";
```

**Recipe-backend:**

```javascript
require("dotenv").config();

const PORT = Number(process.env.PORT || 3002);
const DB_PATH = process.env.MONGODB_URI || "mongodb+srv://...";
```

**Best Practice:**

```javascript
// .env file (never commit to git)
MONGODB_URI=mongodb://localhost:27017/myapp
SESSION_SECRET=your-super-secret-key-here
JWT_SECRET=jwt-secret-key
PORT=3000

// In your code - always provide fallbacks
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/default',
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET
};

// Validate required environment variables
if (!config.jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required');
}
```

### 2. Database Connection Pattern

Both use Mongoose with proper error handling:

```javascript
// Common pattern in both projects
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
    process.exit(1); // Exit if can't connect to DB
  });
```

### 3. Middleware Setup

Both projects use Express middleware in logical order:

```javascript
// Standard middleware order
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable CORS (API projects)
app.use(session(...)); // Session management (traditional projects)

// Routes come after middleware
app.use("/api/users", userRouter);
app.use("/", homeRouter);

// Error handling comes last
app.use(errorController.handle404);
```

---

## Project-Specific Best Practices

### Intro-to-mongoose Strengths

#### 1. Session Management

```javascript
// Proper session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Extend session on activity
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: true, // Prevent XSS attacks
    },
    store: new MongoStore({ uri: DB_PATH }),
  })
);
```

#### 2. Authentication Middleware

```javascript
// Clean authentication check
app.use((req, res, next) => {
  req.isloggedIn = Boolean(req.session && req.session.isloggedIn);
  res.locals.isLoggedIn = req.isloggedIn; // Make available in templates
  res.locals.user = req.session.user || null;
  next();
});

// Route protection
const isUser = (req, res, next) => {
  if (!req.isloggedIn) {
    return res.redirect("/login");
  }
  next();
};
```

#### 3. Template Data Consistency

```javascript
// Always provide consistent data to templates
exports.GetHome = async (req, res) => {
  try {
    const homes = await Home.find().populate("host");

    res.render("index", {
      pageTitle: "Home | Airbnb",
      homes: homes,
      isLoggedIn: req.isloggedIn,
      user: req.session.user,
      currentPage: "home",
    });
  } catch (error) {
    res.render("error", {
      pageTitle: "Error",
      message: "Failed to load homes",
      isLoggedIn: req.isloggedIn,
      user: req.session.user,
    });
  }
};
```

### Recipe-backend Strengths

#### 1. Clean API Design

```javascript
// RESTful route organization
router.get("/", recipesController.getRecipes); // GET /api/recipes
router.post("/", recipesController.createRecipe); // POST /api/recipes
router.get("/:slug", recipesController.getRecipeBySlug); // GET /api/recipes/chocolate-cake
router.put("/:slug", recipesController.updateRecipe); // PUT /api/recipes/chocolate-cake
router.delete("/:slug", recipesController.deleteRecipe); // DELETE /api/recipes/chocolate-cake
```

#### 2. Advanced Filtering and Search

```javascript
exports.getRecipes = async (req, res) => {
  try {
    // Build dynamic filters from query parameters
    const filter = {};
    const {
      section,
      category,
      q,
      ramadan,
      inEid,
      page = 1,
      limit = 10,
    } = req.query;

    // Add filters conditionally
    if (section) filter.section = section;
    if (category) filter.category = category;
    if (ramadan === "true") filter.isRamadan = true;
    if (inEid === "true") filter.inEid = true;

    // Build search query
    let query = Recipe.find(filter);

    // Text search across multiple fields
    if (q && q.trim()) {
      const searchTerm = q.trim();
      const regex = new RegExp(
        searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      query = Recipe.find({
        ...filter,
        $or: [
          { title: regex },
          { titleinUrdu: regex },
          { tags: { $in: [regex] } },
          { ingredients: { $in: [regex] } },
        ],
      });
    }

    // Pagination
    const skip = (page - 1) * limit;
    const recipes = await query
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Count total for pagination
    const total = await Recipe.countDocuments(query.getFilter());

    res.json({
      recipes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};
```

#### 3. Automatic Slug Generation

```javascript
// Pre-save middleware for SEO-friendly URLs
function toSlug(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
}

recipeSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = toSlug(this.title);

    // Ensure uniqueness
    const originalSlug = this.slug;
    let counter = 1;

    const checkUnique = async () => {
      const existing = await this.constructor.findOne({ slug: this.slug });
      if (existing && existing._id.toString() !== this._id.toString()) {
        this.slug = `${originalSlug}-${counter}`;
        counter++;
        await checkUnique();
      }
    };

    checkUnique()
      .then(() => next())
      .catch(next);
  } else {
    next();
  }
});
```

---

## Common Mistakes and How to Avoid Them

### 1. Database Connection Errors

❌ **Wrong:**

```javascript
// No error handling
mongoose.connect(DB_PATH);
app.listen(PORT);
```

✅ **Correct:**

```javascript
// Proper error handling and connection management
mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
```

### 2. Missing Validation

❌ **Wrong:**

```javascript
// No validation
exports.createRecipe = async (req, res) => {
  const recipe = await Recipe.create(req.body);
  res.json(recipe);
};
```

✅ **Correct:**

```javascript
// Proper validation
exports.createRecipe = async (req, res) => {
  try {
    // Validate required fields
    const { title, ingredients, instructions } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["title", "ingredients", "instructions"],
      });
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        message: "Ingredients must be a non-empty array",
      });
    }

    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
```

### 3. Inconsistent Error Responses

❌ **Wrong:**

```javascript
// Inconsistent error formats
res.json({ error: "Something went wrong" });
res.status(400).send("Bad request");
res.render("error");
```

✅ **Correct:**

```javascript
// Consistent error format
const sendError = (res, statusCode, message, details = null) => {
  const error = {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  if (details) error.details = details;

  res.status(statusCode).json(error);
};

// Usage
sendError(res, 404, "Recipe not found");
sendError(res, 400, "Validation failed", validationErrors);
```

### 4. Security Issues

❌ **Wrong:**

```javascript
// Weak session configuration
app.use(
  session({
    secret: "123",
    cookie: { secure: false },
  })
);

// No input sanitization
const user = await User.findOne({ email: req.body.email });
```

✅ **Correct:**

```javascript
// Strong session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
    store: new MongoStore({ uri: DB_PATH }),
  })
);

// Input sanitization and validation
const validator = require("validator");

const email = validator.normalizeEmail(req.body.email);
if (!validator.isEmail(email)) {
  return res.status(400).json({ message: "Invalid email" });
}
```

---

## Performance Best Practices

### 1. Database Indexing

```javascript
// Add indexes for frequently queried fields
recipeSchema.index({ slug: 1 }); // Unique index
recipeSchema.index({ category: 1, section: 1 }); // Compound index
recipeSchema.index({ title: "text", tags: "text" }); // Text search index
recipeSchema.index({ createdAt: -1 }); // Sort index
```

### 2. Pagination Implementation

```javascript
exports.getRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [recipes, total] = await Promise.all([
    Recipe.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Recipe.countDocuments(filter),
  ]);

  res.json({
    recipes,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  });
};
```

### 3. Caching Strategy

```javascript
const cache = new Map();

exports.getPopularRecipes = async (req, res) => {
  const cacheKey = "popular-recipes";

  // Check cache first
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  const recipes = await Recipe.find({ section: "popular" }).limit(10);

  // Cache for 5 minutes
  cache.set(cacheKey, recipes);
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000);

  res.json(recipes);
};
```

Master, both your projects demonstrate different but valid approaches to backend development. The key is to choose the right pattern for your specific use case and follow consistent practices throughout your application!
