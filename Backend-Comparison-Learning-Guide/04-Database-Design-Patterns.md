# Database Design Patterns 🗄️

Master, let me explain how both projects approach database design and what you can learn from each.

## Intro-to-mongoose: User-Centric Design

### User Model - Complex Relationships

```javascript
const UserSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  Password: { type: String, required: true },
  UserType: {
    type: String,
    enum: ["host", "guest"], // Restricted values
    required: true,
    default: "guest",
  },
  Favs: [
    {
      // Array of references to other documents
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
    },
  ],
});
```

### Home Model (from examining the structure)

```javascript
// Likely structure based on usage patterns
const HomeSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User who owns this home
  },
  amenities: [String],
  bookings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      checkIn: Date,
      checkOut: Date,
      status: { type: String, enum: ["pending", "confirmed", "cancelled"] },
    },
  ],
});
```

### Key Design Patterns:

1. **Document References**: Links between users and homes
2. **Embedded Documents**: Bookings stored within homes
3. **User Roles**: Different user types with different permissions
4. **Bidirectional Relationships**: Users have favorites, homes have hosts

---

## Recipe-backend: Content-Centric Design

### Recipe Model - Rich Content Structure

```javascript
const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URLs
    image: { type: String, required: true },

    // Bilingual content support
    titleinUrdu: { type: String, default: "" },
    descriptionInUrdu: { type: String, default: "" },
    ingredientsInUrdu: { type: [String], default: [] },
    instructionsInUrdu: { type: [String], default: [] },

    // Structured recipe data
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    prepTime: String,
    cookTime: String,
    totalTime: String,
    servings: String,

    // Content categorization
    section: {
      type: String,
      enum: ["popular", "must-try", "general"],
      default: "general",
    },
    category: {
      type: String,
      enum: [
        "appetizers",
        "beverages",
        "breakfast",
        "dip-condiment",
        "dessert",
        "roti-paratha-naan",
        "salad",
        "sandwiches",
        "soup",
        "tikka-kabab-cutlets",
        "vegetarian",
        "rice",
      ],
    },

    // Special collections
    isRamadan: { type: Boolean, default: false },
    inEid: { type: Boolean, default: false },

    tags: { type: [String], default: [] },
    relatedRecipes: [{ type: String, default: [] }], // Array of slugs
  },
  { timestamps: true }
); // Auto-generated createdAt/updatedAt
```

### Automatic Slug Generation

```javascript
// Pre-save middleware to generate SEO-friendly URLs
function toSlug(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

recipeSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = toSlug(this.title);
  }
  next();
});
```

### Other Models in Recipe-backend:

```javascript
// Blog Model
const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  author: {
    name: String,
    image: String,
  },
  relatedRecipes: [String], // Array of recipe slugs
});

// Subscriber Model
const subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  subscriptions: [String], // Types of content they want
});
```

---

## Design Philosophy Comparison

### Intro-to-mongoose: Relational Thinking

- **Focus**: User interactions and relationships
- **Approach**: Traditional database relationships (foreign keys)
- **Complexity**: High - manages user states, permissions, bookings
- **Query Patterns**: Complex joins and population

```javascript
// Example query - get user with their favorites
const user = await User.findById(userId)
  .populate("Favs") // Load referenced Home documents
  .exec();
```

### Recipe-backend: Document-Centric Thinking

- **Focus**: Content and search optimization
- **Approach**: Rich documents with embedded data
- **Complexity**: Medium - focused on content structure
- **Query Patterns**: Search, filtering, categorization

```javascript
// Example query - search recipes with filters
const recipes = await Recipe.find({
  section: "popular",
  category: "dessert",
  $or: [{ title: /chocolate/i }, { tags: { $in: [/chocolate/i] } }],
});
```

---

## Common Patterns and Best Practices

### 1. Validation Strategies

**Intro-to-mongoose** (Application-level):

```javascript
// Validation in controllers/middleware
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("email").isEmail().withMessage("Invalid email"),
  body("Password").isLength({ min: 6 }).withMessage("Password too short"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", { errors: errors.array() });
    }
    next();
  },
];
```

**Recipe-backend** (Schema-level):

```javascript
// Validation in mongoose schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    enum: {
      values: ['appetizers', 'dessert', ...],
      message: 'Invalid category'
    }
  }
});
```

### 2. Index Strategies

**Intro-to-mongoose**:

```javascript
// Indexes for user queries and sessions
UserSchema.index({ email: 1 }, { unique: true });
HomeSchema.index({ host: 1 }); // Find homes by host
HomeSchema.index({ location: 1, price: 1 }); // Compound index for search
```

**Recipe-backend**:

```javascript
// Indexes for content discovery
recipeSchema.index({ slug: 1 }, { unique: true }); // Fast slug lookups
recipeSchema.index({ category: 1, section: 1 }); // Filter combinations
recipeSchema.index({ title: "text", tags: "text" }); // Text search
recipeSchema.index({ createdAt: -1 }); // Recent content first
```

---

## What You Should Learn From Each:

### From Intro-to-mongoose:

1. **User Management**: How to handle authentication and sessions
2. **Relationships**: Connecting users with their data
3. **State Management**: Tracking user interactions over time
4. **Security**: Password hashing, session protection

### From Recipe-backend:

1. **Content Management**: Organizing and categorizing content
2. **Search Optimization**: Full-text search and filtering
3. **API Design**: Clean, focused data structures
4. **SEO Patterns**: Slug generation and URL optimization
5. **Internationalization**: Supporting multiple languages

### Common Mistakes to Avoid:

1. **Over-normalization**: Don't split everything into separate collections
2. **Under-indexing**: Always index fields you query frequently
3. **Ignoring Validation**: Validate at both schema and application level
4. **Poor Naming**: Use consistent, descriptive field names
5. **No Timestamps**: Always include createdAt/updatedAt for debugging

Master, both projects teach different aspects of MongoDB usage - the Airbnb project shows relationship management, while the Recipe project shows content optimization. Understanding both patterns will make you a better backend developer!
