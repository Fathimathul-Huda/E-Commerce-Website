const express = require("express");
const Order = require("../models/Order");
const protect = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    totalAmount: req.body.totalAmount
  });
  res.json(order);
});

router.get("/my", protect, async (req, res) => {
  res.json(await Order.find({ user: req.user._id }));
});

module.exports = router;
