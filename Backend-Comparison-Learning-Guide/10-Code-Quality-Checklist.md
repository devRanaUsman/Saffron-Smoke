# Code Quality Checklist for Master 📋

Based on analyzing your two projects, here's a comprehensive checklist to ensure high-quality backend code.

## Pre-Development Setup ⚙️

### Environment Configuration

- [ ] **Environment Variables**: All secrets in `.env` file
- [ ] **Environment Validation**: Required variables checked at startup
- [ ] **Different Configs**: Development, staging, production configs
- [ ] **Git Ignore**: `.env`, `node_modules`, logs ignored

```javascript
// Environment validation example
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET", "PORT"];
const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`
  );
  process.exit(1);
}
```

### Package Management

- [ ] **Exact Versions**: Use exact versions for critical dependencies
- [ ] **Security Audit**: Run `npm audit` regularly
- [ ] **Dependency Cleanup**: Remove unused packages
- [ ] **License Compliance**: Check package licenses

```json
{
  "dependencies": {
    "express": "4.18.2",
    "mongoose": "7.6.3",
    "jsonwebtoken": "9.0.2"
  },
  "scripts": {
    "audit": "npm audit",
    "audit-fix": "npm audit fix"
  }
}
```

---

## Code Structure Quality 🏗️

### File Organization

- [ ] **Logical Grouping**: Controllers, models, routes, utils separated
- [ ] **Naming Consistency**: Clear, descriptive file names
- [ ] **Index Files**: Proper exports from directories
- [ ] **Depth Limit**: Max 3-4 directory levels

```
src/
├── controllers/
│   ├── authController.js
│   ├── recipeController.js
│   └── index.js              // Export all controllers
├── models/
│   ├── User.js
│   ├── Recipe.js
│   └── index.js              // Export all models
├── routes/
│   ├── authRoutes.js
│   ├── recipeRoutes.js
│   └── index.js              // Combine all routes
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── utils/
│   ├── database.js
│   ├── email.js
│   └── helpers.js
└── config/
    ├── database.js
    └── app.js
```

### Function Quality

- [ ] **Single Responsibility**: Each function does one thing
- [ ] **Pure Functions**: Avoid side effects when possible
- [ ] **Descriptive Names**: Functions named clearly
- [ ] **Function Length**: Keep functions under 50 lines

```javascript
❌ BAD:
const handleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  user.password = hashedPassword;
  await user.save();
  res.json({ user, token });
};

✅ GOOD:
const updateUserPassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    const user = await findUserById(userId);
    const hashedPassword = hashPassword(password);

    await updateUser(userId, { password: hashedPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
```

---

## Database Quality 💾

### Schema Design

- [ ] **Validation**: All required fields validated
- [ ] **Indexes**: Frequent queries have indexes
- [ ] **Relationships**: Proper refs and population
- [ ] **Timestamps**: Created/updated dates included

```javascript
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
```

### Query Optimization

- [ ] **Lean Queries**: Use `.lean()` when you don't need Mongoose docs
- [ ] **Field Selection**: Only select needed fields
- [ ] **Pagination**: All list endpoints paginated
- [ ] **Query Limits**: Prevent unlimited queries

```javascript
// Optimized query
exports.getRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Max 100
  const skip = (page - 1) * limit;

  const recipes = await Recipe.find(buildFilter(req.query))
    .select("title slug image author category createdAt") // Only needed fields
    .populate("author", "name email") // Limited population
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Faster queries

  res.json({
    recipes,
    pagination: {
      page,
      limit,
      total: await Recipe.countDocuments(buildFilter(req.query)),
    },
  });
};
```

---

## API Quality 🌐

### Request/Response Standards

- [ ] **HTTP Status Codes**: Correct status codes used
- [ ] **Consistent Response Format**: All endpoints follow same structure
- [ ] **Input Validation**: All inputs validated
- [ ] **Error Messages**: Clear, helpful error messages

```javascript
// Consistent response format
const sendResponse = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

// Usage
sendResponse(res, 200, recipes, "Recipes fetched successfully");
sendResponse(res, 404, null, "Recipe not found");
```

### Validation

- [ ] **Schema Validation**: Use Joi/express-validator
- [ ] **Sanitization**: Clean user inputs
- [ ] **Type Checking**: Validate data types
- [ ] **Business Logic**: Validate business rules

```javascript
const { body, validationResult } = require("express-validator");

const recipeValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required"),

  body("category")
    .isIn(["appetizers", "dessert", "main-course"])
    .withMessage("Invalid category"),

  body("cookTime")
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage("Cook time must be between 1 and 1440 minutes"),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, errors.array(), "Validation failed");
  }
  next();
};

// Usage
router.post("/recipes", recipeValidation, handleValidation, createRecipe);
```

---

## Security Quality 🔒

### Authentication & Authorization

- [ ] **Strong Passwords**: Enforce password requirements
- [ ] **JWT Security**: Proper token handling
- [ ] **Session Security**: Secure session configuration
- [ ] **Rate Limiting**: Prevent abuse

```javascript
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Password hashing
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// JWT with proper expiry
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
    issuer: "your-app-name",
    audience: "your-app-users",
  });
};

// Token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendResponse(res, 401, null, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    sendResponse(res, 403, null, "Invalid token");
  }
};
```

### Input Security

- [ ] **SQL Injection Prevention**: Use parameterized queries
- [ ] **NoSQL Injection Prevention**: Sanitize MongoDB queries
- [ ] **XSS Prevention**: Sanitize HTML inputs
- [ ] **CSRF Protection**: Use CSRF tokens

```javascript
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");
const helmet = require("helmet");

app.use(helmet()); // Security headers
app.use(mongoSanitize()); // Prevent NoSQL injection

// Custom XSS sanitization
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
};

app.use(sanitizeInput);
```

---

## Error Handling Quality ❌

### Comprehensive Error Handling

- [ ] **Try-Catch Blocks**: All async operations wrapped
- [ ] **Error Logging**: Errors logged with context
- [ ] **User-Friendly Messages**: Don't expose internal errors
- [ ] **Error Monitoring**: Use tools like Sentry

```javascript
const winston = require("winston");

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    ...(process.env.NODE_ENV !== "production"
      ? [new winston.transports.Console()]
      : []),
  ],
});

// Global error handler
const globalErrorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    user: req.user?.id || "anonymous",
  });

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message;

  sendResponse(res, 500, null, message);
};

app.use(globalErrorHandler);

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
exports.createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create(req.body);
  sendResponse(res, 201, recipe, "Recipe created successfully");
});
```

---

## Performance Quality ⚡

### Response Time

- [ ] **Database Indexes**: Query performance optimized
- [ ] **Caching**: Implement caching where appropriate
- [ ] **Compression**: Enable gzip compression
- [ ] **Connection Pooling**: Optimize database connections

```javascript
const compression = require("compression");
const redis = require("redis");
const mongoose = require("mongoose");

// Compression
app.use(compression());

// Redis cache setup
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redisClient.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // Override res.json to cache the response
      const originalJson = res.json;
      res.json = (data) => {
        redisClient.setex(key, duration, JSON.stringify(data));
        originalJson.call(res, data);
      };

      next();
    } catch (error) {
      next(); // Continue without cache if Redis fails
    }
  };
};

// Usage
router.get("/recipes", cache(600), getRecipes); // Cache for 10 minutes

// MongoDB connection optimization
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10, // Maximum number of connections
  minPoolSize: 5, // Minimum number of connections
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
});
```

---

## Testing Quality 🧪

### Test Coverage

- [ ] **Unit Tests**: All business logic tested
- [ ] **Integration Tests**: API endpoints tested
- [ ] **Test Data**: Use proper test fixtures
- [ ] **Test Isolation**: Tests don't depend on each other

```javascript
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const { setupTestDB } = require("./fixtures/db");

// Setup test database
setupTestDB();

describe("Auth Endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    const validUser = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(validUser)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          user: {
            name: "Test User",
            email: "test@example.com",
          },
        },
      });

      expect(response.body.data.token).toBeDefined();
    });

    it("should not register user with invalid email", async () => {
      await request(app)
        .post("/api/auth/register")
        .send({ ...validUser, email: "invalid-email" })
        .expect(400);
    });
  });
});

// Test fixtures
const createTestUser = async (overrides = {}) => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword",
    ...overrides,
  };

  return await User.create(userData);
};
```

---

## Documentation Quality 📚

### Code Documentation

- [ ] **README**: Clear setup instructions
- [ ] **API Documentation**: All endpoints documented
- [ ] **Code Comments**: Complex logic explained
- [ ] **Environment Variables**: All variables documented

```javascript
/**
 * Creates a new recipe
 * @param {Object} req - Express request object
 * @param {Object} req.body - Recipe data
 * @param {string} req.body.title - Recipe title
 * @param {string[]} req.body.ingredients - List of ingredients
 * @param {string[]} req.body.instructions - Cooking instructions
 * @param {string} req.body.category - Recipe category
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create(req.body);
  sendResponse(res, 201, recipe, "Recipe created successfully");
});
```

Master, use this checklist for every project you work on. Start with the basics and gradually incorporate more advanced quality measures as you grow as a developer!
