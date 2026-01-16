const express = require("express");
const Coupon = require("../models/Coupon");
const protect = require("../Middleware/authMiddleware");
const checkRole = require("../Middleware/RoleMiddleware");


const router = express.Router();

router.post("/", protect, checkRole("admin"), async (req, res) => {
  res.json(await Coupon.create(req.body));
});

router.post("/apply", protect, async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.body.code });
  if (!coupon) return res.status(404).json({ message: "Invalid coupon" });

  if (new Date() > coupon.expiryDate)
    return res.status(400).json({ message: "Coupon expired" });

  res.json(coupon);
});

module.exports = router;
