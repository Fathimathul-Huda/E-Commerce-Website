const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, async (req, res) => {
  const cart = await Cart.create({
    user: req.user._id,
    items: req.body.items
  });
  res.json(cart);
});

router.get("/", protect, async (req, res) => {
  res.json(await Cart.findOne({ user: req.user._id }));
});

module.exports = router;
