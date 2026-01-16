const express = require("express");
const Review = require("../models/Review");
const protect = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/RoleMiddleware");


const router = express.Router();

router.post(
  "/:productId",
  protect,
  checkRole("buyer"),
  async (req, res) => {
    const review = await Review.create({
      user: req.user._id,
      product: req.params.productId,
      ...req.body
    });
    res.json(review);
  }
);

router.get("/:productId", async (req, res) => {
  res.json(await Review.find({ product: req.params.productId }));
});

module.exports = router;
