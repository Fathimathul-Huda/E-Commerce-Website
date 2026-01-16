const express = require("express");
const Category = require("../models/Category");
const protect = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/RoleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Category.find());
});

router.post("/", protect, checkRole("admin"), async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

module.exports = router;
