const express = require("express");
const Product = require("../models/Product");
const protect = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/RoleMiddleware");


const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Product.find());
});

router.post(
  "/",
  protect,
  checkRole("seller", "admin"),
  async (req, res) => {
    const product = await Product.create({
      ...req.body,
      seller: req.user._id
    });
    res.json(product);
  }
);

module.exports = router;
