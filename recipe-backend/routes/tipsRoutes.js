const express = require("express");
const tipsController = require("../controllers/tipsController");

const router = express.Router();

// GET /api/tips/ - Get all tips
router.get("/", tipsController.getAllTips);

// GET /api/tips/:slug - Get single tip by slug
router.get("/:slug", tipsController.getSingleTipBySlug);

// Admin route for adding tips via form
router.post("/admin/add", tipsController.addTipFromForm);
 
module.exports = router;
