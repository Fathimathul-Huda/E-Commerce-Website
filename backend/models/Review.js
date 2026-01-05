const mongoose=require("mongoose")
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  isFake: {
    type: Boolean,
    default: false  
  }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);