// server/models/Review.js
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: String,
  message: String,
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Review", ReviewSchema);
