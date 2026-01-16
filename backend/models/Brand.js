const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  description: String
});

module.exports = mongoose.model("Brand", brandSchema);
