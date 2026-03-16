// Core Modules
const path = require("path");

// Load environment variables from .env (local development)
require("dotenv").config();

// External Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Local Modules
const recipesRouter = require("./routes/recipesRouter");
const errorsController = require("./controllers/errors");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors()); // Handle CORS preflight globally

// Routes
app.use("/api/recipes", recipesRouter);
app.use("/api/subscriptions", require("./routes/subscriptionsRouter"));
app.use("/api/blogs", require("./routes/blogsRouter"));
app.use("/api/tips", require("./routes/tipsRoutes"));

// 404
app.use(errorsController.pageNotFound);

// DB + Server
const PORT = Number(process.env.PORT || 3002);
const DB_PATH =
  process.env.MONGODB_URI ||
  "mongodb+srv://Rmua:000@cluster0.ywqrxcz.mongodb.net/?appName=Cluster";

mongoose
  .connect(DB_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Recipe backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("DB Connection Error", err));
