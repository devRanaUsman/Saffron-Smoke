# Authentication Systems Explained 🔐

Master, let me explain the biggest difference: how both projects handle user authentication.

## Intro-to-mongoose: Session-Based Authentication

### How It Works:

```javascript
// 1. Session setup in app.js
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongodcStore({ uri: DB_PATH }), // Store sessions in MongoDB
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
    resave: false,
    saveUninitialized: false,
  })
);

// 2. Session middleware to track login status
app.use((req, res, next) => {
  req.isloggedIn = Boolean(req.session && req.session.isloggedIn);
  next();
});
```

### The Process:

1. **User logs in** → Server validates credentials
2. **Server creates session** → Stores user info in database
3. **Server sends cookie** → Browser stores session ID
4. **Future requests** → Browser automatically sends cookie
5. **Server checks session** → Validates user is still logged in

### Example Login Flow:

```javascript
// Authentication controller
exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  // Find and validate user
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.Password)) {
    // Create session
    req.session.isloggedIn = true;
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid credentials" });
  }
};
```

### Protection Middleware:

```javascript
// middleware/is-user.js - Protects routes
module.exports = (req, res, next) => {
  if (!req.isloggedIn) {
    return res.redirect("/login");
  }
  next();
};

// Usage in routes
UserRouter.get("/store/favourite", isUser, GetFav); // Protected route
```

---

## Recipe-backend: No Authentication (API-Only)

### Current State:

```javascript
// No authentication setup
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON requests

// All routes are public
app.use("/api/recipes", recipesRouter); // Anyone can access
```

### Why No Authentication?

1. **Separation of Concerns**: Frontend handles user management
2. **Stateless Design**: Each API request is independent
3. **Scalability**: Can serve multiple applications
4. **Simplicity**: Focus on data operations only

### How It Would Work With Authentication:

```javascript
// Example JWT authentication (not implemented)
const jwt = require("jsonwebtoken");

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Protected route example
router.post("/", authenticateToken, recipesController.createRecipe);
```

---

## Comparison Table

| Feature        | Intro-to-mongoose (Sessions)       | Recipe-backend (No Auth)                   |
| -------------- | ---------------------------------- | ------------------------------------------ |
| **Storage**    | Server stores user sessions        | No user data stored                        |
| **Client**     | Browser cookies automatically sent | Frontend manages auth separately           |
| **State**      | Stateful (remembers users)         | Stateless (no memory)                      |
| **Security**   | Session hijacking risk             | No auth = no risk (but also no protection) |
| **Scaling**    | Limited by session storage         | Highly scalable                            |
| **Complexity** | More complex setup                 | Simple and clean                           |

---

## Common Mistakes You Should Avoid:

### 1. Mixing Authentication Patterns

❌ **Wrong:**

```javascript
// Don't mix sessions with API design
app.use(session(...));
app.get("/api/users", (req, res) => {
  res.json({ user: req.session.user }); // API shouldn't use sessions
});
```

✅ **Correct:**

```javascript
// Pick one pattern consistently
// Either full session-based OR token-based API
```

### 2. Storing Passwords Incorrectly

❌ **Wrong:**

```javascript
Password: { type: String, required: true } // Plain text passwords!
```

✅ **Correct:**

```javascript
const bcrypt = require("bcryptjs");
// Hash before saving
const hashedPassword = bcrypt.hashSync(password, 10);
```

### 3. Session Configuration Errors

❌ **Wrong:**

```javascript
app.use(session({ secret: "123" })); // Weak secret, no store
```

✅ **Correct:**

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Strong secret from env
    store: mongoStore, // Persist sessions
    cookie: { secure: true, httpOnly: true }, // Security flags
  })
);
```

Master, your **Intro-to-mongoose** project uses the traditional web approach where the server remembers who you are, while the **Recipe-backend** follows the modern API approach where the frontend is responsible for user management. Both approaches are valid for different use cases!
