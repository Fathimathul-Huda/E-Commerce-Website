const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountPercentage: Number,
  minAmount: Number,
  expiryDate: Date
});

module.exports = mongoose.model("Coupon", couponSchema);
