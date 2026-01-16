const express = require("express");
const Address = require("../models/Address");
const protect = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const address = await Address.create({
    user: req.user._id,
    ...req.body
  });
  res.json(address);
});

router.get("/", protect, async (req, res) => {
  res.json(await Address.find({ user: req.user._id }));
});

module.exports = router;
