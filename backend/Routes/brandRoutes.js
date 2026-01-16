const express = require("express");
const Brand = require("../models/Brand");
const protect = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/RoleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Brand.find());
});

router.post("/", protect, checkRole("admin"), async (req, res) => {
  const brand = await Brand.create(req.body);
  res.json(brand);
});

module.exports = router;
